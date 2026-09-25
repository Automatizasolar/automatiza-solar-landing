# Automatiza Solar — web con animaciones de scroll

Landing de una sola página para captar empresas de energía solar en Colombia. Next.js 16
(App Router, TypeScript), Tailwind v4, GSAP ScrollTrigger y Lenis.

**Proyecto local.** No está desplegado en ningún sitio y no está preparado para estarlo sin
revisar antes los pendientes del final.

## Arrancar

```bash
pnpm install
pnpm dev
```

Y abrir http://localhost:3000

Otros comandos: `pnpm build` (build de producción), `pnpm lint`.

## Qué hay dentro

```
src/app/layout.tsx        fuentes, metadatos, datos estructurados
src/app/page.tsx          la jornada completa, en orden
src/app/globals.css       tokens del mundo visual y estado base del movimiento
src/lib/site.ts           contacto y enlaces. EL NÚMERO SE CAMBIA AQUÍ
src/lib/content.ts        TODO el texto visible de la página
src/components/           una sección por fichero
public/brand/             logos, favicons y fotos
PRODUCT.md                qué es el negocio y qué no se puede inventar
DESIGN.md                 el mundo visual y por qué cada decisión está donde está
```

## Cambiar cosas

- **Textos:** todos en `src/lib/content.ts`. No hay copy suelto en los componentes.
- **Número de WhatsApp:** una sola línea, `WHATSAPP` en `src/lib/site.ts`, en formato
  internacional y sin signos. De ahí salen los cuatro botones, el pie y el JSON-LD.
- **Fotos:** sustituir el fichero en `public/brand/fotos/` conservando nombre y proporción.
  El origen de cada una está en `public/brand/CREDITOS.md`.
- **Colores y tipografía:** los tokens están en `src/app/globals.css`. Antes de tocar el
  verde, leer la ley del acento en `DESIGN.md`: sobre verde sólido la tinta va oscura, el
  blanco da 2,2:1 y no pasa.

## Tres cosas que no se cambian sin decidirlo

Están acordadas con el negocio:

1. **El precio no se da en la página.** Depende del catálogo y se ve en la llamada.
2. **No hay permanencia.**
3. **Cuando el agente no sabe algo, no improvisa: avisa.**

Y una cuarta, que es legal además de honesta: **la conversación del inicio es ficticia y la
cara de Andrés Zapata es de banco de imágenes**. El aviso del pie lo dice y tiene que seguir
diciéndolo.

**No hay testimonios reales, ni métricas, ni clientes, ni logos.** No inventar ninguno.

## Movimiento

El scroll es el paso del tiempo y el raíl de la izquierda lo mide. Si tocas el movimiento,
dos cosas que ya costaron un fallo cada una y están explicadas en `DESIGN.md`:

- El gancho `data-motion` va en `<body>` y como atributo, no como clase en `<html>`: React
  reescribe el `className` de la raíz al hidratar y se lo lleva por delante.
- Se escribe **después** de crear el batch, y nada lo retira luego. Ese orden es la red de
  seguridad.

El paneo horizontal y la pila solo se fijan a partir de 1024px. En móvil no se secuestra el
scroll.

`prefers-reduced-motion` está respetado y verificado: sin fijados, sin scroll suavizado, y
ningún contenido escondido detrás de una animación que no corre.

## Credenciales

**No hay.** La página no tiene backend, ni formularios, ni cookies, ni llamadas a servicios:
nada que el visitante haga sale de su navegador. Por eso no hay `.env` ni `.env.example`.

El WhatsApp, el correo y el Calendly de `site.ts` son datos de contacto públicos del negocio,
los mismos que se imprimen en pantalla, no secretos. Si más adelante se añade un formulario
de captación, las claves del servicio de envío van en `.env.local` (ya cubierto por
`.gitignore`) y se documentan en un `.env.example` con valores vacíos.

## Pendientes si algún día se publica

- [ ] Dominio propio: actualizar `metadataBase` en `src/app/layout.tsx`, hoy apuntando a
      localhost, y añadir `canonical` y `og:url`.
- [ ] Cabeceras de seguridad (CSP) en el hosting.
- [ ] Analítica, si se quiere.
- [ ] Regenerar `public/brand/fotos/panel-ejemplo.jpg` si el panel cambia de aspecto.
