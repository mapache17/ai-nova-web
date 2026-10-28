import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'

const words = [
  { word: 'Atiende.', line: 'Llamadas, chats y WhatsApp, las 24 horas.' },
  { word: 'Agenda.', line: 'La cita queda creada en la misma conversación.' },
  { word: 'Vende.', line: 'Campañas salientes que convierten solas.' },
  { word: 'Resuelve.', line: 'Con contexto, sin que tu cliente repita nada.' },
]

const colors = ['#0b8fd0', '#1aa3b5', '#5fb59a', '#a8cf8c']
const ease = [0.16, 1, 0.3, 1] as const

/** Frase anclada a pantalla completa: cada tramo de scroll cambia la palabra y el color de fondo. */
export function Statement() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })
  const bg = useTransform(scrollYProgress, [0, 0.33, 0.66, 1], colors)
  const blobX = useTransform(scrollYProgress, [0, 1], ['-20%', '40%'])
  const [active, setActive] = useState(0)

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(words.length - 1, Math.max(0, Math.floor(p * words.length))))
  })

  if (reduce) {
    return (
      <section aria-label="Qué hace Symphony" className="bg-gradient-to-br from-[#0b8fd0] to-[#a8cf8c] py-24 text-accent-ink">
        <div className="container-page">
          <p className="font-display text-6xl font-semibold leading-[0.95] tracking-tighter md:text-8xl">
            {words.map((w) => w.word).join(' ')}
          </p>
        </div>
      </section>
    )
  }

  const current = words[active]

  return (
    <section ref={ref} aria-label="Qué hace Symphony" className="relative h-[400vh]">
      <motion.div style={{ backgroundColor: bg }} className="sticky top-0 flex h-[100dvh] items-center overflow-hidden text-accent-ink">
        {/* Brillo que se desplaza */}
        <motion.div
          aria-hidden="true"
          style={{ x: blobX }}
          className="absolute -top-1/4 left-0 size-[70vmax] rounded-full bg-white/25 blur-[120px]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(3,17,26,0.12)_1px,transparent_1.5px)] bg-[length:22px_22px]" />

        <div className="container-page relative">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent-ink/70">
            {String(active + 1).padStart(2, '0')} / {String(words.length).padStart(2, '0')} · Symphony
          </p>

          <h2 className="sr-only">{words.map((w) => w.word).join(' ')}</h2>
          <div aria-hidden="true" className="relative mt-4 h-[1.05em] overflow-hidden font-display text-[clamp(4.5rem,17vw,17rem)] font-semibold leading-none tracking-tighter">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={current.word}
                className="absolute left-0 top-0 block"
                initial={{ y: '100%', opacity: 0, filter: 'blur(12px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                exit={{ y: '-100%', opacity: 0, filter: 'blur(12px)' }}
                transition={{ duration: 0.7, ease }}
              >
                {current.word}
              </motion.span>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={current.line}
                className="max-w-[30ch] text-xl font-medium leading-snug md:text-3xl"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease }}
              >
                {current.line}
              </motion.p>
            </AnimatePresence>

            <ol className="flex gap-2" aria-hidden="true">
              {words.map((w, i) => (
                <li key={w.word} className="h-1 w-10 overflow-hidden rounded-full bg-accent-ink/20 md:w-16">
                  <motion.span
                    className="block h-full rounded-full bg-accent-ink"
                    initial={false}
                    animate={{ width: i <= active ? '100%' : '0%' }}
                    transition={{ duration: 0.5, ease }}
                  />
                </li>
              ))}
            </ol>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
