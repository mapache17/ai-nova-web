import type { AnchorHTMLAttributes, ReactNode } from 'react'

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: 'primary' | 'ghost'
  icon?: ReactNode
}

const base =
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-[15px] font-semibold transition-[transform,background-color,border-color,color] duration-300 ease-out-expo active:scale-[0.98]'

const variants = {
  primary: 'bg-accent text-accent-ink shadow-soft hover:-translate-y-0.5 hover:brightness-110',
  ghost:
    'border border-line bg-surface/60 text-ink hover:border-accent hover:text-accent',
}

export function Button({ variant = 'primary', icon, children, className = '', ...rest }: ButtonProps) {
  // Los enlaces externos (p. ej. WhatsApp) se abren en otra pestaña
  const external = rest.href?.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {}
  return (
    <a className={`${base} ${variants[variant]} ${className}`} {...external} {...rest}>
      {children}
      {icon && (
        <span className="transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </a>
  )
}
