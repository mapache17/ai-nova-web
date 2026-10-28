import {
  CubeIcon,
  ArrowsOutIcon,
  WaveformIcon,
  HeadsetIcon,
  KeyIcon,
  GraphIcon,
  ShieldCheckIcon,
  CpuIcon,
  PhoneCallIcon,
  PlugIcon,
  SquaresFourIcon,
  ShuffleIcon,
  MegaphoneIcon,
  PhoneIcon,
  BrowserIcon,
  WebhooksLogoIcon,
  SparkleIcon,
  AppWindowIcon,
} from '@phosphor-icons/react'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import { CircuitBoard } from './fx/CircuitBoard'
import type { CircuitConnection, CircuitNode } from './fx/CircuitBoard'

const nodes: CircuitNode[] = [
  // Servicios de soporte
  { id: 'acd', x: 110, y: 110, w: 170, label: 'ACD Manager', icon: HeadsetIcon },
  { id: 'license', x: 110, y: 223, w: 170, label: 'License Manager', icon: KeyIcon },
  { id: 'knowledge', x: 110, y: 336, w: 170, label: 'Knowledge Service', icon: GraphIcon },
  { id: 'sentinel', x: 110, y: 450, w: 170, label: 'Sentinel', icon: ShieldCheckIcon },
  // Núcleo
  { id: 'router', x: 390, y: 280, w: 190, label: 'Router Engine', sublabel: 'Enrutamiento y orquestación de servicios', icon: CpuIcon, tone: 'accent' },
  // Gateways
  { id: 'syscall', x: 640, y: 50, w: 190, label: 'System Call', icon: PhoneCallIcon },
  { id: 'web', x: 640, y: 142, w: 190, label: 'Web Gateway', icon: PlugIcon },
  { id: 'audio', x: 640, y: 234, w: 190, label: 'AI Audio Processor', icon: WaveformIcon },
  { id: 'service', x: 640, y: 326, w: 190, label: 'Service Gateway', icon: SquaresFourIcon },
  { id: 'callcontrol', x: 640, y: 418, w: 190, label: 'Call Control Gateway', icon: ShuffleIcon },
  { id: 'campaign', x: 640, y: 510, w: 190, label: 'Campaign Director', icon: MegaphoneIcon },
  // Mundo exterior
  { id: 'sip', x: 885, y: 30, w: 170, label: 'Telefonía SIP', icon: PhoneIcon, tone: 'sage' },
  { id: 'webrtc', x: 885, y: 92, w: 170, label: 'Navegador WebRTC', icon: BrowserIcon, tone: 'sage' },
  { id: 'rest', x: 885, y: 160, w: 170, label: 'Webhooks y REST', icon: WebhooksLogoIcon, tone: 'sage' },
  { id: 'gemini', x: 885, y: 234, w: 170, label: 'Gemini · Google Cloud', icon: SparkleIcon, tone: 'sage' },
  { id: 'apps', x: 885, y: 326, w: 170, label: 'Apps y MCP', icon: AppWindowIcon, tone: 'sage' },
]

const connections: CircuitConnection[] = [
  { from: 'acd', to: 'router', bidirectional: true },
  { from: 'license', to: 'router' },
  { from: 'knowledge', to: 'router', bidirectional: true },
  { from: 'sentinel', to: 'router' },
  { from: 'router', to: 'syscall', bidirectional: true },
  { from: 'router', to: 'web', bidirectional: true },
  { from: 'router', to: 'audio', bidirectional: true },
  { from: 'router', to: 'service' },
  { from: 'router', to: 'callcontrol' },
  { from: 'router', to: 'campaign' },
  { from: 'syscall', to: 'sip', bidirectional: true },
  { from: 'syscall', to: 'webrtc', bidirectional: true },
  { from: 'web', to: 'rest' },
  { from: 'audio', to: 'gemini', bidirectional: true },
  { from: 'service', to: 'apps' },
]

const pillars = [
  {
    icon: CubeIcon,
    title: 'Microservicios desacoplados',
    body: 'Telefonía, IA y aplicaciones empresariales en módulos independientes, listos para evolucionar con tu negocio.',
  },
  {
    icon: ArrowsOutIcon,
    title: 'Escala horizontal y vertical',
    body: 'Agrega nodos o recursos sin detener el servicio. Alta disponibilidad y tolerancia a fallos.',
  },
  {
    icon: WaveformIcon,
    title: 'Voz de baja latencia',
    body: 'Reconocimiento y síntesis de voz con detección de actividad, reducción de ruido y caché para bajar costos.',
  },
]

export function Platform() {
  return (
    <section id="plataforma" className="overflow-hidden py-20 md:py-28">
      <div className="container-page">
        <SectionHeading eyebrow="Plataforma" title="Construida para crecer con tu operación" accent={['tu', 'operación']}>
          Symphony corre en la nube sobre Google Cloud y usa Gemini para comprender, razonar y responder.
        </SectionHeading>

        <Reveal className="mt-12">
          <div className="overflow-x-auto rounded-3xl border border-line bg-sunken">
            <div className="min-w-[1060px] p-6 md:p-10 lg:min-w-0">
              <CircuitBoard
                width={1000}
                height={560}
                nodes={nodes}
                connections={connections}
                label="Arquitectura de Symphony: el Router Engine coordina ACD Manager, License Manager, Knowledge Service y Sentinel, y se conecta con los gateways de llamadas, web, audio con IA, servicios, control de llamadas y campañas, que a su vez enlazan con telefonía SIP, navegadores WebRTC, webhooks, Gemini en Google Cloud y aplicaciones vía MCP."
              />
            </div>
          </div>
          <p className="mt-3 text-sm text-muted lg:hidden">Desliza para ver toda la arquitectura.</p>
        </Reveal>
      </div>

      <div className="container-page mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
        {pillars.map(({ icon: PillarIcon, title, body }, i) => (
          <Reveal key={title} delay={i * 0.08} className="border-t border-line pt-6">
            <PillarIcon size={28} weight="duotone" className="text-accent" />
            <h3 className="mt-4 text-xl font-medium tracking-tight">{title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
