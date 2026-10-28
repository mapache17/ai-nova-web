# AI-NOVA · Landing de Symphony

Landing page de AI-NOVA hecha con React 19, Vite, TypeScript, Tailwind CSS v4 y Motion.

## Cómo correrla

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # genera /dist para publicar
npm run lint
```

## Estructura

```
DESIGN.md                 guía de diseño (colores, tipografía, reglas). Léela antes de editar.
src/
  App.tsx                 orden de las secciones
  content.ts              datos de contacto y el CTA "Agenda una demo"
  index.css               tokens de color (modo claro y oscuro)
  components/             una sección por archivo (Hero, Services, AgentsBento, Journey...)
  assets/brand/           logos AI-NOVA y onda de Symphony
  assets/product/         capturas reales de Symphony (sacadas de las presentaciones)
.claude/skills/           skill de diseño design-taste-frontend
```

## Cosas para cambiar fácil

- **Contacto y CTA**: `src/content.ts`.
- **Textos de cada sección**: en su componente dentro de `src/components/`.
- **Colores**: `src/index.css` (bloque `@theme` y el de `prefers-color-scheme: dark`).
- **Imágenes**: reemplaza el archivo en `src/assets/product/` manteniendo el nombre.
