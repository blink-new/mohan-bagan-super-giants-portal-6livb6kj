import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { Menu, X, Search, User, Settings } from 'lucide-react'
import { CartDrawer } from '../cart/CartDrawer'
import { useCart } from '../../hooks/useCart'
import { blink } from '../../blink/client'

interface HeaderProps {
  onAdminClick: () => void
}

export function Header({ onAdminClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const { itemCount } = useCart()

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
    })
    return unsubscribe
  }, [])

  const handleLogin = () => {
    blink.auth.login()
  }

  const handleLogout = () => {
    blink.auth.logout()
  }

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'News', href: '#news' },
    { name: 'Merchandise', href: '#merchandise' },
    { name: 'Tickets', href: '#tickets' },
    { name: 'Team', href: '#team' },
    { name: 'Fixtures', href: '#fixtures' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">MB</span>
              </div>
            </div>
            <div className="ml-3">
              <h1 className="text-xl font-bold text-gray-900">Mohan Bagan</h1>
              <p className="text-xs text-gray-500">Super Giants</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-primary px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <Button variant="ghost" size="sm">
              <Search className="h-4 w-4" />
            </Button>

            {/* Cart */}
            <CartDrawer />

            {/* User Menu */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline text-sm">{user.email}</span>
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={onAdminClick}
                  className="flex items-center space-x-1 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20"
                >
                  <Settings className="h-4 w-4" />
                  <span className="hidden sm:inline">Admin</span>
                </Button>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={handleLogin}>
                Sign In
              </Button>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              {user && (
                <Button
                  variant="outline"
                  className="w-full justify-start px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 mt-2"
                  onClick={() => {
                    onAdminClick()
                    setIsMenuOpen(false)
                  }}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Panel
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}