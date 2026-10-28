import { useEffect } from 'react'
import Lenis from 'lenis'

// Scroll suave con Lenis. Se desactiva si la persona prefiere menos movimiento.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.1, anchors: { offset: -90 } })
    let frame = 0
    const raf = (time: number) => {
      lenis.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)
    return () => {
      cancelAnimationFrame(frame)
      lenis.destroy()
    }
  }, [])
  return null
}
