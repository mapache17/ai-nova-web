import {
  PhoneCallIcon,
  ChatCircleDotsIcon,
  BrainIcon,
  TreeStructureIcon,
  ShieldCheckIcon,
  EnvelopeSimpleIcon,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'
import type { CSSProperties } from 'react'
import { Reveal } from './Reveal'
import { SplitWords } from './fx/SplitWords'

type Service = { icon: Icon; title: string; body: string; color: string }

// Solo colores de marca: cielo, el tono medio del degradado y salvia, en diagonal por la cuadrícula.
const SKY = '#3db5ee'
const TEAL = '#6cc0c0'
const SAGE = '#b3d2a0'

const services: Service[] = [
  {
    icon: PhoneCallIcon,
    title: 'Comunicaciones de voz',
    body: 'Soluciones de voz sobre SIP, WebRTC y redes tradicionales, con alta disponibilidad y calidad de servicio.',
    color: SKY,
  },
  {
    icon: ChatCircleDotsIcon,
    title: 'Mensajería SMS',
    body: 'SMS y USSD para campañas, notificaciones y servicios interactivos, integrados con operadores y de alto volumen.',
    color: TEAL,
  },
  {
    icon: BrainIcon,
    title: 'Inteligencia artificial',
    body: 'IA en voz y SMS para automatizar interacciones, mejorar la atención y crear experiencias personalizadas.',
    color: SAGE,
  },
  {
    icon: TreeStructureIcon,
    title: 'Soluciones de IVR',
    body: 'IVR inteligentes con menús dinámicos, integración con tus sistemas de negocio y capacidades de IA.',
    color: TEAL,
  },
  {
    icon: ShieldCheckIcon,
    title: 'SBC',
    body: 'Session Border Controllers para seguridad, control de tráfico y conectividad confiable entre redes, operadores y plataformas.',
    color: SAGE,
  },
  {
    icon: EnvelopeSimpleIcon,
    title: 'SMS SMPP Gateway',
    body: 'Despliegue y gestión de gateways SMPP de alto rendimiento para enviar y recibir SMS con múltiples operadores.',
    color: SKY,
  },
]

export function Services() {
  return (
    <section id="experiencia" className="border-y border-line bg-surface py-20 md:py-28">
      <div className="container-page">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
            <SplitWords text="La experiencia de AI-NOVA" accent={['AI-NOVA']} accentClassName="text-sage" />
          </h2>
          <p className="mt-5 max-w-[56ch] text-lg leading-relaxed text-muted">
            Expertos en soluciones de comunicación de voz, SMS e inteligencia artificial. Conectamos empresas con sus
            clientes de forma simple, segura y escalable.
          </p>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ icon: ServiceIcon, title, body, color }, i) => (
            <li key={title}>
              <Reveal delay={(i % 3) * 0.07} className="h-full">
                <article className="group relative flex h-full gap-5 overflow-hidden rounded-3xl border border-line bg-canvas p-6 transition-colors hover:border-[color:var(--tone)] md:p-7" style={{ '--tone': `${color}66` } as CSSProperties}>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 size-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                    style={{ background: color }}
                  />
                  <ServiceIcon size={44} weight="duotone" className="shrink-0" style={{ color }} />
                  <div>
                    <h3 className="text-lg font-semibold leading-tight tracking-tight">{title}</h3>
                    <span aria-hidden="true" className="mt-3 block h-0.5 w-12 rounded-full" style={{ background: color }} />
                    <p className="mt-4 text-[15px] leading-relaxed text-muted">{body}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
