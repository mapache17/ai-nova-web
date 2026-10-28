import { useId, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import {
  BrowserIcon,
  WhatsappLogoIcon,
  QrCodeIcon,
  PhoneIcon,
  WebhooksLogoIcon,
  CheckIcon,
  CpuIcon,
  AddressBookIcon,
  BuildingsIcon,
  DatabaseIcon,
  CodeIcon,
  AppWindowIcon,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { CircuitBoard } from './fx/CircuitBoard'
import type { CircuitConnection, CircuitNode } from './fx/CircuitBoard'
import widget from '../assets/product/widget.webp'
import whatsapp from '../assets/product/journey-whatsapp.webp'
import kiosk from '../assets/product/kiosk.webp'

const integrationNodes: CircuitNode[] = [
  { id: 'symphony', x: 280, y: 170, w: 160, label: 'Symphony', sublabel: 'Eventos en tiempo real', icon: CpuIcon, tone: 'accent' },
  { id: 'crm', x: 82, y: 60, w: 156, label: 'CRM', icon: AddressBookIcon },
  { id: 'erp', x: 82, y: 170, w: 156, label: 'ERP', icon: BuildingsIcon },
  { id: 'db', x: 82, y: 280, w: 156, label: 'Base de datos', icon: DatabaseIcon },
  { id: 'webhooks', x: 478, y: 60, w: 156, label: 'Webhooks', icon: WebhooksLogoIcon, tone: 'sage' },
  { id: 'rest', x: 478, y: 170, w: 156, label: 'API REST', icon: CodeIcon, tone: 'sage' },
  { id: 'mcp', x: 478, y: 280, w: 156, label: 'Gateway MCP', icon: AppWindowIcon, tone: 'sage' },
]

const integrationConnections: CircuitConnection[] = [
  { from: 'crm', to: 'symphony', bidirectional: true },
  { from: 'erp', to: 'symphony', bidirectional: true },
  { from: 'db', to: 'symphony', bidirectional: true },
  { from: 'symphony', to: 'webhooks' },
  { from: 'symphony', to: 'rest', bidirectional: true },
  { from: 'symphony', to: 'mcp', bidirectional: true },
]

type Channel = {
  id: string
  label: string
  icon: Icon
  title: string
  body: string
  points: string[]
  visual: ReactNode
}

const widgetSnippet = `<symphony-widget
  target="TU_ID_DE_WIDGET">
</symphony-widget>
<script
  src="https://widget.ai-nova.dev/dist/webrtc-widget.umd.js"
  async></script>`

const channels: Channel[] = [
  {
    id: 'web',
    label: 'Widget web',
    icon: BrowserIcon,
    title: 'Llamadas con IA en tu sitio, con una línea de código',
    body: 'El widget de Symphony agrega llamadas de voz con agentes de IA a cualquier página, sin tocar tu infraestructura.',
    points: ['Comunicación cifrada con WebRTC', 'Funciona en cualquier navegador y dispositivo', 'Texto, posición, avatar y colores configurables'],
    visual: (
      <div className="grid gap-4">
        <pre className="overflow-x-auto rounded-2xl bg-[#0d1820] p-5 font-mono text-[13px] leading-relaxed text-[#cfe3ef]">
          <code>{widgetSnippet}</code>
        </pre>
        <img src={widget} alt="Widget de Symphony desplegado en una página web con el botón Hablemos" width={610} height={599} loading="lazy" className="mx-auto h-auto w-full max-w-sm rounded-2xl bg-white" />
      </div>
    ),
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    icon: WhatsappLogoIcon,
    title: 'Del chat a una llamada con el agente',
    body: 'Comparte un enlace por WhatsApp y tu cliente habla por voz con el agente de IA desde el navegador.',
    points: ['Sin instalar aplicaciones', 'El agente agenda y confirma por WhatsApp', 'Funciona en cualquier celular con navegador'],
    visual: (
      <img src={whatsapp} alt="Conversación de WhatsApp con el enlace Habla con Sofía ahora" width={450} height={537} loading="lazy" className="fade-bottom mx-auto h-[420px] w-auto" />
    ),
  },
  {
    id: 'kiosco',
    label: 'Kiosco y QR',
    icon: QrCodeIcon,
    title: 'El mismo agente en tus sedes físicas',
    body: 'Kioscos con pantalla táctil y códigos QR que abren la conversación desde el celular, con el mismo contexto.',
    points: ['Conversación por voz natural', 'Atención 24/7 sin filas', 'Acceso inmediato con la cámara del celular'],
    visual: (
      <img src={kiosk} alt="Kiosco táctil con la asistente Sofía" width={248} height={530} loading="lazy" className="mx-auto h-[420px] w-auto rounded-2xl bg-white" />
    ),
  },
  {
    id: 'sip',
    label: 'Telefonía SIP',
    icon: PhoneIcon,
    title: 'Conecta tu PBX y tus operadores',
    body: 'Symphony habla SIP, el estándar de la telefonía IP, para integrarse rápido con tu infraestructura actual.',
    points: ['Enrutamiento inteligente con ACD', 'Autenticación y transporte seguro con TLS', 'Escalable para operaciones de cualquier tamaño'],
    visual: (
      <dl className="grid gap-3">
        {[
          ['SIP Trunk', 'Puerto 5060 · TLS 5061'],
          ['Web Trunk', 'TLS 443'],
          ['Agente remoto', 'TLS 443'],
        ].map(([k, v]) => (
          <div key={k} className="flex items-center justify-between rounded-2xl border border-line bg-surface px-5 py-4">
            <dt className="font-semibold">{k}</dt>
            <dd className="font-mono text-sm text-muted">{v}</dd>
          </div>
        ))}
        <p className="px-1 pt-2 text-sm text-muted">Tres Session Border Controllers dedicados protegen cada tipo de tráfico.</p>
      </dl>
    ),
  },
  {
    id: 'webhooks',
    label: 'Webhooks y APIs',
    icon: WebhooksLogoIcon,
    title: 'Integra tu CRM, ERP o cualquier servicio',
    body: 'Webhooks y APIs HTTPS para intercambiar información en tiempo real y automatizar tus flujos de negocio.',
    points: ['Eventos en tiempo real', 'Reintentos y validaciones para asegurar la entrega', 'Gateway REST y MCP para aplicaciones'],
    visual: (
      <div className="overflow-x-auto">
        <div className="min-w-[520px]">
          <CircuitBoard
            width={560}
            height={340}
            nodes={integrationNodes}
            connections={integrationConnections}
            label="Symphony intercambia datos en tiempo real con CRM, ERP y bases de datos, y expone webhooks, API REST y un gateway MCP."
          />
        </div>
      </div>
    ),
  },
]

export function Channels() {
  const [active, setActive] = useState(channels[0].id)
  const reduce = useReducedMotion()
  const baseId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const current = channels.find((c) => c.id === active) ?? channels[0]

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const i = channels.findIndex((c) => c.id === active)
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    const next = e.key === 'ArrowRight' ? (i + 1) % channels.length : (i - 1 + channels.length) % channels.length
    e.preventDefault()
    setActive(channels[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="canales" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading title="Un mismo agente en todos tus canales">
          Web, WhatsApp, kioscos, telefonía tradicional e integraciones. Tus clientes eligen cómo hablar y el agente
          conserva el contexto.
        </SectionHeading>

        <Reveal className="mt-12">
          <div
            role="tablist"
            aria-label="Canales de Symphony"
            onKeyDown={onKeyDown}
            className="fade-x -mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 md:[mask-image:none]"
          >
            {channels.map((c, i) => {
              const selected = c.id === active
              const TabIcon = c.icon
              return (
                <button
                  key={c.id}
                  ref={(el) => {
                    tabRefs.current[i] = el
                  }}
                  role="tab"
                  id={`${baseId}-tab-${c.id}`}
                  aria-selected={selected}
                  aria-controls={`${baseId}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(c.id)}
                  className={`relative inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-2.5 text-[15px] font-semibold transition-colors ${
                    selected ? 'text-accent-ink' : 'text-muted hover:bg-sunken hover:text-ink'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="channel-pill"
                      className="absolute inset-0 rounded-full bg-accent"
                      transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <TabIcon size={18} weight="bold" className="relative" />
                  <span className="relative">{c.label}</span>
                </button>
              )
            })}
          </div>

          <div
            id={`${baseId}-panel`}
            role="tabpanel"
            aria-labelledby={`${baseId}-tab-${current.id}`}
            className="mt-6 overflow-hidden rounded-3xl border border-line bg-sunken"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 items-center gap-10 p-7 md:p-12 lg:grid-cols-2"
              >
                <div className="min-w-0">
                  <h3 className="text-2xl font-medium leading-tight tracking-tight md:text-3xl">{current.title}</h3>
                  <p className="mt-4 max-w-[48ch] text-lg leading-relaxed text-muted">{current.body}</p>
                  <ul className="mt-7 space-y-3">
                    {current.points.map((p) => (
                      <li key={p} className="flex items-start gap-3">
                        <CheckIcon size={20} weight="bold" className="mt-0.5 shrink-0 text-accent" />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="min-w-0">{current.visual}</div>
              </motion.div>
            </AnimatePresence>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
