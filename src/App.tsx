import { MotionConfig } from 'motion/react'
import { SmoothScroll } from './components/SmoothScroll'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Manifesto } from './components/Manifesto'
import { SymphonyReveal } from './components/SymphonyReveal'
import { Capabilities } from './components/Capabilities'
import { Statement } from './components/Statement'
import { Services } from './components/Services'
import { Journey } from './components/Journey'
import { LowCode } from './components/LowCode'
import { Channels } from './components/Channels'
import { Analytics } from './components/Analytics'
import { Platform } from './components/Platform'
import { Contact } from './components/Contact'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll />
      <div className="grain">
        <a
          href="#main"
          className="sr-only z-50 rounded-full bg-accent px-4 py-2 text-accent-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Saltar al contenido
        </a>
        <Navbar />
        <main id="main">
          <Hero />
          <Manifesto />
          <Services />
          <SymphonyReveal />
          <Capabilities />
          <Journey />
          <LowCode />
          <Channels />
          <Statement />
          <Analytics />
          <Platform />
          <Contact />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  )
}
