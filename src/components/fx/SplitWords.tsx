import { Fragment } from 'react'
import { motion, useReducedMotion } from 'motion/react'

type SplitWordsProps = {
  text: string
  /** Palabras que se pintan con el color de acento (comparación exacta, sin puntuación) */
  accent?: string[]
  className?: string
  accentClassName?: string
  delay?: number
  /** Animar al montar en lugar de al entrar en pantalla */
  immediate?: boolean
}

/** Titular que entra palabra por palabra desde una máscara, con desenfoque. */
export function SplitWords({
  text,
  accent = [],
  className = '',
  accentClassName = 'text-sage',
  delay = 0,
  immediate = false,
}: SplitWordsProps) {
  const reduce = useReducedMotion()
  const words = text.split(' ')
  const trigger = immediate
    ? { animate: 'show' }
    : { whileInView: 'show', viewport: { once: true, amount: 0.5 } }

  return (
    <span className={className} aria-label={text}>
      <motion.span
        aria-hidden="true"
        initial={reduce ? false : 'hide'}
        {...trigger}
        transition={{ staggerChildren: 0.055, delayChildren: delay }}
      >
        {words.map((word, i) => {
          const clean = word.replace(/[.,:;!?]/g, '')
          return (
            <Fragment key={`${word}-${i}`}>
              <span className="inline-block overflow-hidden pb-[0.12em] align-top">
                <motion.span
                  className={`inline-block ${accent.includes(clean) ? accentClassName : ''}`}
                  variants={{
                    hide: { y: '110%', opacity: 0, filter: 'blur(6px)' },
                    show: { y: '0%', opacity: 1, filter: 'blur(0px)' },
                  }}
                  transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  {word}
                </motion.span>
              </span>
              {i < words.length - 1 && ' '}
            </Fragment>
          )
        })}
      </motion.span>
    </span>
  )
}
