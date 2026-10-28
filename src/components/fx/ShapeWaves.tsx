import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'motion/react'

type ShapeWavesProps = {
  className?: string
  /** Distancia entre figuras en px */
  spacing?: number
  /** Velocidad de las ondas */
  speed?: number
  /** Duración de la animación de entrada en segundos */
  introDuration?: number
}

const FROM = [18, 160, 227] // azul Symphony
const TO = [168, 205, 150] // verde salvia

/**
 * Campo de triángulos, círculos y cuadrados que crecen y se iluminan con ondas.
 * Inspirado en "Shape Waves" de React Bits, reescrito en Canvas 2D para que funcione en todos los navegadores
 * (la versión original usa WebGPU). Reacciona al cursor y tiene una entrada radial desde el centro.
 */
export function ShapeWaves({ className = '', spacing = 30, speed = 0.55, introDuration = 2.4 }: ShapeWavesProps) {
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
    let last = performance.now()
    const born = performance.now()
    const mouse = { x: -9999, y: -9999, active: 0, target: 0 }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      const r = canvas.getBoundingClientRect()
      w = r.width
      h = r.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const draw = (now: number) => {
      ctx.clearRect(0, 0, w, h)
      const elapsed = reduce ? 99 : (now - born) / 1000
      const cx = w * 0.5
      const cy = h * 0.55
      const maxD = Math.hypot(w, h) * 0.6
      const cols = Math.ceil(w / spacing) + 1
      const rows = Math.ceil(h / spacing) + 1
      mouse.active += (mouse.target - mouse.active) * 0.08

      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const x = i * spacing + (j % 2 ? spacing / 2 : 0)
          const y = j * spacing
          const u = x / w
          const v = y / h

          // Entrada: cada figura aparece según su distancia al centro
          const d = Math.hypot(x - cx, y - cy) / maxD
          const intro = Math.min(1, Math.max(0, (elapsed - d * introDuration * 0.6) / (introDuration * 0.5)))
          if (intro <= 0) continue
          const easeIntro = 1 - Math.pow(1 - intro, 3)

          // Tres ondas que se cruzan
          let wave =
            Math.sin(u * 7.5 + t) * 0.45 +
            Math.sin(v * 5.5 - t * 0.8 + u * 2) * 0.35 +
            Math.sin((u + v) * 9 + t * 0.6) * 0.2
          wave = (wave + 1) / 2

          // Cursor: levanta las figuras cercanas
          if (mouse.active > 0.01) {
            const md = Math.hypot(x - mouse.x, y - mouse.y)
            wave += Math.max(0, 1 - md / 180) * 0.6 * mouse.active
          }
          wave = Math.min(1, wave)

          const size = spacing * (0.06 + 0.32 * wave * wave) * easeIntro
          const alpha = (0.06 + 0.8 * Math.pow(wave, 3)) * easeIntro
          if (alpha < 0.03 || size < 0.6) continue

          const mix = Math.min(1, Math.max(0, u * 0.8 + v * 0.3))
          const r = FROM[0] + (TO[0] - FROM[0]) * mix
          const g = FROM[1] + (TO[1] - FROM[1]) * mix
          const b = FROM[2] + (TO[2] - FROM[2]) * mix
          ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha})`

          const kind = (i * 7 + j * 13) % 3
          ctx.beginPath()
          if (kind === 0) {
            ctx.arc(x, y, size, 0, Math.PI * 2)
          } else if (kind === 1) {
            ctx.rect(x - size, y - size, size * 2, size * 2)
          } else {
            const s = size * 1.25
            ctx.moveTo(x, y - s)
            ctx.lineTo(x + s * 0.95, y + s * 0.7)
            ctx.lineTo(x - s * 0.95, y + s * 0.7)
            ctx.closePath()
          }
          ctx.fill()
        }
      }
    }

    const loop = (now: number) => {
      const dt = Math.min(now - last, 64) / 1000
      last = now
      t += dt * speed
      draw(now)
      frame = requestAnimationFrame(loop)
    }
    const start = () => {
      if (running) return
      running = true
      last = performance.now()
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
      mouse.target = mouse.y >= 0 && mouse.y <= r.height ? 1 : 0
    }
    const onLeave = () => {
      mouse.target = 0
    }

    resize()
    draw(performance.now())
    const ro = new ResizeObserver(() => {
      resize()
      draw(performance.now())
    })
    ro.observe(canvas)
    const io = new IntersectionObserver(([e]) => (e.isIntersecting && !reduce ? start() : stop()))
    io.observe(canvas)
    if (!reduce) {
      window.addEventListener('pointermove', onMove, { passive: true })
      document.addEventListener('pointerleave', onLeave)
    }

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [reduce, spacing, speed, introDuration])

  return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none block h-full w-full ${className}`} />
}
