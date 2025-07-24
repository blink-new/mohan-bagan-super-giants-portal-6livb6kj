import { useState } from 'react'
import { Calendar, Clock, MapPin, Trophy, TrendingUp, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const fixtures = [
  {
    id: 1,
    opponent: "Bengaluru FC",
    opponentLogo: "BFC",
    date: "2024-02-15",
    time: "19:30",
    venue: "Salt Lake Stadium",
    competition: "ISL",
    status: "upcoming",
    homeAway: "home"
  },
  {
    id: 2,
    opponent: "Mumbai City FC",
    opponentLogo: "MCFC",
    date: "2024-02-22",
    time: "20:00",
    venue: "Salt Lake Stadium",
    competition: "ISL",
    status: "upcoming",
    homeAway: "home"
  },
  {
    id: 3,
    opponent: "Kerala Blasters",
    opponentLogo: "KBFC",
    date: "2024-03-01",
    time: "19:30",
    venue: "Jawaharlal Nehru Stadium",
    competition: "ISL",
    status: "upcoming",
    homeAway: "away"
  }
]

const results = [
  {
    id: 1,
    opponent: "FC Goa",
    opponentLogo: "FCG",
    date: "2024-01-28",
    time: "19:30",
    venue: "Salt Lake Stadium",
    competition: "ISL",
    status: "completed",
    homeAway: "home",
    score: { home: 2, away: 1 },
    scorers: ["Hugo Boumous 23'", "Manvir Singh 67'"],
    result: "win"
  },
  {
    id: 2,
    opponent: "Jamshedpur FC",
    opponentLogo: "JFC",
    date: "2024-01-21",
    time: "20:00",
    venue: "JRD Tata Sports Complex",
    competition: "ISL",
    status: "completed",
    homeAway: "away",
    score: { home: 1, away: 1 },
    scorers: ["Dimitri Petratos 45'"],
    result: "draw"
  },
  {
    id: 3,
    opponent: "Hyderabad FC",
    opponentLogo: "HFC",
    date: "2024-01-14",
    time: "19:30",
    venue: "Salt Lake Stadium",
    competition: "ISL",
    status: "completed",
    homeAway: "home",
    score: { home: 3, away: 0 },
    scorers: ["Manvir Singh 12'", "Hugo Boumous 34'", "Dimitri Petratos 78'"],
    result: "win"
  }
]

const leagueTable = [
  { position: 1, team: "Mumbai City FC", played: 18, won: 12, drawn: 4, lost: 2, points: 40 },
  { position: 2, team: "Bengaluru FC", played: 18, won: 11, drawn: 5, lost: 2, points: 38 },
  { position: 3, team: "Mohan Bagan SG", played: 18, won: 10, drawn: 6, lost: 2, points: 36 },
  { position: 4, team: "FC Goa", played: 18, won: 9, drawn: 7, lost: 2, points: 34 },
  { position: 5, team: "Kerala Blasters", played: 18, won: 8, drawn: 6, lost: 4, points: 30 },
]

export function FixturesSection() {
  const [selectedCompetition, setSelectedCompetition] = useState('all')
  
  const competitions = ['all', 'ISL', 'Durand Cup', 'AFC Cup']

  const getResultBadge = (result: string) => {
    switch (result) {
      case 'win':
        return <Badge className="bg-green-500 text-white">W</Badge>
      case 'draw':
        return <Badge className="bg-yellow-500 text-white">D</Badge>
      case 'loss':
        return <Badge className="bg-red-500 text-white">L</Badge>
      default:
        return null
    }
  }

  return (
    <section id="fixtures" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4">
            <Calendar className="h-3 w-3 mr-1" />
            Fixtures & Results
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Match Schedule
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with our upcoming fixtures and recent match results. 
            Never miss a moment of Mohan Bagan Super Giants action.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="fixtures" className="mb-8">
              <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                <TabsList className="grid w-full grid-cols-2 max-w-md">
                  <TabsTrigger value="fixtures">Upcoming</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>
                
                <Select value={selectedCompetition} onValueChange={setSelectedCompetition}>
                  <SelectTrigger className="w-48 mt-4 md:mt-0">
                    <SelectValue placeholder="Select competition" />
                  </SelectTrigger>
                  <SelectContent>
                    {competitions.map(comp => (
                      <SelectItem key={comp} value={comp}>
                        {comp === 'all' ? 'All Competitions' : comp}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <TabsContent value="fixtures">
                <div className="space-y-4">
                  {fixtures.map((fixture) => (
                    <Card key={fixture.id} className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <Badge variant="outline">{fixture.competition}</Badge>
                            <div className="flex items-center space-x-3">
                              {fixture.homeAway === 'home' ? (
                                <>
                                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-sm">MB</span>
                                  </div>
                                  <span className="text-lg font-semibold">VS</span>
                                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">{fixture.opponentLogo}</span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">{fixture.opponentLogo}</span>
                                  </div>
                                  <span className="text-lg font-semibold">VS</span>
                                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-sm">MB</span>
                                  </div>
                                </>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {fixture.homeAway === 'home' 
                                  ? `Mohan Bagan vs ${fixture.opponent}`
                                  : `${fixture.opponent} vs Mohan Bagan`
                                }
                              </h3>
                              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {new Date(fixture.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {fixture.time}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {fixture.venue}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Button size="sm">
                              Buy Tickets
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="results">
                <div className="space-y-4">
                  {results.map((result) => (
                    <Card key={result.id} className="card-hover">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{result.competition}</Badge>
                              {getResultBadge(result.result)}
                            </div>
                            <div className="flex items-center space-x-3">
                              {result.homeAway === 'home' ? (
                                <>
                                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-sm">MB</span>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-2xl font-bold">
                                      {result.score?.home} - {result.score?.away}
                                    </div>
                                  </div>
                                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">{result.opponentLogo}</span>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">{result.opponentLogo}</span>
                                  </div>
                                  <div className="text-center">
                                    <div className="text-2xl font-bold">
                                      {result.score?.home} - {result.score?.away}
                                    </div>
                                  </div>
                                  <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center">
                                    <span className="text-primary-foreground font-bold text-sm">MB</span>
                                  </div>
                                </>
                              )}
                            </div>
                            <div>
                              <h3 className="font-semibold">
                                {result.homeAway === 'home' 
                                  ? `Mohan Bagan vs ${result.opponent}`
                                  : `${result.opponent} vs Mohan Bagan`
                                }
                              </h3>
                              <div className="flex items-center text-sm text-muted-foreground space-x-4">
                                <div className="flex items-center">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {new Date(result.date).toLocaleDateString()}
                                </div>
                                <div className="flex items-center">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  {result.venue}
                                </div>
                              </div>
                              {result.scorers && (
                                <div className="text-xs text-muted-foreground mt-1">
                                  Scorers: {result.scorers.join(', ')}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="text-right">
                            <Button size="sm" variant="outline">
                              Match Report
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* League Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2" />
                  ISL Table
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leagueTable.map((team) => (
                    <div
                      key={team.position}
                      className={`flex items-center justify-between p-2 rounded ${
                        team.team === 'Mohan Bagan SG' 
                          ? 'bg-primary/10 border border-primary/20' 
                          : ''
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-6 text-center font-semibold text-sm">
                          {team.position}
                        </span>
                        <span className={`text-sm ${
                          team.team === 'Mohan Bagan SG' ? 'font-semibold' : ''
                        }`}>
                          {team.team}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <span>{team.played}</span>
                        <span className="font-semibold text-foreground">{team.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline" size="sm">
                  View Full Table
                </Button>
              </CardContent>
            </Card>

            {/* Form Guide */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Recent Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center space-x-2 mb-4">
                  {['W', 'W', 'D', 'W', 'W'].map((result, index) => (
                    <div
                      key={index}
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                        result === 'W' ? 'bg-green-500' :
                        result === 'D' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                    >
                      {result}
                    </div>
                  ))}
                </div>
                <div className="text-center text-sm text-muted-foreground">
                  Last 5 matches (most recent first)
                </div>
              </CardContent>
            </Card>

            {/* Next Match */}
            <Card>
              <CardHeader>
                <CardTitle>Next Match</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="flex items-center justify-center space-x-3">
                    <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-sm">MB</span>
                    </div>
                    <span className="font-semibold">VS</span>
                    <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                      <span className="text-white font-bold text-xs">BFC</span>
                    </div>
                  </div>
                  <h4 className="font-semibold">Mohan Bagan vs Bengaluru FC</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <div className="flex items-center justify-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      Feb 15, 2024
                    </div>
                    <div className="flex items-center justify-center">
                      <Clock className="h-3 w-3 mr-1" />
                      7:30 PM IST
                    </div>
                  </div>
                  <Button className="w-full mt-4" size="sm">
                    Buy Tickets
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}