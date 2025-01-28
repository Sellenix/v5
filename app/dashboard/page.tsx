"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [subscriptions, setSubscriptions] = useState([])
  const [seoReports, setSeoReports] = useState([])

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [userResponse, subscriptionsResponse, seoReportsResponse] = await Promise.all([
        axios.get("/api/user"),
        axios.get("/api/subscriptions"),
        axios.get("/api/seo-reports"),
      ])
      setUser(userResponse.data)
      setSubscriptions(subscriptionsResponse.data)
      setSeoReports(seoReportsResponse.data)
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast({
        title: "Fout",
        description: "Er is een fout opgetreden bij het ophalen van uw gegevens. Probeer het later opnieuw.",
        variant: "destructive",
      })
    }
  }

  if (!user) return <div>Laden...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-cyberpunk-neon">Dashboard</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Welkom terug, {user.name}</CardTitle>
          <CardDescription>Hier is een overzicht van uw account</CardDescription>
        </CardHeader>
        <CardContent>
          <p>E-mail: {user.email}</p>
          <p>Lid sinds: {new Date(user.createdAt).toLocaleDateString()}</p>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Uw Abonnementen</h2>
      {subscriptions.length === 0 ? (
        <p>U heeft momenteel geen actieve abonnementen.</p>
      ) : (
        subscriptions.map((subscription) => (
          <Card key={subscription.id} className="mb-4">
            <CardHeader>
              <CardTitle>{subscription.plan.name}</CardTitle>
              <CardDescription>Status: {subscription.status}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Start datum: {new Date(subscription.startDate).toLocaleDateString()}</p>
              <p>Eind datum: {new Date(subscription.endDate).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        ))
      )}

      <h2 className="text-2xl font-bold mb-4 mt-8">SEO Rapporten</h2>
      {seoReports.length === 0 ? (
        <p>Er zijn nog geen SEO rapporten beschikbaar.</p>
      ) : (
        seoReports.map((report) => (
          <Card key={report.id} className="mb-4">
            <CardHeader>
              <CardTitle>SEO Rapport voor {report.websiteUrl}</CardTitle>
              <CardDescription>Gegenereerd op: {new Date(report.createdAt).toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Score: {report.score}/100</p>
              <Button className="mt-2" onClick={() => window.open(report.reportUrl, "_blank")}>
                Bekijk volledig rapport
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  )
}

