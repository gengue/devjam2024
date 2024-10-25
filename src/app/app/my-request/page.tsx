import * as React from "react"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Mock data for demonstration
const trips = [
  {
    id: 1,
    destination: "Taganga",
    image: "/img/places/Taganga.jpg",
    status: "pending",
    price: 150,
    date: "2024-07-15",
    time: "10:00 AM",
  },
  {
    id: 2,
    destination: "Taganga",
    image: "/img/places/Taganga.jpg",
    status: "confirmed",
    price: 200,
    date: "2024-08-01",
    time: "2:00 PM",
  },
  {
    id: 3,
    destination: "Playa Grande",
    image: "/img/places/Playagrande.jpg",
    status: "pending",
    price: 180,
    date: "2024-08-10",
    time: "11:30 AM",
  },
]

export default function MyTrips() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Trips</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {trips.map((trip) => (
          <Card key={trip.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <img
                src={trip.image}
                alt={`View of ${trip.destination}`}
                className="w-full h-48 object-cover"
              />
            </CardHeader>
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-xl font-bold">{trip.destination}</CardTitle>
                <Badge
                  variant={trip.status === "pending" ? "secondary" : "default"}
                  className="capitalize"
                >
                  {trip.status}
                </Badge>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>{new Date(trip.date).toLocaleDateString()} at {trip.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  <span>{trip.destination}</span>
                </div>
                <div className="font-bold text-lg">
                  ${trip.price.toFixed(2)}
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button variant="outline" className="w-full">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
