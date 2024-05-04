import React from 'preact/compat'

const variantClasses = {
  default: 'bg-primary text-primary-foreground hover:bg-primary/90',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
  outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
  secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
  ghost: 'hover:bg-accent hover:text-accent-foreground',
  link: 'text-primary underline-offset-4 hover:underline'
}
const sizeClasses = {
  default: 'h-10 px-4 py-2',
  sm: 'h-9 rounded-md px-3',
  lg: 'h-11 rounded-md px-8',
  icon: 'h-10 w-10'
}

interface ButtonProps extends Omit<React.HTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: keyof typeof variantClasses
  size?: keyof typeof sizeClasses
  children: React.ReactNode
}

export function Button({ variant = 'default', size = 'default', children, ...otherProps }: ButtonProps) {
  const base = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'

  return (
    <button {...otherProps} class={`${base} ${variantClasses[variant]} ${sizeClasses[size]}`}>
      {children}
    </button>
  )
}
