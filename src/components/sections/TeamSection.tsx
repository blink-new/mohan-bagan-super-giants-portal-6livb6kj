import { useState } from 'react'
import { Users, Trophy, Target, Shield, Zap, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const players = [
  {
    id: 1,
    name: "Vishal Kaith",
    position: "Goalkeeper",
    number: 1,
    age: 27,
    nationality: "India",
    image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    stats: { appearances: 18, cleanSheets: 8, saves: 67 },
    captain: false
  },
  {
    id: 2,
    name: "Subhasish Bose",
    position: "Defender",
    number: 15,
    age: 30,
    nationality: "India",
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    stats: { appearances: 20, goals: 2, assists: 4 },
    captain: true
  },
  {
    id: 3,
    name: "Hugo Boumous",
    position: "Midfielder",
    number: 10,
    age: 29,
    nationality: "France",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    stats: { appearances: 19, goals: 8, assists: 12 },
    captain: false
  },
  {
    id: 4,
    name: "Manvir Singh",
    position: "Forward",
    number: 11,
    age: 28,
    nationality: "India",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    stats: { appearances: 21, goals: 12, assists: 6 },
    captain: false
  },
  {
    id: 5,
    name: "Dimitri Petratos",
    position: "Forward",
    number: 9,
    age: 31,
    nationality: "Australia",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    stats: { appearances: 17, goals: 15, assists: 8 },
    captain: false
  },
  {
    id: 6,
    name: "Anirudh Thapa",
    position: "Midfielder",
    number: 8,
    age: 26,
    nationality: "India",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    stats: { appearances: 22, goals: 4, assists: 9 },
    captain: false
  }
]

const staff = [
  {
    name: "Antonio Habas",
    role: "Head Coach",
    nationality: "Spain",
    experience: "15 years",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Ravi Kumar",
    role: "Assistant Coach",
    nationality: "India",
    experience: "8 years",
    image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  },
  {
    name: "Dr. Sarah Johnson",
    role: "Team Doctor",
    nationality: "UK",
    experience: "12 years",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
  }
]

export function TeamSection() {
  const [selectedPosition, setSelectedPosition] = useState('all')
  
  const positions = ['all', 'Goalkeeper', 'Defender', 'Midfielder', 'Forward']
  
  const filteredPlayers = selectedPosition === 'all' 
    ? players 
    : players.filter(player => player.position === selectedPosition)

  const getPositionIcon = (position: string) => {
    switch (position) {
      case 'Goalkeeper': return <Shield className="h-4 w-4" />
      case 'Defender': return <Shield className="h-4 w-4" />
      case 'Midfielder': return <Zap className="h-4 w-4" />
      case 'Forward': return <Target className="h-4 w-4" />
      default: return <Users className="h-4 w-4" />
    }
  }

  return (
    <section id="team" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4">
            <Users className="h-3 w-3 mr-1" />
            Squad
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Meet Our Team
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know the talented players and dedicated staff who represent 
            the Green and Maroon with pride and passion.
          </p>
        </div>

        <Tabs defaultValue="players" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto">
            <TabsTrigger value="players">Players</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>

          <TabsContent value="players" className="mt-8">
            {/* Position Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {positions.map(position => (
                <Button
                  key={position}
                  variant={selectedPosition === position ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedPosition(position)}
                  className="flex items-center"
                >
                  {getPositionIcon(position)}
                  <span className="ml-2 capitalize">
                    {position === 'all' ? 'All Players' : position}
                  </span>
                </Button>
              ))}
            </div>

            {/* Players Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPlayers.map((player) => (
                <Card key={player.id} className="card-hover overflow-hidden">
                  <div className="relative">
                    <img
                      src={player.image}
                      alt={player.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-primary-foreground text-lg font-bold px-3 py-1">
                        {player.number}
                      </Badge>
                    </div>
                    {player.captain && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-accent text-accent-foreground">
                          <Star className="h-3 w-3 mr-1" />
                          Captain
                        </Badge>
                      </div>
                    )}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white">
                        <h3 className="font-bold text-lg">{player.name}</h3>
                        <div className="flex items-center justify-between text-sm">
                          <span className="flex items-center">
                            {getPositionIcon(player.position)}
                            <span className="ml-1">{player.position}</span>
                          </span>
                          <span>{player.nationality}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {player.stats.appearances || player.stats.saves || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {player.position === 'Goalkeeper' ? 'Saves' : 'Apps'}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {player.stats.goals || player.stats.cleanSheets || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {player.position === 'Goalkeeper' ? 'Clean Sheets' : 'Goals'}
                        </div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">
                          {player.stats.assists || 0}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Assists
                        </div>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline" size="sm">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="staff" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {staff.map((member, index) => (
                <Card key={index} className="card-hover overflow-hidden">
                  <div className="relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="bg-black/80 backdrop-blur-sm rounded-lg p-3 text-white">
                        <h3 className="font-bold text-lg">{member.name}</h3>
                        <p className="text-sm opacity-90">{member.role}</p>
                      </div>
                    </div>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Nationality:</span>
                        <span className="font-medium">{member.nationality}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Experience:</span>
                        <span className="font-medium">{member.experience}</span>
                      </div>
                    </div>
                    
                    <Button className="w-full mt-4" variant="outline" size="sm">
                      View Profile
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Team Stats */}
        <div className="mt-16">
          <Card>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-center mb-8">Team Statistics</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">25</div>
                  <div className="text-sm text-muted-foreground">Squad Size</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">27.2</div>
                  <div className="text-sm text-muted-foreground">Average Age</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">8</div>
                  <div className="text-sm text-muted-foreground">International Players</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">17</div>
                  <div className="text-sm text-muted-foreground">Indian Players</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}