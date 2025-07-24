import { useState } from 'react'
import { Ticket, Calendar, MapPin, Clock, Users, CreditCard, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { blink } from '../../blink/client'
import { toast } from '../../hooks/use-toast'

const upcomingMatches = [
  {
    id: 1,
    opponent: "Bengaluru FC",
    opponentLogo: "BFC",
    date: "2024-02-15",
    time: "19:30",
    venue: "Salt Lake Stadium",
    competition: "ISL",
    ticketsAvailable: 15420,
    totalCapacity: 68000,
    prices: {
      general: 299,
      premium: 799,
      vip: 1999,
      corporate: 4999
    }
  },
  {
    id: 2,
    opponent: "Mumbai City FC",
    opponentLogo: "MCFC",
    date: "2024-02-22",
    time: "20:00",
    venue: "Salt Lake Stadium",
    competition: "ISL",
    ticketsAvailable: 12850,
    totalCapacity: 68000,
    prices: {
      general: 399,
      premium: 899,
      vip: 2299,
      corporate: 5499
    }
  },
  {
    id: 3,
    opponent: "Kerala Blasters",
    opponentLogo: "KBFC",
    date: "2024-03-01",
    time: "19:30",
    venue: "Salt Lake Stadium",
    competition: "ISL",
    ticketsAvailable: 18200,
    totalCapacity: 68000,
    prices: {
      general: 349,
      premium: 849,
      vip: 2149,
      corporate: 4799
    }
  }
]

const ticketCategories = [
  {
    name: "General",
    description: "Standard seating with great stadium atmosphere",
    features: ["Stadium entry", "Seat reservation", "Match program"],
    color: "bg-blue-500"
  },
  {
    name: "Premium",
    description: "Enhanced viewing experience with better amenities",
    features: ["Premium seating", "Complimentary refreshments", "Priority entry", "Match program"],
    color: "bg-purple-500"
  },
  {
    name: "VIP",
    description: "Luxury experience with exclusive access",
    features: ["VIP lounge access", "Premium dining", "Meet & greet opportunity", "Exclusive merchandise"],
    color: "bg-gold-500"
  },
  {
    name: "Corporate",
    description: "Perfect for business entertainment",
    features: ["Private box", "Catering service", "Dedicated host", "Networking opportunities"],
    color: "bg-primary"
  }
]

export function TicketsSection() {
  const [selectedMatch, setSelectedMatch] = useState(upcomingMatches[0])
  const [selectedCategory, setSelectedCategory] = useState("general")
  const [ticketQuantity, setTicketQuantity] = useState(1)
  const [isBooking, setIsBooking] = useState(false)

  const selectedCategoryData = ticketCategories.find(cat => 
    cat.name.toLowerCase() === selectedCategory
  )

  const totalPrice = selectedMatch.prices[selectedCategory as keyof typeof selectedMatch.prices] * ticketQuantity

  const handleBookTickets = async () => {
    setIsBooking(true)
    try {
      // Get current user
      const user = await blink.auth.me()
      
      // Create ticket booking
      const ticketId = `ticket_${Date.now()}`
      await blink.db.tickets.create({
        id: ticketId,
        userId: user.id,
        matchTitle: `Mohan Bagan vs ${selectedMatch.opponent}`,
        seatCategory: selectedCategory,
        quantity: ticketQuantity,
        totalPrice: totalPrice,
        bookingStatus: 'confirmed'
      })

      toast({
        title: "Tickets Booked Successfully!",
        description: `${ticketQuantity} ${selectedCategory} ticket(s) for MB vs ${selectedMatch.opponent}. Total: ₹${totalPrice.toLocaleString()}`,
      })
    } catch (error) {
      console.error('Booking error:', error)
      toast({
        title: "Booking Failed",
        description: "Please try again or contact support.",
        variant: "destructive"
      })
    } finally {
      setIsBooking(false)
    }
  }

  return (
    <section id="tickets" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4">
            <Ticket className="h-3 w-3 mr-1" />
            Match Tickets
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Book Your Tickets
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience the thrill of live football at Salt Lake Stadium. 
            Book your tickets now and be part of the Green and Maroon army.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Match Selection */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Select Match
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingMatches.map((match) => (
                  <div
                    key={match.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-all ${
                      selectedMatch.id === match.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedMatch(match)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-primary-foreground font-bold text-sm">MB</span>
                          </div>
                          <span className="text-lg font-semibold">VS</span>
                          <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                            <span className="text-white font-bold text-xs">{match.opponentLogo}</span>
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold">Mohan Bagan vs {match.opponent}</h3>
                          <div className="flex items-center text-sm text-muted-foreground space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(match.date).toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {match.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {match.venue}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="mb-1">{match.competition}</Badge>
                        <p className="text-sm text-muted-foreground">
                          {match.ticketsAvailable.toLocaleString()} tickets available
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Ticket Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Ticket Categories
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {ticketCategories.map((category) => (
                    <div
                      key={category.name}
                      className={`p-4 rounded-lg border cursor-pointer transition-all ${
                        selectedCategory === category.name.toLowerCase()
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedCategory(category.name.toLowerCase())}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{category.name}</h4>
                        <span className="text-lg font-bold text-primary">
                          ₹{selectedMatch.prices[category.name.toLowerCase() as keyof typeof selectedMatch.prices].toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        {category.description}
                      </p>
                      <ul className="text-xs space-y-1">
                        {category.features.map((feature, index) => (
                          <li key={index} className="flex items-center">
                            <div className="h-1 w-1 rounded-full bg-primary mr-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Booking Summary */}
          <div className="space-y-6">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Booking Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Number of Tickets</Label>
                  <Select value={ticketQuantity.toString()} onValueChange={(value) => setTicketQuantity(parseInt(value))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'Ticket' : 'Tickets'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3 pt-4 border-t">
                  <div className="flex justify-between text-sm">
                    <span>Match:</span>
                    <span className="font-medium">MB vs {selectedMatch.opponent}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Date:</span>
                    <span className="font-medium">{new Date(selectedMatch.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Category:</span>
                    <span className="font-medium capitalize">{selectedCategory}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Quantity:</span>
                    <span className="font-medium">{ticketQuantity}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Price per ticket:</span>
                    <span className="font-medium">₹{selectedMatch.prices[selectedCategory as keyof typeof selectedMatch.prices].toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary">₹{totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleBookTickets}
                  disabled={isBooking}
                >
                  <Ticket className="h-4 w-4 mr-2" />
                  {isBooking ? 'Booking...' : 'Book Now'}
                </Button>

                <div className="flex items-center justify-center text-xs text-muted-foreground">
                  <Shield className="h-3 w-3 mr-1" />
                  Secure payment powered by Razorpay
                </div>
              </CardContent>
            </Card>

            {/* Season Pass */}
            <Card>
              <CardContent className="p-6 text-center">
                <h4 className="font-semibold mb-2">Season Pass Available</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Get access to all home matches with our season pass
                </p>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}