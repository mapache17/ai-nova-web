import { SmileyIcon, TargetIcon, DatabaseIcon, ChatsCircleIcon, SealCheckIcon } from '@phosphor-icons/react'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import kpis from '../assets/product/analytics-kpis.webp'
import topics from '../assets/product/analytics-topics.webp'
import fields from '../assets/product/analytics-fields.webp'

const capabilities = [
  { icon: SmileyIcon, title: 'Sentimiento', body: 'Detecta satisfacción, frustración y cambios de ánimo.' },
  { icon: TargetIcon, title: 'Criterios de éxito', body: 'Evalúa si cada conversación cumplió el objetivo del negocio.' },
  { icon: DatabaseIcon, title: 'Extracción de datos', body: 'Intención, resultado, productos y solicitudes en datos estructurados.' },
  { icon: ChatsCircleIcon, title: 'Temas', body: 'Agrupa conversaciones y muestra tendencias y problemas recurrentes.' },
  { icon: SealCheckIcon, title: 'Control de calidad', body: 'Mide cumplimiento, resolución y oportunidades de mejora.' },
]

export function Analytics() {
  return (
    <section id="analisis" className="border-y border-line bg-surface py-20 md:py-28">
      <div className="container-page">
        <SectionHeading title="Cada llamada se convierte en información" accent={['información']}>
          Symphony graba y analiza cada conversación para que entiendas a tus clientes, midas resultados y mejores todos
          los días.
        </SectionHeading>

        <Reveal className="mt-14">
          <figure className="rounded-3xl border border-line bg-white p-4 shadow-soft md:p-6">
            <div className="grid gap-4 lg:grid-cols-2">
              <img src={kpis} alt="Indicadores: sentimiento promedio, conversaciones exitosas, cumplimiento de criterios y conversaciones analizadas" width={778} height={216} loading="lazy" className="h-auto w-full" />
              <img src={topics} alt="Distribución y tendencias de temas: facturación, productos, pagos, soporte técnico" width={774} height={237} loading="lazy" className="h-auto w-full" />
            </div>
            <img src={fields} alt="Datos extraídos de cada conversación: intención, resultado, producto de interés, motivo de contacto" width={494} height={174} loading="lazy" className="mt-4 h-auto w-full max-w-md" />
            <figcaption className="mt-4 text-sm text-[#4c5b68]">Panel de análisis de Symphony con datos de ejemplo.</figcaption>
          </figure>
        </Reveal>

        <ul className="mt-10 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">
          {capabilities.map(({ icon: CapIcon, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.05}>
                <CapIcon size={26} weight="duotone" className="text-accent" />
                <h3 className="mt-3 font-semibold tracking-tight">{title}</h3>
                <p className="mt-1 text-[15px] leading-relaxed text-muted">{body}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
