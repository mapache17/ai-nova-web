import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

type LetterGlitchProps = {
  className?: string
  /** Caracteres que se dibujan en la malla */
  chars?: string
  colors?: string[]
  fontSize?: number
  /** Milisegundos entre cada cambio de letras */
  interval?: number
}

/**
 * Malla de caracteres que cambian al azar, con viñeta en los bordes.
 * Inspirado en "Letter Glitch" de React Bits. Canvas 2D, se pausa fuera de pantalla.
 */
export function LetterGlitch({
  className = '',
  chars = 'SIPRTPANIDNIS0123456789<>/{}#@INVITEACKBYE',
  colors = ['#0f5f8a', '#12a0e3', '#5f8a4f', '#1c3a4d'],
  fontSize = 15,
  interval = 70,
}: LetterGlitchProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const cw = fontSize * 0.62
    const ch = fontSize * 1.25
    let cols = 0
    let rows = 0
    let w = 0
    let h = 0
    let grid: { c: string; col: string }[] = []
    let frame = 0
    let running = false
    let lastSwap = 0

    const pick = <T,>(arr: ArrayLike<T>) => arr[Math.floor(Math.random() * arr.length)]

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      cols = Math.ceil(w / cw)
      rows = Math.ceil(h / ch)
      grid = Array.from({ length: cols * rows }, () => ({ c: pick(chars), col: pick(colors) }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.font = `${fontSize}px ui-monospace, Consolas, monospace`
      ctx.textBaseline = 'top'
      for (let i = 0; i < grid.length; i++) {
        const x = (i % cols) * cw
        const y = Math.floor(i / cols) * ch
        ctx.fillStyle = grid[i].col
        ctx.fillText(grid[i].c, x, y)
      }
    }

    const loop = (now: number) => {
      if (now - lastSwap > interval) {
        lastSwap = now
        const n = Math.max(1, Math.floor(grid.length * 0.04))
        for (let k = 0; k < n; k++) {
          const cell = grid[Math.floor(Math.random() * grid.length)]
          cell.c = pick(chars)
          cell.col = pick(colors)
        }
        draw()
      }
      frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running || reduce) return
      running = true
      frame = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(frame)
    }

    resize()
    draw()
    const ro = new ResizeObserver(() => {
      resize()
      draw()
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()))
    io.observe(canvas)
    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
    }
  }, [reduce, chars, colors, fontSize, interval])

  return (
    <div className={`pointer-events-none relative h-full w-full ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,var(--color-canvas)_75%)]" />
    </div>
  )
}
