import { FlowArrowIcon, HandGrabbingIcon, BugBeetleIcon, CopyIcon } from '@phosphor-icons/react'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import flowBuilder from '../assets/product/flow-builder.webp'
import agentSettings from '../assets/product/agent-settings.webp'

const features = [
  { icon: FlowArrowIcon, title: 'Plataforma low-code', body: 'Desarrollo visual sin programación compleja.' },
  { icon: HandGrabbingIcon, title: 'Arrastrar y soltar', body: 'Flujos conversacionales armados con bloques.' },
  { icon: BugBeetleIcon, title: 'Depuración en vivo', body: 'Prueba y corrige tus servicios en tiempo real.' },
  { icon: CopyIcon, title: 'Plantillas reutilizables', body: 'Copia y pega componentes ya probados.' },
]

export function LowCode() {
  return (
    <section id="constructor" className="py-20 md:py-28">
      <div className="container-page">
        <SectionHeading title="Diseña servicios de voz sin escribir código" accent={['sin', 'escribir', 'código']}>
          El constructor visual de Symphony une llamadas, colas, agentes de IA y tus sistemas en un solo flujo.
        </SectionHeading>

        <Reveal className="relative mt-14">
          <div className="overflow-hidden rounded-3xl border border-line bg-white shadow-lift">
            <div className="flex items-center gap-2 border-b border-[#e6ebef] bg-[#f7f9fb] px-5 py-3" aria-hidden="true">
              <span className="size-3 rounded-full bg-[#e5e9ed]" />
              <span className="size-3 rounded-full bg-[#e5e9ed]" />
              <span className="size-3 rounded-full bg-[#e5e9ed]" />
            </div>
            <img
              src={flowBuilder}
              alt="Constructor visual de Symphony con un flujo de agente virtual: contestar llamada, cola de ventas con IA, transferencia a humano y colgar"
              width={1286}
              height={648}
              loading="lazy"
              className="h-auto w-full"
            />
          </div>
          <img
            src={agentSettings}
            alt="Panel de configuración del nodo Agente IA: modelo, prompt del sistema y variable de respuesta"
            width={308}
            height={764}
            loading="lazy"
            className="absolute -bottom-10 -right-4 hidden w-[200px] rounded-2xl border border-line bg-white shadow-lift lg:block xl:-right-8 xl:w-[220px]"
          />
        </Reveal>

        <ul className="mt-16 grid gap-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4">
          {features.map(({ icon: FeatureIcon, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.06} className="flex gap-4">
                <FeatureIcon size={26} weight="duotone" className="mt-0.5 shrink-0 text-accent" />
                <div>
                  <h3 className="font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1 text-[15px] leading-relaxed text-muted">{body}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
