import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

type WaveFieldProps = {
  className?: string
  lines?: number
  amplitude?: number
  speed?: number
}

// Haz de líneas onduladas, el motivo gráfico de Symphony.
// Canvas + requestAnimationFrame (fuera del render de React), se pausa fuera de pantalla.
export function WaveField({ className = '', lines = 28, amplitude = 0.22, speed = 0.35 }: WaveFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0
    let height = 0
    let frame = 0
    let running = false
    let t = 0
    let last = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = Math.round(width * dpr)
      canvas.height = Math.round(height * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)
      const gradient = ctx.createLinearGradient(0, 0, width, height)
      gradient.addColorStop(0, 'rgba(18, 160, 227, 0.85)')
      gradient.addColorStop(0.55, 'rgba(58, 170, 175, 0.7)')
      gradient.addColorStop(1, 'rgba(168, 200, 154, 0.8)')
      ctx.strokeStyle = gradient
      ctx.lineWidth = 1

      const cy = height * 0.5
      const amp = height * amplitude
      const step = Math.max(6, width / 140)

      for (let i = 0; i < lines; i++) {
        // Cada línea es una fase distinta de la misma cinta: al cruzarse forman el "giro".
        const twist = (i / (lines - 1)) * Math.PI
        ctx.beginPath()
        for (let x = -step; x <= width + step; x += step) {
          const u = x / width
          const y =
            cy +
            Math.sin(u * Math.PI * 2.2 + t) * amp * Math.cos(twist + u * 1.4) +
            Math.sin(u * Math.PI * 1.1 - t * 0.6 + twist * 0.5) * amp * 0.45
          if (x <= -step) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.stroke()
      }
    }

    const loop = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000
      last = now
      t += dt * speed
      draw()
      frame = requestAnimationFrame(loop)
    }

    const start = () => {
      if (running || reduce) return
      running = true
      last = performance.now()
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

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), {
      threshold: 0,
    })
    io.observe(canvas)

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
    }
  }, [reduce, lines, amplitude, speed])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none block h-full w-full ${className}`} />
}
