import React, { useEffect, useState } from 'react'
import { blink } from '../../blink/client'
import { LoadingSpinner } from './LoadingSpinner'

interface AdminGuardProps {
  children: React.ReactNode
  fallback?: React.ReactNode
}

export const AdminGuard: React.FC<AdminGuardProps> = ({ 
  children, 
  fallback 
}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  if (!user) {
    return (
      <div className="text-center p-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Admin Access Required</h2>
        <p className="text-gray-600 mb-6">Please sign in to access the admin panel.</p>
        <button
          onClick={() => blink.auth.login()}
          className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-200 btn-hover shadow-md"
        >
          Sign In to Continue
        </button>
        {fallback}
      </div>
    )
  }

  return <>{children}</>
}