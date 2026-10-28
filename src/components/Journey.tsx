import { ArrowRightIcon } from '@phosphor-icons/react'
import { SectionHeading } from './SectionHeading'
import { Reveal } from './Reveal'
import whatsapp from '../assets/product/journey-whatsapp.webp'
import link from '../assets/product/journey-link.webp'
import call from '../assets/product/journey-call.webp'
import booked from '../assets/product/journey-booked.webp'

const steps = [
  {
    img: whatsapp,
    w: 450,
    h: 537,
    alt: 'Mensaje de WhatsApp de una clínica con el enlace para hablar con Sofía',
    title: 'Recibe el enlace',
    body: 'El paciente recibe por WhatsApp un enlace para hablar con el agente de IA.',
    phone: true,
  },
  {
    img: link,
    w: 348,
    h: 536,
    alt: 'Página web de Sofía con el botón Iniciar llamada',
    title: 'Abre con un clic',
    body: 'Abre el enlace desde cualquier dispositivo, sin instalar aplicaciones.',
    phone: true,
  },
  {
    img: call,
    w: 352,
    h: 536,
    alt: 'Llamada de voz en curso con Sofía, agente virtual',
    title: 'Habla con Sofía',
    body: 'El agente inicia la conversación por voz, entiende la necesidad y guía al usuario.',
    phone: true,
  },
  {
    img: booked,
    w: 589,
    h: 490,
    alt: 'Resumen de la cita agendada con paciente, fecha, hora, profesional y sede',
    title: 'Cita confirmada',
    body: 'Consulta la disponibilidad, agenda en Symphony y envía los detalles por WhatsApp.',
    phone: false,
  },
]

export function Journey() {
  return (
    <section id="como-funciona" className="overflow-hidden border-y border-line bg-surface py-20 md:py-28">
      <div className="container-page">
        <SectionHeading title="Del mensaje a la atención por voz" accent={['voz']}>
          Así atiende Symphony una urgencia odontológica: de un enlace en WhatsApp a una cita confirmada, sin pasar por un
          conmutador.
        </SectionHeading>
      </div>

      <ol className="container-page mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-4 lg:overflow-visible">
        {steps.map((step, i) => (
          <li key={step.title} className="w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
            <Reveal delay={i * 0.08} className="flex h-full flex-col">
              <div className="relative flex h-[300px] items-end justify-center overflow-hidden rounded-3xl bg-sunken px-6 pt-6">
                <img
                  src={step.img}
                  alt={step.alt}
                  width={step.w}
                  height={step.h}
                  loading="lazy"
                  className={
                    step.phone
                      ? 'fade-bottom h-[280px] w-auto'
                      : 'mb-auto h-auto w-full rounded-2xl border border-line bg-white'
                  }
                />
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="font-display text-sm font-semibold text-accent">{i + 1}</span>
                <h3 className="text-lg font-semibold tracking-tight">{step.title}</h3>
                {i < steps.length - 1 && (
                  <ArrowRightIcon size={16} className="ml-auto hidden text-muted lg:block" aria-hidden="true" />
                )}
              </div>
              <p className="mt-2 leading-relaxed text-muted">{step.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  )
}
