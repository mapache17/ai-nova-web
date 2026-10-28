import { Logo } from './Logo'
import { NAV_LINKS } from '../content'

export function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="container-page flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo className="h-8" />
          <p className="mt-3 font-display text-sm font-medium text-sage">Powered Innovation</p>
        </div>
        <nav aria-label="Pie de página">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[15px] text-muted">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <p className="text-sm text-muted">© {new Date().getFullYear()} AI-NOVA. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}
