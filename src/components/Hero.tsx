import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import { ArrowRightIcon, ArrowDownRightIcon } from '@phosphor-icons/react'
import { Button } from './Button'
import { ShapeWaves } from './fx/ShapeWaves'
import { SplitWords } from './fx/SplitWords'
import { CAPABILITY_LINKS, DEMO_HREF, DEMO_LABEL } from '../content'

const ease = [0.16, 1, 0.3, 1] as const

export function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  // Al bajar, el fondo se aleja y el texto sube un poco más rápido (parallax leve)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2])
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120])

  const enter = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
          transition: { duration: 1, delay, ease },
        }

  return (
    <section ref={ref} id="inicio" className="relative isolate flex min-h-[100dvh] items-end overflow-hidden pb-14 pt-28 md:pb-20">
      <motion.div
        className="absolute inset-0 -z-10"
        style={reduce ? undefined : { scale: bgScale, opacity: bgOpacity }}
        aria-hidden="true"
      >
        <ShapeWaves />
      </motion.div>
      {/* Velo para que el texto siempre se lea sobre las figuras */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_60%_at_20%_75%,var(--color-canvas)_20%,transparent_75%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-canvas to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-canvas/45 md:hidden" />

      <motion.div className="container-page" style={reduce ? undefined : { y: textY }}>
        <motion.p
          {...enter(0.2)}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-muted backdrop-blur"
        >
          AI-NOVA · Powered Innovation
        </motion.p>

        <h1 className="mt-7 max-w-6xl text-[2.7rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.4rem]">
          <SplitWords
            text="La nueva era de la comunicación inteligente"
            accent={['inteligente']}
            accentClassName="bg-gradient-to-r from-sky to-sage bg-clip-text text-transparent"
            delay={0.45}
            immediate
          />
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <motion.p {...enter(1.1)} className="max-w-[36rem] text-lg leading-relaxed text-muted md:text-xl">
              Con Symphony, tus clientes hablan con agentes de IA que atienden, agendan y venden por voz, web y
              WhatsApp, a cualquier hora.
            </motion.p>
            <motion.div {...enter(1.25)} className="mt-8 flex flex-wrap items-center gap-3">
              <Button href={DEMO_HREF} icon={<ArrowRightIcon size={18} weight="bold" />}>
                {DEMO_LABEL}
              </Button>
              <Button href="#capacidades" variant="ghost">
                Ver capacidades
              </Button>
            </motion.div>
          </div>

          <motion.nav {...enter(1.45)} aria-label="Capacidades de Symphony" className="lg:pb-2">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 lg:flex-col lg:items-end">
              {CAPABILITY_LINKS.map((c) => (
                <li key={c.href}>
                  <a
                    href={c.href}
                    className="group inline-flex items-center gap-2 font-display text-[15px] font-medium text-muted transition-colors hover:text-ink"
                  >
                    {c.label}
                    <ArrowDownRightIcon
                      size={14}
                      weight="bold"
                      className="text-accent transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        </div>
      </motion.div>
    </section>
  )
}
