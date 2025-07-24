import React from 'react'

interface TextareaProps {
  id?: string
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  rows?: number
  className?: string
}

export function Textarea({ 
  id, 
  placeholder, 
  value, 
  onChange, 
  rows = 3, 
  className = '' 
}: TextareaProps) {
  return (
    <textarea
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none ${className}`}
    />
  )
}