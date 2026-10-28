import logo from '../assets/brand/ainova-logo-light.webp'

// Logo AI-NOVA (versión para fondo oscuro).
export function Logo({ className = 'h-8' }: { className?: string }) {
  return <img src={logo} alt="AI-NOVA" width={480} height={144} className={`w-auto ${className}`} />
}
