# DESIGN.md · AI-NOVA / Symphony

Guía de diseño de la landing de AI-NOVA. Cualquier agente (Claude, Cursor, Copilot) debe leer este archivo antes de crear o editar componentes.

## Design read

Landing B2B de AI-NOVA y sus tres productos (Symphony, Symphony 3D y Octopus VoIP SoftSwitch) para empresas que atienden muchos clientes por teléfono: clínicas, contact centers, aerolíneas, operadores. Estilo futurista e interactivo (referencias: Patch AI, Senthora, The Shape of Intelligence), en tema oscuro, con el azul y el verde salvia de la marca.

Skill usada: `design-taste-frontend` (taste-skill), con estos diales:

| Dial | Valor | Por qué |
|---|---|---|
| DESIGN_VARIANCE | 6 | SaaS B2B: asimétrico pero ordenado |
| MOTION_INTENSITY | 8 | Fondos interactivos, texto animado y scroll horizontal (pedido explícito) |
| VISUAL_DENSITY | 4 | Espacio cómodo, mucho producto por mostrar |

## Marca

- **Logo AI-NOVA**: `src/assets/brand/ainova-logo-light.webp` (versión para fondo oscuro; `ainova-logo.webp` queda para fondos claros).
- **Productos**: Symphony (principal), Symphony 3D y Octopus VoIP SoftSwitch. Lema: *Powered Innovation*.
- **Motivo gráfico**: ondas. En el hero son figuras (triángulos, círculos, cuadrados) que crecen con las ondas (`fx/ShapeWaves.tsx`); dentro de la tarjeta de Symphony, el haz de líneas (`WaveField.tsx`).

## Colores (tokens en `src/index.css`)

Tema oscuro único en toda la página (no cambia con el sistema).

| Token | Valor | Uso |
|---|---|---|
| `--color-canvas` | `#060B10` | Fondo de página |
| `--color-surface` | `#0C161E` | Tarjetas y paneles |
| `--color-ink` | `#E8F0F5` | Títulos y texto principal |
| `--color-muted` | `#94A6B4` | Texto secundario |
| `--color-line` | `#1B2A36` | Bordes |
| `--color-accent` | `#3DB5EE` | **Único acento interactivo**: botones, links, foco |
| `--color-sage` | `#B3D2A0` | Verde de marca para palabras resaltadas |

Reglas: un solo acento para acciones (azul). El verde salvia nunca se usa en botones. Sin degradados morados, sin brillos neón.

## Tipografía

- **Títulos**: Syne Variable (ancha y con carácter). `tracking-tight`, interlineado 1.05-1.15.
- **Texto**: General Sans 400-700 (Fontshare, archivos en `src/assets/fonts`).
- Énfasis dentro de un título: mismo font, color `sage` o `sky`. Nunca mezclar con serif.

## Forma

- Tarjetas y paneles: radio 24px (`rounded-3xl`).
- Botones, chips y tabs: píldora (`rounded-full`).
- Sombras teñidas de azul, nunca negro puro.

## Movimiento

Componentes en `src/components/fx/` (Canvas 2D, se pausan fuera de pantalla):

| Componente | Dónde | Qué hace |
|---|---|---|
| `ShapeWaves` | Hero | Figuras que crecen con ondas, entrada radial al cargar, reacciona al cursor. Inspirado en Shape Waves de React Bits (el original usa WebGPU). |
| `LetterGlitch` | Tarjeta de Octopus | Malla de caracteres SIP/RTP que cambian al azar. Inspirado en Letter Glitch de React Bits. |
| `DotField` | Contacto | Puntos que se apartan del cursor. Inspirado en Dot Field de React Bits. |
| `SplitWords` | Todos los títulos | Entrada palabra por palabra con máscara y desenfoque. |
| `ScrambleText` | Nombres de producto | Texto que se decodifica letra por letra. |

- `Manifesto`: párrafo que se ilumina palabra por palabra con el scroll.
- `Products`: scroll horizontal anclado (el scroll vertical mueve el carril). En pantallas < 1024px o con movimiento reducido se muestra vertical.
- Scroll suave con Lenis (`SmoothScroll.tsx`).
- Todo respeta `prefers-reduced-motion`. Un solo marquee (módulos de la plataforma).

## Reglas de contenido

- Español neutro, frases cortas, verbos concretos. Cero guiones largos (—).
- Imágenes: solo capturas reales de Symphony (sacadas de las presentaciones). Nada de pantallas falsas hechas con divs.
- Las cifras del panel de análisis son datos de ejemplo y se rotulan así.
- Un solo CTA de contacto en toda la página: **"Agenda una demo"**.

## Estructura de la página

1. Navbar (vidrio, una línea)
2. Hero (ShapeWaves a pantalla completa + titular animado + links a productos)
3. Manifiesto (texto que se revela con el scroll)
4. Productos (scroll horizontal: Symphony, Symphony 3D, Octopus VoIP SoftSwitch)
5. Servicios AI-NOVA (lista de 6 con íconos)
6. Symphony: agentes IA (bento de 5 celdas)
7. Cómo funciona (WhatsApp → llamada → cita, 4 pasos)
8. Constructor low-code (captura a todo el ancho)
9. Canales (tabs: widget web, WhatsApp, kiosco y QR, SIP, webhooks)
10. Análisis de llamadas (capturas + chips)
11. Campañas salientes (stepper vertical)
12. Plataforma (marquee de módulos + 3 pilares)
13. En desarrollo (3 funciones próximas)
14. Contacto (DotField interactivo)
15. Footer
