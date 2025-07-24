import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-lg">MB</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Mohan Bagan</h3>
                <p className="text-sm opacity-90">Super Giants</p>
              </div>
            </div>
            <p className="text-sm opacity-80">
              India's oldest football club, established in 1889. Pride of Bengal, Champions of India.
            </p>
            <div className="flex space-x-2">
              <Button size="icon" variant="ghost" className="hover:bg-accent hover:text-accent-foreground">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-accent hover:text-accent-foreground">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-accent hover:text-accent-foreground">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost" className="hover:bg-accent hover:text-accent-foreground">
                <Youtube className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#team" className="opacity-80 hover:opacity-100 transition-opacity">Team Squad</a></li>
              <li><a href="#fixtures" className="opacity-80 hover:opacity-100 transition-opacity">Fixtures & Results</a></li>
              <li><a href="#news" className="opacity-80 hover:opacity-100 transition-opacity">Latest News</a></li>
              <li><a href="#merchandise" className="opacity-80 hover:opacity-100 transition-opacity">Official Store</a></li>
              <li><a href="#tickets" className="opacity-80 hover:opacity-100 transition-opacity">Match Tickets</a></li>
              <li><a href="#" className="opacity-80 hover:opacity-100 transition-opacity">Fan Club</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 opacity-80" />
                <span className="opacity-80">Salt Lake Stadium, Kolkata</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 opacity-80" />
                <span className="opacity-80">+91 33 2334 5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 opacity-80" />
                <span className="opacity-80">info@mohanbagan.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Stay Updated</h4>
            <p className="text-sm opacity-80">
              Get the latest news, match updates, and exclusive content.
            </p>
            <div className="space-y-2">
              <Input
                placeholder="Enter your email"
                className="bg-primary-foreground text-foreground"
              />
              <Button className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm opacity-80">
          <p>&copy; 2024 Mohan Bagan Super Giants. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}