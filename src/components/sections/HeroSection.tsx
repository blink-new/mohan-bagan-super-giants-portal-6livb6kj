import { Calendar, MapPin, Clock, Trophy, Users, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function HeroSection() {
  return (
    <section id="home" className="relative min-h-screen flex items-center">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-95" />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1993&q=80')"
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <Badge className="mb-4 bg-accent text-accent-foreground">
              <Trophy className="h-3 w-3 mr-1" />
              ISL Champions 2023
            </Badge>
            
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Mohan Bagan
              <span className="block text-accent">Super Giants</span>
            </h1>
            
            <p className="text-xl text-white/90 mb-8 max-w-lg">
              India's oldest football club. 135 years of glory, tradition, and unwavering passion. 
              Join the Green and Maroon legacy.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Users className="h-4 w-4 mr-2" />
                Join Fan Club
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
                Watch Highlights
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-12 max-w-md mx-auto lg:mx-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">135</div>
                <div className="text-sm text-white/80">Years</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">50+</div>
                <div className="text-sm text-white/80">Trophies</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent">2M+</div>
                <div className="text-sm text-white/80">Fans</div>
              </div>
            </div>
          </div>

          {/* Right Content - Match Info */}
          <div className="space-y-6">
            {/* Next Match */}
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="secondary">Next Match</Badge>
                  <Badge className="bg-red-500 text-white">LIVE</Badge>
                </div>
                
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center space-x-8">
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center mx-auto mb-2">
                        <span className="text-primary-foreground font-bold">MB</span>
                      </div>
                      <p className="font-semibold">Mohan Bagan</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">2 - 1</div>
                      <p className="text-sm text-muted-foreground">85'</p>
                    </div>
                    
                    <div className="text-center">
                      <div className="h-16 w-16 rounded-full bg-blue-600 flex items-center justify-center mx-auto mb-2">
                        <span className="text-white font-bold">FC</span>
                      </div>
                      <p className="font-semibold">FC Goa</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      Today
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      7:30 PM
                    </div>
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      Salt Lake
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="card-hover">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Season Stats
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">12</div>
                    <div className="text-sm text-muted-foreground">Matches Won</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">3rd</div>
                    <div className="text-sm text-muted-foreground">League Position</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">28</div>
                    <div className="text-sm text-muted-foreground">Goals Scored</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">15</div>
                    <div className="text-sm text-muted-foreground">Clean Sheets</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}