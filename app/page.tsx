"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import axios from "axios"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

const packages = [
  {
    id: "webshop",
    name: "Webshop",
    description: "Start je eigen online winkel met geavanceerde e-commerce functionaliteiten",
    price: 29.99,
    features: ["Productcatalogus", "Winkelwagen", "Betalingsverwerking", "Voorraadbeheer", "SEO-optimalisatie"],
    icon: "🛒",
  },
  {
    id: "website",
    name: "Website",
    description: "Bouw een professionele website met onze geavanceerde drag-and-drop builder",
    price: 19.99,
    features: [
      "Drag-and-drop builder",
      "Responsief ontwerp",
      "SEO-optimalisatie",
      "Contactformulier",
      "Aangepaste domeinnaam",
    ],
    icon: "🌐",
  },
  {
    id: "seo-tool",
    name: "SEO-tool",
    description: "Verbeter je online zichtbaarheid met onze krachtige SEO-tools",
    price: 39.99,
    features: ["Zoekwoordanalyse", "Backlink-checker", "Site-audit", "Concurrentieanalyse", "Rangschikkingstracker"],
    icon: "📈",
  },
]

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSelectPackage = (packageId) => {
    setSelectedPackage(packageId)
  }

  const handleOrder = async () => {
    if (selectedPackage) {
      setIsLoading(true)
      try {
        const response = await axios.post("/api/create-subscription", {
          packageId: selectedPackage,
        })

        if (response.data.checkoutUrl) {
          window.location.href = response.data.checkoutUrl
        } else {
          throw new Error("Geen checkout URL ontvangen van Mollie")
        }
      } catch (error) {
        console.error("Fout bij het verwerken van de bestelling:", error)
        toast({
          title: "Fout",
          description: "Er is een fout opgetreden bij het verwerken van uw bestelling. Probeer het later opnieuw.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-cyberpunk-neon animate-glow">Welkom bij Sellenix</h1>
      <p className="text-xl text-center mb-12">Kies het pakket dat bij jou past en start vandaag nog!</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {packages.map((pkg) => (
          <Card
            key={pkg.id}
            className={`${
              selectedPackage === pkg.id ? "border-cyberpunk-neon shadow-neon" : ""
            } transition-all duration-300 hover:scale-105`}
          >
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-4xl mr-2">{pkg.icon}</span>
                {pkg.name}
              </CardTitle>
              <CardDescription>{pkg.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold mb-4 text-cyberpunk-blue">
                €{pkg.price.toFixed(2)}
                <span className="text-sm">/maand</span>
              </p>
              <ul className="list-disc list-inside">
                {pkg.features.map((feature) => (
                  <li key={feature} className="mb-2">
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSelectPackage(pkg.id)}
                className="w-full bg-cyberpunk-purple hover:bg-cyberpunk-pink text-white transition-colors duration-300"
              >
                Selecteer
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {selectedPackage && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">
            Je hebt {packages.find((p) => p.id === selectedPackage).name} geselecteerd
          </h2>
          <Button
            onClick={handleOrder}
            disabled={isLoading}
            className="bg-cyberpunk-neon hover:bg-cyberpunk-blue text-black font-bold transition-colors duration-300"
          >
            {isLoading ? "Bezig met verwerken..." : "Bestel nu"}
          </Button>
        </div>
      )}
    </div>
  )
}

