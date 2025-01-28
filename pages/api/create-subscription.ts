import type { NextApiRequest, NextApiResponse } from "next"
import { getSession } from "next-auth/react"
import prisma from "@/lib/prisma"
import { createMollieClient } from "@mollie/api-client"

const mollieClient = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY })

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const session = await getSession({ req })
      if (!session) {
        return res.status(401).json({ error: "Niet geautoriseerd" })
      }

      const { packageId } = req.body
      const user = await prisma.user.findUnique({ where: { email: session.user.email } })
      const plan = await prisma.plan.findUnique({ where: { id: packageId } })

      if (!user || !plan) {
        return res.status(400).json({ error: "Ongeldige gebruiker of pakket" })
      }

      const payment = await mollieClient.payments.create({
        amount: {
          currency: "EUR",
          value: plan.price.toFixed(2),
        },
        description: `Sellenix ${plan.name} Abonnement`,
        redirectUrl: `${process.env.NEXTAUTH_URL}/payment-success`,
        webhookUrl: `${process.env.NEXTAUTH_URL}/api/mollie-webhook`,
        metadata: {
          userId: user.id,
          planId: plan.id,
        },
      })

      await prisma.subscription.create({
        data: {
          userId: user.id,
          planId: plan.id,
          startDate: new Date(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
          status: "pending",
        },
      })

      res.status(200).json({ checkoutUrl: payment.getCheckoutUrl() })
    } catch (error) {
      console.error("Error creating subscription:", error)
      res.status(500).json({ error: "Er is een fout opgetreden bij het aanmaken van het abonnement" })
    }
  } else {
    res.setHeader("Allow", ["POST"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

