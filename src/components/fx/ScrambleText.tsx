import { useEffect, useRef } from 'react'
import { useInView, useReducedMotion } from 'motion/react'

type ScrambleTextProps = {
  text: string
  className?: string
  /** Retraso en segundos antes de empezar */
  delay?: number
  /** Duración total en segundos */
  duration?: number
}

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/#*+'

/** Texto que se "decodifica" letra por letra al entrar en pantalla. Escribe en el DOM sin re-render. */
export function ScrambleText({ text, className = '', delay = 0, duration = 1.1 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView || reduce) return
    let frame = 0
    let startAt = 0
    const total = duration * 1000
    const tick = (now: number) => {
      if (!startAt) startAt = now + delay * 1000
      const p = Math.min(1, Math.max(0, (now - startAt) / total))
      const revealed = Math.floor(p * text.length)
      let out = ''
      for (let i = 0; i < text.length; i++) {
        const ch = text[i]
        if (i < revealed || ch === ' ') out += ch
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
      }
      el.textContent = out
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, reduce, text, delay, duration])

  return (
    <span className={className} aria-label={text}>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </span>
  )
}
