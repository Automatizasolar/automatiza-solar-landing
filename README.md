# Automatiza Solar — web con animaciones de scroll

Landing de una sola página para captar empresas de energía solar en Colombia. Next.js 16
(App Router, TypeScript), Tailwind v4, GSAP ScrollTrigger y Lenis.

**En producción en https://automatizasolar.com** (Vercel, proyecto `automatiza-solar-landing`).
Cada push a `main` en GitHub despliega solo.

## Arrancar

```bash
pnpm install
pnpm dev
```

Y abrir http://localhost:3000

Otros comandos: `pnpm build` (build de producción), `pnpm lint`.

## Qué hay dentro

```
src/app/route.ts          sirve la home: el funnel de los anuncios (ver abajo)
src/funnel/index.html     LA HOME: un solo HTML con sus estilos y su JS
src/app/layout.tsx        fuentes, metadatos y datos estructurados de /privacidad
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

Desde el 8 de octubre de 2026 la home es **`src/funnel/index.html`**: la landing de ejemplo de la
lección 5 de AIlink Élite rellenada con el cuaderno, pieza por pieza (llamada al nicho → titular
→ VSL → demo → agenda), en una columna y sin nada que no esté en la lección. `src/app/route.ts`
la sirve tal cual y se genera al compilar, así que en Vercel es estática. La home anterior
(la de componentes y el raíl de horas) se retiró quitando `src/app/page.tsx`; sus componentes
siguen en `src/components/` y `src/lib/content.ts`, sin usarse, por si hubiera que volver.

Destino de las campañas de Meta: sin menú, sin WhatsApp ni correo, y todos los botones bajan a
la agenda, que es el Calendly embebido al final (un iframe; la CSP de `vercel.json` le abre
`frame-src`). `/llamada`, donde vivió al principio, redirige a la home.

- El titular tiene que coincidir palabra por palabra con el del anuncio.
- Los datos que se piden al reservar (WhatsApp, web o Instagram, casilla de consentimiento)
  se configuran en el evento de Calendly, no aquí.
- **El VSL** es un vídeo propio: `public/brand/video/vsl-v1.mp4` (1080p, ~33 MB, `faststart`) y su
  portada `vsl-v1-portada.jpg`. Los subtítulos van incrustados en el vídeo. No se descarga nada
  hasta el play. Para cambiarlo, súbelo con **otro nombre** (`vsl-v2.mp4`) y cambia las dos
  rutas en el HTML: `/brand/` se cachea un año (`vercel.json`) y con el mismo nombre la gente
  seguiría viendo el viejo.
- **El caso de éxito** tiene su hueco escrito en el HTML (`#casoExito`, en «Con quién vas a
  hablar») con el atributo `hidden`: no se ve. Se enseña cuando exista el primer caso real, con
  permiso por escrito: se cambian los tres textos y se quita `hidden`. Nunca uno inventado.
- **Pixel de Meta** (conjunto de datos «Web», ID 994422470343287, del portfolio Automatiza Solar),
  en el propio HTML. No carga nada hasta que se aceptan las cookies (misma llave `as-cookies` que
  usa /privacidad); la CSP le abre
  `connect.facebook.net` y `www.facebook.com`. Eventos, en el orden del embudo: `PageView` al
  entrar · `VSLPlay` al darle al play · `VSLProgreso` (parámetro `porcentaje` 25/50/75/100, solo con
  vídeo propio) · `AgendaHora` cuando eligen día y hora en Calendly · `Schedule` cuando la reserva
  queda confirmada. `AgendaHora` y `Schedule` llevan el parámetro `video` (`visto`/`no_visto`) y
  `video_porcentaje`, para leer el embudo partido entre quien vio el VSL y quien no.

## Cambiar cosas

- **Textos de la home:** en `src/funnel/index.html`. (`src/lib/content.ts` es de la home anterior.)
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
