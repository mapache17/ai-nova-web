import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import {
  ArrowUpRightIcon,
  BrainIcon,
  CalendarCheckIcon,
  ChartLineUpIcon,
  FlowArrowIcon,
  PhoneOutgoingIcon,
  PlugsConnectedIcon,
  SquaresFourIcon,
  UsersThreeIcon,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { SplitWords } from './fx/SplitWords'
import { CircuitBoard } from './fx/CircuitBoard'
import { agentConnections, agentNodes } from './diagrams'
import call from '../assets/product/journey-call.webp'
import scheduling from '../assets/product/scheduling-app.webp'
import widget from '../assets/product/widget.webp'
import flowBuilder from '../assets/product/flow-builder.webp'
import kpis from '../assets/product/analytics-kpis.webp'
import topics from '../assets/product/analytics-topics.webp'
import flowAgent from '../assets/product/flow-ai-agent.webp'

type Capability = {
  id: string
  icon: Icon
  tag: string
  title: string
  body: string
  /** Sección con el detalle, si existe */
  href?: string
  glow: string
  visual: ReactNode
}

// Altura máxima para que ninguna captura se salga de la tarjeta
const shot = 'h-auto max-h-[min(50vh,420px)] w-auto max-w-full rounded-2xl border border-line bg-white shadow-lift'

const campaignRows = [
  { name: 'Laura Gómez', status: 'Cita agendada', tone: 'text-sage bg-sage-soft' },
  { name: 'Andrés Pérez', status: 'En conversación', tone: 'text-accent bg-accent-soft', live: true },
  { name: 'María Ruiz', status: 'Contestó', tone: 'text-accent bg-accent-soft' },
  { name: 'Jorge Díaz', status: 'Marcando…', tone: 'text-sky bg-accent-soft', live: true },
  { name: 'Sofía León', status: 'En cola', tone: 'text-muted bg-sunken' },
]

const capabilities: Capability[] = [
  {
    id: 'agentes',
    icon: BrainIcon,
    tag: 'Agentes de IA',
    title: 'Agentes que hablan como tu mejor asesor',
    body: 'Atienden llamadas con voz natural, entienden el contexto y responden en el idioma de quien llama, a cualquier hora.',
    glow: '#3db5ee',
    visual: (
      <img src={call} alt="Llamada de voz en curso con Sofía, agente virtual de Symphony" width={352} height={536} loading="lazy" className="fade-bottom mx-auto h-[min(52vh,440px)] w-auto" />
    ),
  },
  {
    id: 'agenda',
    icon: CalendarCheckIcon,
    tag: 'Agenda',
    title: 'Agenda la cita en la misma llamada',
    body: 'Consultan disponibilidad, ofrecen horarios y crean la cita en el Scheduling de Symphony sin pasar por un asesor.',
    href: '#como-funciona',
    glow: '#b3d2a0',
    visual: <img src={scheduling} alt="Módulo de Scheduling de Symphony con la agenda diaria por profesional" width={831} height={635} loading="lazy" className={shot} />,
  },
  {
    id: 'multi-agente',
    icon: UsersThreeIcon,
    tag: 'Multi-agente',
    title: 'Un equipo de agentes, coordinado',
    body: 'Un orquestador reparte la llamada entre ventas, soporte y back office, y la pasa a una persona cuando hace falta.',
    glow: '#6cc0c0',
    visual: (
      <div className="w-full overflow-x-auto rounded-2xl border border-line bg-sunken p-4">
        <div className="min-w-[480px]">
        <CircuitBoard width={520} height={290} nodes={agentNodes} connections={agentConnections} label="El orquestador coordina agentes de ventas, soporte y back office, que pueden transferir a un asesor humano." />
        </div>
      </div>
    ),
  },
  {
    id: 'omnicanal',
    icon: SquaresFourIcon,
    tag: 'Omnicanal',
    title: 'El mismo agente en todos tus canales',
    body: 'Telefonía SIP, WebRTC, el widget de tu web, kioscos y WhatsApp. Tus clientes eligen cómo hablar.',
    href: '#canales',
    glow: '#6cc0c0',
    visual: <img src={widget} alt="Widget de Symphony en una página web con el botón Hablemos" width={610} height={599} loading="lazy" className="mx-auto h-auto w-full max-w-sm rounded-2xl bg-white shadow-lift" />,
  },
  {
    id: 'low-code',
    icon: FlowArrowIcon,
    tag: 'Low-code',
    title: 'Diseña flujos sin escribir código',
    body: 'Arrastra nodos para crear servicios de voz, conectar agentes y definir cada paso de la conversación.',
    href: '#constructor',
    glow: '#3db5ee',
    visual: <img src={flowBuilder} alt="Constructor visual de Symphony con un flujo de agente virtual" width={1286} height={648} loading="lazy" className={shot} />,
  },
  {
    id: 'campanas',
    icon: PhoneOutgoingIcon,
    tag: 'Campañas',
    title: 'Campañas salientes que corren solas',
    body: 'Cobranza, recordatorios, encuestas o ventas. Subes tu base en CSV o Excel, Symphony marca y un agente sostiene cada conversación.',
    glow: '#3db5ee',
    visual: (
      <ul className="mx-auto w-full max-w-md divide-y divide-line overflow-hidden rounded-2xl border border-line bg-sunken" aria-label="Ejemplo de campaña en curso">
        {campaignRows.map((r) => (
          <li key={r.name} className="flex items-center justify-between gap-4 px-5 py-4">
            <span className="flex items-center gap-3">
              <span className="inline-flex size-9 items-center justify-center rounded-full bg-surface font-display text-sm font-semibold text-muted">
                {r.name.split(' ').map((p) => p[0]).join('')}
              </span>
              <span className="font-semibold">{r.name}</span>
            </span>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold ${r.tone}`}>
              {r.live && <span className="size-1.5 animate-pulse rounded-full bg-current" />}
              {r.status}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    id: 'analisis',
    icon: ChartLineUpIcon,
    tag: 'Análisis',
    title: 'Cada llamada se convierte en datos',
    body: 'Sentimiento, temas, intención y KPIs de cada conversación, listos para tomar decisiones.',
    href: '#analisis',
    glow: '#b3d2a0',
    visual: (
      <div className="grid gap-3">
        <img src={kpis} alt="Indicadores de sentimiento, conversaciones exitosas y cumplimiento" width={778} height={216} loading="lazy" className={shot} />
        <img src={topics} alt="Distribución y tendencias de temas de las llamadas" width={774} height={237} loading="lazy" className={shot} />
      </div>
    ),
  },
  {
    id: 'integraciones',
    icon: PlugsConnectedIcon,
    tag: 'Integraciones',
    title: 'Conectado a tus sistemas',
    body: 'APIs, webhooks, bases de datos y MCP. Y eliges el modelo de lenguaje que usa cada agente.',
    href: '#canales',
    glow: '#6cc0c0',
    visual: <img src={flowAgent} alt="Flujo con un nodo de Agente IA conectado a un webhook y una plantilla HTML" width={1172} height={320} loading="lazy" className={shot} />,
  },
]

function useIsDesktop() {
  const [desktop, setDesktop] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width: 1024px)').matches)
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)')
    const on = () => setDesktop(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return desktop
}

function StackCard({ c, i, n, progress, stacked }: { c: Capability; i: number; n: number; progress: MotionValue<number>; stacked: boolean }) {
  // Cuando llegan las siguientes tarjetas, esta se encoge y se oscurece un poco
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.03])
  // Los rangos deben quedar dentro de [0, 1]: motion los acelera con la API nativa de scroll
  const shade = useTransform(progress, [Math.min((i + 0.6) / n, 0.99), Math.min((i + 1.4) / n, 1)], [0, i === n - 1 ? 0 : 0.5])
  const CapIcon = c.icon
  const num = String(i + 1).padStart(2, '0')

  return (
    <div
      id={`capacidad-${c.id}`}
      className={stacked ? 'sticky scroll-mt-28' : 'scroll-mt-28'}
      style={stacked ? { top: `calc(6.5rem + ${i * 14}px)` } : undefined}
    >
      <motion.article
        style={stacked ? { scale, transformOrigin: 'top center' } : undefined}
        className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-surface shadow-lift lg:h-[min(72vh,600px)]"
      >
        <div
          aria-hidden="true"
          className="absolute -right-40 -top-40 -z-10 size-[30rem] rounded-full opacity-25 blur-3xl"
          style={{ background: c.glow }}
        />
        <div className="grid h-full gap-8 p-7 md:p-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-14">
          <div className="flex h-full flex-col">
            <p className="font-display text-6xl font-semibold leading-none tracking-tighter text-ink md:text-8xl">{num}</p>
            <p className="mt-6 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              <CapIcon size={16} weight="bold" />
              {c.tag}
            </p>
            <h3 className="mt-3 text-3xl font-medium leading-[1.08] tracking-tight md:text-4xl">{c.title}</h3>
            <p className="mt-4 max-w-[44ch] leading-relaxed text-muted md:text-lg">{c.body}</p>
            {c.href && (
              <a href={c.href} className="group mt-6 inline-flex items-center gap-1.5 self-start font-semibold text-accent hover:text-ink lg:mt-auto">
                Ver cómo funciona
                <ArrowUpRightIcon size={16} weight="bold" className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            )}
          </div>
          <div className="flex min-w-0 items-center justify-center">{c.visual}</div>
        </div>
        {/* Progreso de la pila */}
        <div className="absolute inset-x-7 bottom-5 h-0.5 overflow-hidden rounded-full bg-line md:inset-x-12">
          <div className="h-full rounded-full bg-gradient-to-r from-sky to-sage" style={{ width: `${((i + 1) / n) * 100}%` }} />
        </div>
        {stacked && <motion.div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-canvas" style={{ opacity: shade }} />}
      </motion.article>
    </div>
  )
}

/** Las capacidades de Symphony como tarjetas que se apilan al hacer scroll (estilo Patch AI). */
export function Capabilities() {
  const reduce = useReducedMotion()
  const desktop = useIsDesktop()
  const stacked = desktop && !reduce
  const listRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start start', 'end end'] })
  const n = capabilities.length

  return (
    <section aria-labelledby="capacidades-titulo" className="pb-20 pt-10 md:pb-28">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h2 id="capacidades-titulo" className="max-w-3xl text-3xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            <SplitWords text="Todo lo que Symphony puede hacer por tu empresa" accent={['puede', 'hacer', 'por', 'tu', 'empresa']} />
          </h2>
          <p className="font-mono text-sm text-muted">{String(n).padStart(2, '0')} capacidades</p>
        </div>

        <div ref={listRef} className="mt-12 grid gap-6 lg:gap-[12vh] lg:pb-[6vh]">
          {capabilities.map((c, i) => (
            <StackCard key={c.title} c={c} i={i} n={n} progress={scrollYProgress} stacked={stacked} />
          ))}
        </div>
      </div>
    </section>
  )
}
