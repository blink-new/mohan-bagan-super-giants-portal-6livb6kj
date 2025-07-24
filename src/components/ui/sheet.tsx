import React from 'react'
import { X } from 'lucide-react'
import { Button } from './Button'

interface SheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

interface SheetContentProps {
  className?: string
  children: React.ReactNode
}

interface SheetHeaderProps {
  children: React.ReactNode
}

interface SheetTitleProps {
  className?: string
  children: React.ReactNode
}

interface SheetTriggerProps {
  asChild?: boolean
  children: React.ReactNode
}

export function Sheet({ open, onOpenChange, children }: SheetProps) {
  return (
    <>
      {children}
      {open && (
        <div className="fixed inset-0 z-50">
          <div 
            className="fixed inset-0 bg-black/50" 
            onClick={() => onOpenChange(false)}
          />
        </div>
      )}
    </>
  )
}

export function SheetContent({ className = '', children }: SheetContentProps) {
  return (
    <div className={`fixed right-0 top-0 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ${className}`}>
      {children}
    </div>
  )
}

export function SheetHeader({ children }: SheetHeaderProps) {
  return (
    <div className="flex items-center justify-between p-6 border-b">
      {children}
    </div>
  )
}

export function SheetTitle({ className = '', children }: SheetTitleProps) {
  return (
    <h2 className={`text-lg font-semibold ${className}`}>
      {children}
    </h2>
  )
}

export function SheetTrigger({ asChild, children }: SheetTriggerProps) {
  return <>{children}</>
}