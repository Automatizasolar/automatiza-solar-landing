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
src/app/page.tsx          la home, que es el funnel de los anuncios (ver abajo)
src/app/privacidad/       política de tratamiento de datos (texto en src/lib/privacy.ts)
src/app/globals.css       tokens del mundo visual y estado base del movimiento
src/lib/site.ts           contacto y enlaces. EL NÚMERO SE CAMBIA AQUÍ
src/lib/content.ts        TODO el texto visible de la página
src/components/           una sección por fichero
public/brand/             logos, favicons y fotos
PRODUCT.md                qué es el negocio y qué no se puede inventar
DESIGN.md                 el mundo visual y por qué cada decisión está donde está
```

## La home es el funnel de los anuncios

Destino de las campañas de Meta: sin menú, sin WhatsApp ni correo, y todos los botones bajan a
la agenda, que es el Calendly embebido al final (`agenda.tsx`, un
iframe; la CSP de `vercel.json` le abre `frame-src`). `/llamada`, donde vivió al principio,
redirige a la home.

- El titular tiene que coincidir palabra por palabra con el del anuncio.
- Los datos que se piden al reservar (WhatsApp, web o Instagram, casilla de consentimiento)
  se configuran en el evento de Calendly, no aquí.
- El VSL ya tiene su pieza (`src/components/vsl.tsx`, detrás del hero). Se enciende rellenando
  `vsl.video` en `src/lib/content.ts`: un vídeo propio en `public/brand/video/` con portada y
  subtítulos `.vtt`, o un embed de Loom/YouTube (la CSP ya los admite). Hasta entonces no se
  pinta nada. El play se mide en el pixel como evento `VSLPlay`, solo con cookies aceptadas.
- **Pixel de Meta** (`src/lib/pixel.ts`, conjunto de datos «Web» del portfolio Automatiza Solar).
  No carga nada hasta que se aceptan las cookies (`cookie-consent.tsx`); la CSP le abre
  `connect.facebook.net` y `www.facebook.com`. Eventos, en el orden del embudo: `PageView` al
  entrar · `VSLPlay` al darle al play · `VSLProgreso` (parámetro `porcentaje` 25/50/75/100, solo con
  vídeo propio) · `AgendaHora` cuando eligen día y hora en Calendly · `Schedule` cuando la reserva
  queda confirmada. `AgendaHora` y `Schedule` llevan el parámetro `video` (`visto`/`no_visto`) y
  `video_porcentaje`, para leer el embudo partido entre quien vio el VSL y quien no.

## Cambiar cosas

- **Textos:** todos en `src/lib/content.ts`. No hay copy suelto en los componentes.
- **Número de WhatsApp:** una sola línea, `WHATSAPP` en `src/lib/site.ts`, en formato
  internacional y sin signos. Hoy solo lo usan los datos estructurados (JSON-LD) y la política de datos.
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

**No hay.** La página no tiene backend ni formularios, así que no hay `.env` ni `.env.example`.
Las únicas cookies son las del pixel de Meta, y solo con consentimiento. El ID del pixel no es
un secreto: viaja en la propia página. Si algún día se añade la API de conversiones, su token sí
lo es y va en las variables de entorno de Vercel, nunca en el repo.

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
