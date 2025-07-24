import React, { useState, useEffect } from 'react'
import { Header } from './components/layout/Header'
import { Footer } from './components/layout/Footer'
import { HeroSection } from './components/sections/HeroSection'
import { NewsTicker } from './components/sections/NewsTicker'
import { NewsSection } from './components/sections/NewsSection'
import { MerchandiseSection } from './components/sections/MerchandiseSection'
import { TicketsSection } from './components/sections/TicketsSection'
import { TeamSection } from './components/sections/TeamSection'
import { FixturesSection } from './components/sections/FixturesSection'
import { AdminPanel } from './components/admin/AdminPanel'
import { CartProvider } from './components/cart/CartProvider'
import { Toast } from './components/ui/Toast'
import { LoadingSpinner } from './components/ui/LoadingSpinner'
import { useToast } from './hooks/useToast'
import { Toaster } from './components/ui/toaster'
import { blink } from './blink/client'
import './App.css'

function App() {
  const [showAdmin, setShowAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState(null)
  const { toasts, removeToast } = useToast()

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setIsLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" className="mx-auto mb-4" />
          <p className="text-gray-600">Loading Mohan Bagan Super Giants Portal...</p>
        </div>
      </div>
    )
  }

  if (showAdmin) {
    return (
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          <div className="p-4">
            <button
              onClick={() => setShowAdmin(false)}
              className="mb-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
            >
              ← Back to Website
            </button>
            <AdminPanel />
          </div>
        </div>
        <Toaster />
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </CartProvider>
    )
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-white">
        <Header onAdminClick={() => setShowAdmin(true)} />
        <NewsTicker />
        
        <main>
          <section id="home">
            <HeroSection />
          </section>
          
          <section id="news">
            <NewsSection />
          </section>
          
          <section id="merchandise">
            <MerchandiseSection />
          </section>
          
          <section id="tickets">
            <TicketsSection />
          </section>
          
          <section id="team">
            <TeamSection />
          </section>
          
          <section id="fixtures">
            <FixturesSection />
          </section>
        </main>
        
        <Footer />
      </div>
      <Toaster />
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </CartProvider>
  )
}

export default App