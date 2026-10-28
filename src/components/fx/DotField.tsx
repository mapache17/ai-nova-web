import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

type DotFieldProps = {
  className?: string
  spacing?: number
  radius?: number
  /** Radio de influencia del cursor en px */
  reach?: number
}

/**
 * Malla de puntos que se apartan y se iluminan alrededor del cursor, con una ola suave en reposo.
 * Inspirado en "Dot Field" de React Bits. Canvas 2D.
 */
export function DotField({ className = '', spacing = 22, radius = 1.3, reach = 140 }: DotFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    let w = 0
    let h = 0
    let frame = 0
    let running = false
    let t = 0
    const mouse = { x: -9999, y: -9999 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (let y = spacing / 2; y < h; y += spacing) {
        for (let x = spacing / 2; x < w; x += spacing) {
          const dx = x - mouse.x
          const dy = y - mouse.y
          const dist = Math.hypot(dx, dy)
          const f = Math.max(0, 1 - dist / reach)
          const idle = (Math.sin(x * 0.012 + t) + Math.sin(y * 0.018 - t * 0.7)) * 0.25 + 0.5
          const push = f * f * 14
          const px = x + (dist > 0 ? (dx / dist) * push : 0)
          const py = y + (dist > 0 ? (dy / dist) * push : 0)
          const rr = radius * (0.7 + idle * 0.6) + f * 2.2
          const a = 0.12 + idle * 0.18 + f * 0.7
          ctx.fillStyle = f > 0.02 ? `rgba(61,181,238,${a})` : `rgba(157,173,186,${a})`
          ctx.beginPath()
          ctx.arc(px, py, rr, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    const loop = () => {
      t += 0.016
      draw()
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
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      mouse.x = e.clientX - r.left
      mouse.y = e.clientY - r.top
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
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [reduce, spacing, radius, reach])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none block h-full w-full ${className}`} />
}
