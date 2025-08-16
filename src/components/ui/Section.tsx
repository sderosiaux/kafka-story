import { HTMLAttributes, forwardRef } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps extends HTMLAttributes<HTMLElement> {
  variant?: 'default' | 'dark' | 'light'
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const Section = forwardRef<HTMLElement, SectionProps>(
  ({ className, variant = 'default', size = 'lg', children, ...props }, ref) => {
    return (
      <section
        className={cn(
          'relative w-full',
          {
            'bg-transparent text-white': variant === 'default',
            'bg-kafka-dark text-white': variant === 'dark',
            'bg-white text-kafka-dark': variant === 'light',
          },
          {
            'py-16 md:py-20': size === 'sm',
            'py-20 md:py-24': size === 'md',
            'py-24 md:py-32': size === 'lg',
            'py-32 md:py-40': size === 'xl',
          },
          className
        )}
        ref={ref}
        {...props}
      >
        <div className="section-padding">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </div>
      </section>
    )
  }
)
Section.displayName = 'Section'

export { Section }