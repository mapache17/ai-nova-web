import { useId } from 'react'
import { useReducedMotion } from 'motion/react'
import type { Icon } from '@phosphor-icons/react'

export type CircuitNode = {
  id: string
  /** Centro del nodo en unidades del viewBox */
  x: number
  y: number
  label: string
  sublabel?: string
  icon: Icon
  /** Ancho del nodo en unidades del viewBox */
  w?: number
  tone?: 'default' | 'accent' | 'sage' | 'warn'
}

export type CircuitConnection = {
  from: string
  to: string
  /** 'h': sale en horizontal (por defecto). 'v': sale en vertical. */
  route?: 'h' | 'v'
  bidirectional?: boolean
}

type Props = {
  nodes: CircuitNode[]
  connections: CircuitConnection[]
  width: number
  height: number
  /** Segundos que tarda un pulso en recorrer una pista */
  pulseSpeed?: number
  showGrid?: boolean
  label: string
  className?: string
}

const toneClass: Record<NonNullable<CircuitNode['tone']>, string> = {
  default: 'border-line bg-surface text-ink',
  accent: 'border-accent/50 bg-accent-soft text-ink',
  sage: 'border-sage/40 bg-sage-soft text-ink',
  warn: 'border-warn/40 bg-warn-soft text-ink',
}

const iconClass: Record<NonNullable<CircuitNode['tone']>, string> = {
  default: 'text-accent',
  accent: 'text-accent',
  sage: 'text-sage',
  warn: 'text-warn',
}

const sign = (n: number) => (n < 0 ? -1 : 1)

/** Pista ortogonal con esquinas redondeadas, como en un circuito impreso. */
function tracePath(a: CircuitNode, b: CircuitNode, route: 'h' | 'v', r = 10) {
  if (route === 'h') {
    if (Math.abs(b.y - a.y) < 1) return `M ${a.x} ${a.y} H ${b.x}`
    const mx = (a.x + b.x) / 2
    const k = Math.min(r, Math.abs(b.y - a.y) / 2, Math.abs(mx - a.x))
    const sx1 = sign(mx - a.x)
    const sy = sign(b.y - a.y)
    const sx2 = sign(b.x - mx)
    return `M ${a.x} ${a.y} H ${mx - k * sx1} Q ${mx} ${a.y} ${mx} ${a.y + k * sy} V ${b.y - k * sy} Q ${mx} ${b.y} ${mx + k * sx2} ${b.y} H ${b.x}`
  }
  if (Math.abs(b.x - a.x) < 1) return `M ${a.x} ${a.y} V ${b.y}`
  const my = (a.y + b.y) / 2
  const k = Math.min(r, Math.abs(b.x - a.x) / 2, Math.abs(my - a.y))
  const sy1 = sign(my - a.y)
  const sx = sign(b.x - a.x)
  const sy2 = sign(b.y - my)
  return `M ${a.x} ${a.y} V ${my - k * sy1} Q ${a.x} ${my} ${a.x + k * sx} ${my} H ${b.x - k * sx} Q ${b.x} ${my} ${b.x} ${my + k * sy2} V ${b.y}`
}

/**
 * Diagrama tipo circuito impreso: nodos unidos por pistas por las que viajan pulsos de luz.
 * Inspirado en Circuit Board de componentry.dev.
 */
export function CircuitBoard({
  nodes,
  connections,
  width,
  height,
  pulseSpeed = 2.4,
  showGrid = true,
  label,
  className = '',
}: Props) {
  const reduce = useReducedMotion()
  const uid = useId().replace(/:/g, '')
  const byId = new Map(nodes.map((n) => [n.id, n]))

  const traces = connections.flatMap((c, i) => {
    const a = byId.get(c.from)
    const b = byId.get(c.to)
    if (!a || !b) return []
    return [{ key: `${c.from}-${c.to}`, d: tracePath(a, b, c.route ?? 'h'), a, b, i, bidirectional: c.bidirectional }]
  })

  return (
    <figure
      role="img"
      aria-label={label}
      className={`relative w-full ${className}`}
      style={{ aspectRatio: `${width} / ${height}` }}
    >
      <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id={`grid-${uid}`} width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="1" fill="var(--color-line)" />
          </pattern>
          <filter id={`glow-${uid}`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
          <linearGradient id={`pulse-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-sky)" />
            <stop offset="100%" stopColor="var(--color-sage)" />
          </linearGradient>
        </defs>

        {showGrid && <rect width={width} height={height} fill={`url(#grid-${uid})`} />}

        {traces.map((t) => (
          <g key={t.key}>
            <path d={t.d} fill="none" stroke="#24394a" strokeWidth="1.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
            <circle cx={t.a.x} cy={t.a.y} r="3" fill="#24394a" />
            <circle cx={t.b.x} cy={t.b.y} r="3" fill="#24394a" />
          </g>
        ))}

        {!reduce &&
          traces.flatMap((t) => {
            const pulses = [false, ...(t.bidirectional ? [true] : [])]
            return pulses.map((reverse) => {
              const style = {
                animationDuration: `${pulseSpeed}s`,
                animationDelay: `${(t.i * 0.37 + (reverse ? pulseSpeed / 2 : 0)) % pulseSpeed}s`,
                animationDirection: reverse ? 'reverse' : 'normal',
              }
              return (
                <g key={`${t.key}-${reverse ? 'r' : 'f'}`}>
                  <path
                    d={t.d}
                    pathLength={100}
                    className="circuit-pulse"
                    fill="none"
                    stroke="var(--color-sky)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    opacity="0.55"
                    filter={`url(#glow-${uid})`}
                    style={style}
                  />
                  <path
                    d={t.d}
                    pathLength={100}
                    className="circuit-pulse"
                    fill="none"
                    stroke={`url(#pulse-${uid})`}
                    strokeWidth="2"
                    strokeLinecap="round"
                    vectorEffect="non-scaling-stroke"
                    style={style}
                  />
                </g>
              )
            })
          })}
      </svg>

      {nodes.map((n) => {
        const tone = n.tone ?? 'default'
        const NodeIcon = n.icon
        return (
          <div
            key={n.id}
            className={`absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2.5 rounded-xl border px-3 py-2.5 shadow-soft ${toneClass[tone]}`}
            style={{
              left: `${(n.x / width) * 100}%`,
              top: `${(n.y / height) * 100}%`,
              width: `${((n.w ?? 160) / width) * 100}%`,
            }}
          >
            <NodeIcon size={n.sublabel ? 22 : 18} weight="duotone" className={`shrink-0 ${iconClass[tone]}`} />
            <div className="min-w-0">
              <p className="text-[13px] font-semibold leading-tight">{n.label}</p>
              {n.sublabel && <p className="mt-0.5 text-[11px] leading-snug text-muted">{n.sublabel}</p>}
            </div>
          </div>
        )
      })}
    </figure>
  )
}
