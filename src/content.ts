// Datos de contacto y enlaces compartidos en toda la página.
export const CONTACT = {
  name: 'Alejandro Casanova',
  email: 'jalejocs@gmail.com',
  phoneDisplay: '+57 310 305 8946',
  phoneHref: 'tel:+573103058946',
  whatsapp: 'https://wa.me/573103058946',
}

// Único CTA de contacto de la página (DESIGN.md: "Agenda una demo").
export const DEMO_LABEL = 'Agenda una demo'
export const DEMO_HREF = `${CONTACT.whatsapp}?text=${encodeURIComponent(
  'Hola Alejandro, me gustaría agendar una demo de Symphony para mi empresa.',
)}`

export const NAV_LINKS = [
  { href: '#capacidades', label: 'Capacidades' },
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#canales', label: 'Canales' },
  { href: '#plataforma', label: 'Plataforma' },
  { href: '#contacto', label: 'Contacto' },
]

// Atajos a las capacidades de Symphony (se usan en el hero).
export const CAPABILITY_LINKS = [
  { href: '#capacidad-agentes', label: 'Agentes de IA por voz' },
  { href: '#canales', label: 'Omnicanal' },
  { href: '#capacidad-campanas', label: 'Campañas salientes' },
] as const
