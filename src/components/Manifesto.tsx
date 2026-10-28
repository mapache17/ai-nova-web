import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import type { MotionValue } from 'motion/react'

const TEXT =
  'En AI-NOVA creamos Symphony para que cada llamada y cada mensaje de tu empresa tenga respuesta. Un agente de IA que atiende, entiende lo que necesita tu cliente y lo resuelve, en cualquier canal y a cualquier hora.'
const ACCENT = new Set(['Symphony', 'agente', 'IA', 'resuelve'])

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const clean = word.replace(/[.,]/g, '')
  return (
    <motion.span style={{ opacity }} className={ACCENT.has(clean) ? 'text-sky' : undefined}>
      {word}{' '}
    </motion.span>
  )
}

/** Párrafo que se ilumina palabra por palabra a medida que haces scroll. */
export function Manifesto() {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.55'] })
  const words = TEXT.split(' ')

  return (
    <section aria-label="Quiénes somos" className="py-28 md:py-40">
      <div ref={ref} className="container-page">
        <p className="max-w-5xl font-display text-3xl font-medium leading-[1.25] tracking-tight md:text-5xl md:leading-[1.2]">
          {reduce
            ? TEXT
            : words.map((w, i) => {
                const start = i / words.length
                return <Word key={`${w}-${i}`} word={w} progress={scrollYProgress} range={[start, start + 1 / words.length]} />
              })}
        </p>
      </div>
    </section>
  )
}
