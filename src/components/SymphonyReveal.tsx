import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'
import { WaveField } from './WaveField'
import flowBuilder from '../assets/product/flow-builder.webp'

const facts = [
  { value: '24/7', label: 'Atención sin interrupciones' },
  { value: '4', label: 'Canales: SIP, WebRTC, web y WhatsApp' },
  { value: '0', label: 'Líneas de código para crear un flujo' },
]

/** Lo que se ve dentro de las letras: degradado de marca, la interfaz real y las ondas de Symphony. */
function Media({ progress }: { progress?: MotionValue<number> }) {
  const fallback = useScroll().scrollYProgress
  const p = progress ?? fallback
  const bgX = useTransform(p, [0, 1], ['0%', '100%'])
  const imgScale = useTransform(p, [0, 1], [1.25, 1])
  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 bg-[linear-gradient(110deg,#0b8fd0,#2b9fb0_35%,#8fbf86_65%,#0b8fd0)] bg-[length:200%_100%]"
      style={progress ? { backgroundPositionX: bgX } : undefined}
    >
      <motion.img
        src={flowBuilder}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30 mix-blend-luminosity"
        style={progress ? { scale: imgScale } : undefined}
      />
      <div className="absolute inset-0 opacity-90 mix-blend-screen">
        <WaveField lines={34} amplitude={0.32} speed={0.45} />
      </div>
    </motion.div>
  )
}

/**
 * "SYMPHONY" gigante con la imagen dentro de las letras (estilo Shape of Intelligence).
 * Al hacer scroll la palabra crece, se abre y deja ver el producto.
 * Truco: capa del color del fondo con texto blanco en mix-blend-multiply → las letras se vuelven ventanas.
 */
export function SymphonyReveal() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const wordScale = useTransform(scrollYProgress, [0, 0.55], [0.78, 1])
  const wordY = useTransform(scrollYProgress, [0, 0.55], ['6%', '0%'])
  const knockout = useTransform(scrollYProgress, [0.45, 0.68], [1, 0])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0])
  const panelOpacity = useTransform(scrollYProgress, [0.62, 0.8], [0, 1])
  const panelY = useTransform(scrollYProgress, [0.62, 0.85], [80, 0])

  if (reduce) {
    return (
      <section id="capacidades" aria-label="Symphony" className="py-20 md:py-28">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem]">
            <Media />
            <div className="relative bg-canvas mix-blend-multiply">
              <h2 className="py-6 text-center font-display text-[22vw] font-semibold leading-none tracking-tighter text-white lg:text-[16rem]">
                SYMPHONY
              </h2>
            </div>
          </div>
          <Panel />
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} id="capacidades" aria-label="Symphony" className="relative h-[240vh] md:h-[300vh]">
      <div className="sticky top-0 h-[100dvh] overflow-hidden">
        <Media progress={scrollYProgress} />

        {/* Capa que recorta: solo se ve la imagen dentro de las letras */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center bg-canvas mix-blend-multiply"
          style={{ opacity: knockout }}
        >
          <motion.h2
            style={{ scale: wordScale, y: wordY }}
            className="select-none font-display text-[15vw] font-semibold leading-none tracking-tighter text-white"
          >
            SYMPHONY
          </motion.h2>
        </motion.div>

        <motion.p
          style={{ opacity: hintOpacity }}
          className="absolute inset-x-0 bottom-10 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted"
        >
          Nuestra plataforma · sigue bajando
        </motion.p>

        <motion.div style={{ opacity: panelOpacity, y: panelY }} className="absolute inset-0 flex items-center">
          <div className="container-page">
            <Panel floating />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Panel({ floating = false }: { floating?: boolean }) {
  return (
    <div
      className={`grid gap-8 rounded-[2rem] border p-7 md:p-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-12 ${
        floating ? 'glass border-white/10' : 'mt-8 border-line bg-surface'
      }`}
    >
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-accent">Nuestra plataforma</p>
        <h3 className="mt-4 text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
          Agentes de IA que atienden, agendan y venden.
        </h3>
        <p className="mt-4 max-w-[46ch] leading-relaxed text-muted md:text-lg">
          Una sola plataforma omnicanal, diseñada y desarrollada por AI-NOVA, conectada a tu telefonía, tu web y
          WhatsApp.
        </p>
        <dl className="mt-7 grid grid-cols-3 gap-4 border-t border-white/10 pt-5">
          {facts.map((f) => (
            <div key={f.label}>
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-display text-3xl font-semibold tracking-tight md:text-4xl">{f.value}</dd>
              <dd className="mt-1 text-xs leading-snug text-muted md:text-sm">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="hidden overflow-hidden rounded-2xl border border-line bg-white shadow-lift sm:block">
        <img
          src={flowBuilder}
          alt="Constructor visual de Symphony con un flujo de agente virtual"
          width={1286}
          height={648}
          loading="lazy"
          className="h-auto w-full"
        />
      </div>
    </div>
  )
}
