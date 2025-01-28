import type { NextApiRequest, NextApiResponse } from "next"
import prisma from "../../lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const packages = await prisma.plan.findMany()
      res.status(200).json(packages)
    } catch (error) {
      console.error("Error fetching packages:", error)
      res.status(500).json({ error: "Er is een fout opgetreden bij het ophalen van de pakketten" })
    }
  } else {
    res.setHeader("Allow", ["GET"])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

