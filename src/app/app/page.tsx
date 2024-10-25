
'use client'
import * as React from "react"
import { Anchor, Ship, Calendar, MapPin, Star, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import Link from "next/link"
import { useEffect, useState } from "react"
import { motion } from "framer-motion";

function generateprice() {
  const numero = Math.floor(Math.random() * 1000000);
  return numero.toLocaleString("es-CO", { style: "currency", currency: "COP" });
}

export default function BoatRental() {
  const [from, setFrom] = useState(null)
  const [dest, setDest] = useState(null)
  return (
    <main className="flex-1">
      <section className="py-2 md:py-24 lg:py-28 bg-[url('/img/background.jpg')] bg-cover bg-center">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2" style={{
              background: '#0000001c',
              borderRadius: '10px',
              padding: '1rem',
            }}>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-white">
                Discover Your Perfect Boat Trip
              </h1>
              <p className="mx-auto max-w-[700px] text-white md:text-xl">
                Explore the beautiful coastlines of Colombia with our on-demand boat rental service.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex flex-col space-y-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex space-x-4">
                  <Select value={from} onValueChange={setFrom}>
                    <SelectTrigger>
                      <SelectValue placeholder="From" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="taganga">Taganga</SelectItem>
                      <SelectItem value="santa-marta">Santa Marta</SelectItem>
                      <SelectItem value="playa-grande">Playa Grande</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={dest} onValueChange={setDest}>
                    <SelectTrigger>
                      <SelectValue placeholder="To" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="taganga">Taganga</SelectItem>
                      <SelectItem value="santa-marta">Santa Marta</SelectItem>
                      <SelectItem value="playa-grande">Playa Grande</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex space-x-4">
                  <Input type="date" placeholder="Date" />
                  <Input type="time" placeholder="Time" />
                </div>
                <Input type="number" placeholder="Number of passengers" />
                <div className="items-top flex space-x-2">
                  <Checkbox />
                  <p className="text-sm text-muted-foreground">
                    you can donate 5% of the price to the SalvaLosOceanos Foundation.
                  </p>
                </div>

                {from && dest && (
                  <p className="mx-auto max-w-[700px] text-black md:text-sm">
                    your price is {generateprice()}
                  </p>
                )
                }
                <Link href="/app/my-request">
                  <Button className="w-full">
                    Request
                  </Button>
                </Link>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Popular Destinations</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {["Taganga", "Santa Marta", "Playa Grande"].map((destination) => {
              const [isVisible, setIsVisible] = useState(false);

              useEffect(() => {
                const onScroll = () => {

                  const cardPosition = document.getElementById("card").getBoundingClientRect();
                  if (cardPosition.top < window.innerHeight && cardPosition.bottom >= 0) {
                    setIsVisible(true);
                  }
                };
                window.addEventListener("scroll", onScroll);

                return () => window.removeEventListener("scroll", onScroll);
              }, []);

              return (
                <motion.div
                  id="card"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isVisible ? 1 : 0 }}
                  transition={{ duration: 1 }}
                >
                  <Card key={destination}>
                    <CardContent className="p-0">
                      <img
                        alt={`${destination} coastline`}
                        className="w-full h-48 object-cover"
                        height="200"
                        src={`/img/places/${destination.replace(' ', '')}.jpg`}
                        style={{
                          aspectRatio: "300/200",
                          objectFit: "cover",
                        }}
                        width="300"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-lg">{destination}</h3>
                        <p className="text-sm text-gray-500">Explore the beautiful beaches and crystal clear waters</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8">Popular Boat Types</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { name: "Speed Boat", icon: Ship, description: "Fast and exciting rides" },
              { name: "Yacht", icon: Anchor, description: "Luxury and comfort" },
              { name: "Fishing Boat", icon: Anchor, description: "Perfect for fishing trips" },
            ].map((boat) => (
              <Card key={boat.name}>
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <boat.icon className="h-12 w-12 mb-4" />
                  <h3 className="font-semibold text-lg">{boat.name}</h3>
                  <p className="text-sm text-gray-500">{boat.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

