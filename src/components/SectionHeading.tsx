import type { ReactNode } from 'react'
import { Reveal } from './Reveal'
import { SplitWords } from './fx/SplitWords'

type Props = {
  eyebrow?: string
  title: string
  /** Palabras del título que van en verde salvia */
  accent?: string[]
  children?: ReactNode
  align?: 'left' | 'center'
}

export function SectionHeading({ eyebrow, title, accent, children, align = 'left' }: Props) {
  const center = align === 'center'
  return (
    <div className={center ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}>
      {eyebrow && <p className="mb-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">{eyebrow}</p>}
      <h2 className="text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
        <SplitWords text={title} accent={accent} />
      </h2>
      {children && (
        <Reveal delay={0.2}>
          <p className={`mt-5 text-lg leading-relaxed text-muted ${center ? 'mx-auto' : ''} max-w-[60ch]`}>{children}</p>
        </Reveal>
      )}
    </div>
  )
}
