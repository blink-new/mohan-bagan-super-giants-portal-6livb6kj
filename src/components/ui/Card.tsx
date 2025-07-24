import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  onClick?: () => void
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg border border-gray-200 shadow-sm
        ${hover ? 'card-hover cursor-pointer' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`p-6 pb-0 ${className}`}>
    {children}
  </div>
)

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
)

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = ''
}) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
)