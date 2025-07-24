import { useState } from 'react'
import { Clock, Eye, Share2, BookOpen, TrendingUp, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const featuredNews = [
  {
    id: 1,
    title: "Mohan Bagan Secures Victory Against FC Goa in Thrilling 2-1 Match",
    excerpt: "In a spectacular display of skill and determination, Mohan Bagan Super Giants defeated FC Goa 2-1 at the Salt Lake Stadium...",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Match Report",
    readTime: "5 min read",
    views: "12.5K",
    publishedAt: "2 hours ago",
    featured: true
  },
  {
    id: 2,
    title: "New Brazilian Midfielder Signs with Super Giants",
    excerpt: "The club announces the signing of talented Brazilian midfielder Carlos Silva on a three-year contract...",
    image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Transfer News",
    readTime: "3 min read",
    views: "8.2K",
    publishedAt: "6 hours ago",
    featured: false
  },
  {
    id: 3,
    title: "Season Ticket Sales Break All Previous Records",
    excerpt: "Fan enthusiasm reaches new heights as season ticket sales surpass all previous records within the first week...",
    image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    category: "Club News",
    readTime: "4 min read",
    views: "6.8K",
    publishedAt: "1 day ago",
    featured: false
  }
]

const recentNews = [
  {
    id: 4,
    title: "Youth Academy Produces Three New First Team Players",
    category: "Academy",
    publishedAt: "2 days ago",
    views: "4.2K"
  },
  {
    id: 5,
    title: "Stadium Renovation Completed Ahead of Schedule",
    category: "Infrastructure",
    publishedAt: "3 days ago",
    views: "5.1K"
  },
  {
    id: 6,
    title: "Community Outreach Program Launches in Kolkata",
    category: "Community",
    publishedAt: "4 days ago",
    views: "3.8K"
  },
  {
    id: 7,
    title: "New Training Facility Opens in Salt Lake",
    category: "Infrastructure",
    publishedAt: "5 days ago",
    views: "7.3K"
  }
]

export function NewsSection() {
  const [activeTab, setActiveTab] = useState("latest")

  return (
    <section id="news" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4">
            <BookOpen className="h-3 w-3 mr-1" />
            Latest Updates
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            News & Updates
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Stay updated with the latest news, match reports, transfer updates, and exclusive content from Mohan Bagan Super Giants.
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4 max-w-md mx-auto">
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="matches">Matches</TabsTrigger>
            <TabsTrigger value="transfers">Transfers</TabsTrigger>
            <TabsTrigger value="club">Club</TabsTrigger>
          </TabsList>

          <TabsContent value="latest" className="mt-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Featured Article */}
              <div className="lg:col-span-2">
                <Card className="card-hover overflow-hidden">
                  <div className="relative">
                    <img
                      src={featuredNews[0].image}
                      alt={featuredNews[0].title}
                      className="w-full h-64 object-cover"
                    />
                    <Badge className="absolute top-4 left-4 bg-primary">
                      {featuredNews[0].category}
                    </Badge>
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-2xl font-bold mb-3 hover:text-primary transition-colors cursor-pointer">
                      {featuredNews[0].title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {featuredNews[0].excerpt}
                    </p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {featuredNews[0].publishedAt}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {featuredNews[0].views}
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Share2 className="h-4 w-4 mr-1" />
                        Share
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Trending */}
                <Card>
                  <CardHeader>
                    <h4 className="font-semibold flex items-center">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Trending Now
                    </h4>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {featuredNews.slice(1).map((article) => (
                      <div key={article.id} className="flex space-x-3">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-16 h-16 rounded object-cover flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h5 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors cursor-pointer">
                            {article.title}
                          </h5>
                          <div className="flex items-center text-xs text-muted-foreground mt-1">
                            <span>{article.publishedAt}</span>
                            <span className="mx-1">•</span>
                            <span>{article.views} views</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recent News */}
                <Card>
                  <CardHeader>
                    <h4 className="font-semibold flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      Recent News
                    </h4>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recentNews.map((article) => (
                      <div key={article.id} className="border-b border-border pb-3 last:border-b-0">
                        <h5 className="font-medium text-sm hover:text-primary transition-colors cursor-pointer mb-1">
                          {article.title}
                        </h5>
                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                          <Badge variant="outline" className="text-xs">
                            {article.category}
                          </Badge>
                          <span>{article.publishedAt}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="matches">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Match reports and analysis coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="transfers">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Transfer news and updates coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="club">
            <div className="text-center py-12">
              <p className="text-muted-foreground">Club news and announcements coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button size="lg" variant="outline">
            View All News
          </Button>
        </div>
      </div>
    </section>
  )
}