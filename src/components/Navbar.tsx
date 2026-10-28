import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ListIcon, XIcon, ArrowRightIcon } from '@phosphor-icons/react'
import { Logo } from './Logo'
import { Button } from './Button'
import { DEMO_HREF, DEMO_LABEL, NAV_LINKS } from '../content'

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-40 pt-3">
      <div className="container-page">
        <nav
          aria-label="Principal"
          className="glass flex h-16 items-center justify-between gap-6 rounded-full border border-line/70 pl-5 pr-2"
        >
          <a href="#inicio" aria-label="AI-NOVA, ir al inicio" className="shrink-0">
            <Logo className="h-7" />
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="rounded-full px-4 py-2 text-[15px] font-medium text-muted transition-colors hover:bg-sunken hover:text-ink"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <Button href={DEMO_HREF} className="!px-5 !py-2.5" icon={<ArrowRightIcon size={16} weight="bold" />}>
                {DEMO_LABEL}
              </Button>
            </div>
            <button
              type="button"
              className="inline-flex size-11 items-center justify-center rounded-full text-ink hover:bg-sunken lg:hidden"
              aria-expanded={open}
              aria-controls="menu-movil"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <XIcon size={22} /> : <ListIcon size={22} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              id="menu-movil"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="glass mt-2 rounded-3xl border border-line/70 p-3 lg:hidden"
            >
              <ul className="flex flex-col">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl px-4 py-3 text-base font-medium text-ink hover:bg-sunken"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-2 md:hidden">
                <Button href={DEMO_HREF} className="w-full">
                  {DEMO_LABEL}
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
