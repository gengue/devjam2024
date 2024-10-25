'use client';
import * as React from "react"
import { CalendarIcon, FilterIcon, MapPinIcon, UserIcon } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for demonstration
const requests = [
  {
    id: 1,
    customer: "John Doe",
    destination: "Taganga",
    date: "2024-07-15",
    time: "10:00 AM",
    passengers: 4,
    price: 150,
    status: "pending",
  },
  {
    id: 2,
    customer: "Jane Smith",
    destination: "Santa Marta",
    date: "2024-08-01",
    time: "2:00 PM",
    passengers: 6,
    price: 200,
    status: "pending",
  },
  {
    id: 3,
    customer: "Bob Johnson",
    destination: "Playa Grande",
    date: "2024-08-10",
    time: "11:30 AM",
    passengers: 3,
    price: 180,
    status: "pending",
  },
  {
    id: 2,
    customer: "Juanito Alimaña",
    destination: "Santa Marta",
    date: "2024-08-01",
    time: "2:00 PM",
    passengers: 4,
    price: 200,
    status: "pending",
  },
]

export default function ProviderRequests() {
  const [filteredRequests, setFilteredRequests] = React.useState(requests)
  const [destinationFilter, setDestinationFilter] = React.useState("")
  const [dateFilter, setDateFilter] = React.useState("")

  const handleFilter = () => {
    const filtered = requests.filter((request) => {
      const matchesDestination = destinationFilter === "" || request.destination === destinationFilter
      const matchesDate = dateFilter === "" || request.date === dateFilter
      return matchesDestination && matchesDate
    })
    setFilteredRequests(filtered)
  }

  const handleAccept = (id: number) => {
    // In a real application, you would update the status in your backend
    console.log(`Accepted request ${id}`)
    // For demonstration, we'll update the local state
    setFilteredRequests((prev) =>
      prev.map((request) => (request.id === id ? { ...request, status: "accepted" } : request))
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Boat Rental Requests</h1>

      <div className="mb-6 p-4 bg-muted rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Filter Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label htmlFor="destination">Destination</Label>
            <Select onValueChange={setDestinationFilter}>
              <SelectTrigger id="destination">
                <SelectValue placeholder="Select destination" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="-">All Destinations</SelectItem>
                <SelectItem value="Taganga">Taganga</SelectItem>
                <SelectItem value="Santa Marta">Santa Marta</SelectItem>
                <SelectItem value="Playa Grande">Playa Grande</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <Button onClick={handleFilter} className="w-full">
              <FilterIcon className="mr-2 h-4 w-4" /> Apply Filters
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredRequests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <CardTitle>{request.destination}</CardTitle>
              <Badge variant={request.status === "pending" ? "secondary" : "default"} className="capitalize">
                {request.status}
              </Badge>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>{request.customer}</span>
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  <span>{new Date(request.date).toLocaleDateString()} at {request.time}</span>
                </div>
                <div className="flex items-center">
                  <MapPinIcon className="mr-2 h-4 w-4" />
                  <span>{request.destination}</span>
                </div>
                <div className="flex items-center">
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>{request.passengers} passengers</span>
                </div>
                <div className="font-bold text-lg">
                  ${request.price.toFixed(2)}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleAccept(request.id)}
                disabled={request.status !== "pending"}
                className="w-full"
              >
                {request.status === "pending" ? "Accept Request" : "Accepted"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
