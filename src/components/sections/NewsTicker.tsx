import { Badge } from '@/components/ui/badge'

const newsItems = [
  "🏆 Mohan Bagan defeats FC Goa 2-1 in thrilling ISL match",
  "⚽ New signing: Brazilian midfielder joins the Super Giants",
  "🎫 Season tickets now available - Limited time offer",
  "📺 Next match against Bengaluru FC live on Star Sports",
  "🏟️ Salt Lake Stadium renovation completed ahead of new season",
  "👕 New away kit launched - Available in official store",
]

export function NewsTicker() {
  return (
    <div className="bg-accent text-accent-foreground py-2 overflow-hidden">
      <div className="flex items-center">
        <Badge className="bg-primary text-primary-foreground mr-4 ml-4 flex-shrink-0">
          BREAKING
        </Badge>
        <div className="flex animate-pulse">
          <div className="ticker whitespace-nowrap flex items-center space-x-8">
            {newsItems.map((item, index) => (
              <span key={index} className="text-sm font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}