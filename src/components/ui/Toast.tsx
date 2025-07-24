import React, { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertCircle, X } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error' | 'warning'
  onClose: () => void
  duration?: number
}

export const Toast: React.FC<ToastProps> = ({ 
  message, 
  type, 
  onClose, 
  duration = 4000 
}) => {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Allow fade out animation
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle
  }

  const colors = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800'
  }

  const Icon = icons[type]

  return (
    <div className={`
      fixed top-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg
      transition-all duration-300 transform
      ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      ${colors[type]}
    `}>
      <Icon className="w-5 h-5 flex-shrink-0" />
      <span className="font-medium">{message}</span>
      <button
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="ml-2 hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}