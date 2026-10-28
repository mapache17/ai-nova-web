import { ArrowRightIcon, EnvelopeSimpleIcon, PhoneIcon, WhatsappLogoIcon } from '@phosphor-icons/react'
import { Button } from './Button'
import { Reveal } from './Reveal'
import { DotField } from './fx/DotField'
import { SplitWords } from './fx/SplitWords'
import { CONTACT, DEMO_HREF, DEMO_LABEL } from '../content'

export function Contact() {
  return (
    <section id="contacto" className="pb-20 md:pb-28">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-surface shadow-lift">
            <div className="absolute inset-0" aria-hidden="true">
              <DotField />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_40%,var(--color-surface)_15%,transparent_70%)]" />

            <div className="relative grid gap-12 p-8 md:p-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div>
                <h2 className="text-3xl font-medium leading-[1.08] tracking-tight md:text-6xl">
                  <SplitWords text="Llevemos AI-NOVA a tu operación" accent={['tu', 'operación']} />
                </h2>
                <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-muted">
                  Cuéntanos cómo atiendes hoy a tus clientes y te mostramos un agente funcionando con tu caso.
                </p>
                <Button href={DEMO_HREF} className="mt-8" icon={<ArrowRightIcon size={18} weight="bold" />}>
                  {DEMO_LABEL}
                </Button>
              </div>

              <address className="glass rounded-3xl border border-line p-6 not-italic md:p-8">
                <p className="font-display text-xl font-medium">{CONTACT.name}</p>
                <p className="text-muted">AI-NOVA</p>
                <ul className="mt-6 space-y-3">
                  <li>
                    <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 rounded-xl py-1 hover:text-accent">
                      <EnvelopeSimpleIcon size={20} className="text-accent" />
                      {CONTACT.email}
                    </a>
                  </li>
                  <li>
                    <a href={CONTACT.phoneHref} className="flex items-center gap-3 rounded-xl py-1 hover:text-accent">
                      <PhoneIcon size={20} className="text-accent" />
                      {CONTACT.phoneDisplay}
                    </a>
                  </li>
                  <li>
                    <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="flex items-center gap-3 rounded-xl py-1 hover:text-accent">
                      <WhatsappLogoIcon size={20} className="text-accent" />
                      Escribir por WhatsApp
                    </a>
                  </li>
                </ul>
              </address>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
