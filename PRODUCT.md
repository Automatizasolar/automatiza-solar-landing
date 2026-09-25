# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Next.js 16 (App Router, TypeScript, `src/`) + Tailwind v4, gestionado con pnpm. Elegido por el
usuario frente a HTML estático. Proyecto **local**: no se despliega a ningún sitio.

## Users

Dueños y gerentes de empresas de **energía solar en Colombia** que venden kits (paneles,
inversores, baterías) a casas y pequeños negocios. Atienden por WhatsApp desde su móvil
personal, a menudo subidos a un tejado o conduciendo entre instalaciones, y pierden ventas
porque contestan tarde. Perfil no técnico: no quieren aprender otra herramienta.

Criterio de idoneidad declarado en la oferta: más de 15 consultas al día, invierte en
innovación, decide sin comité. No sirve para quien quiere revisar cada mensaje a mano.

## Product Purpose

Instalar un agente de IA sobre el número de WhatsApp que el negocio **ya usa**, que responde
al instante, califica al que escribe (consumo de luz, ubicación de la instalación, casa o
negocio), recomienda el kit con el catálogo y los precios reales del cliente, y agenda la
visita técnica con los datos completos. Éxito = el dueño deja de perder consultas por no
contestar a tiempo.

El objetivo de la web no es vender online: es conseguir la **llamada de 30 minutos**
(Calendly) o la conversación por WhatsApp.

## Positioning

"El WhatsApp que no contestas lo contesta tu competencia."

Mecanismo diferencial: funciona **sobre el número de siempre** (no hay línea nueva, no hay
migración, no hay app que aprender) y responde **solo con el catálogo del cliente** — cuando
la pregunta se sale de ahí, no improvisa: lo anota y avisa. Instalación cerrada en **7 días
hábiles**, sin permanencia.

## Operating Context

- Canal único: WhatsApp sobre el número existente del negocio.
- El dueño puede **tomar cualquier conversación manualmente** en cualquier momento; el agente
  se calla en ese hilo.
- Hay un **panel de gestión** para ver conversaciones y estados (demo pública en
  `automatiza-solar-demo.vercel.app`).
- El catálogo lo aporta el cliente: productos, precios en pesos colombianos, cantidades por
  kit y compatibilidades entre productos. Si cambian precios, se actualizan.
- Los 4 perfiles que escriben, tal cual los describe la oferta: el que ya decidió, el que está
  comparando, el que vio un video, el que apenas está entendiendo.

## Capabilities and Constraints

- Implantación: **7 días hábiles**. Día 1 número + catálogo · Día 3 el agente ya responde con
  productos reales y el cliente lo prueba · Día 7 funcionando.
- **Sin permanencia.** Se puede parar cuando se quiera.
- **Sin precio público**: depende del número de productos y combinaciones del catálogo. Se
  resuelve en la llamada de 30 minutos. No inventar cifras.
- Mercado Colombia, moneda pesos colombianos (COP).
- El agente no improvisa fuera de catálogo — es una promesa contractual del discurso.
- Sitio local sin backend: no hay formularios, ni cookies, ni credenciales, ni variables de
  entorno. Nada que el visitante envíe sale de su navegador.

## Brand Commitments

- Nombre: **Automatiza Solar**. Logo en `brand/` (horizontal color y blanco, monograma AS).
- Paleta heredada: navy `#062A50` / `#04203D`, verde `#138363` / `#17A07A`.
- Tipografía heredada: Archivo.
- Voz: castellano de Colombia, directa, frases cortas, sin jerga de marketing ni promesas de
  cifras. Tutea. No usa signos de exclamación.
- Restricción visual vinculante fijada por el usuario en esta sesión: **dirección oscura y
  cinematográfica** con animaciones de scroll (pinning, scrub) de referencia Apple.

## Evidence on Hand

- Contacto real: WhatsApp **+57 322 327 5495**, email `piedrahita@automatizasolar.com`,
  Calendly `https://calendly.com/piedrahita-automatizasolar/30min`.
- Panel de ejemplo real y público: `https://automatiza-solar-demo.vercel.app`.
- Fotos de sector en `brand/fotos/` (Unsplash, licencia comercial): `hero-fondo.webp`,
  `instalacion-tejado.webp`, `detalle-panel.webp`, `cierre-tejado.webp`. Captura real del
  panel en `panel-ejemplo.jpg`.
- **No hay testimonios reales.** La conversación de Andrés Zapata es una recreación con datos
  ficticios y su foto (`brand/avatares/andres.webp`) es de banco de imágenes y no corresponde
  a esa persona. Esto debe seguir declarándose en la página.
- **No hay métricas, casos de éxito, número de clientes ni logos de clientes.** No fabricar
  ninguno.
- No hay perfiles de redes sociales publicados.

## Product Principles

1. **La respuesta instantánea es el producto.** Todo lo que pida al visitante más fricción que
   escribir un WhatsApp contradice la oferta.
2. **Cero fricción de adopción.** No cambia de número, no instala nada, no aprende un programa.
   Cualquier mensaje que suene a "proyecto de software" pierde al lector.
3. **Nunca fabricar prueba social.** Sin testimonios ni cifras inventadas; lo ficticio se
   declara.
4. **El precio no se da en la página.** Se resuelve en la llamada, con el catálogo delante.
5. **Primero se resuelven las dudas, después se pide la cita.** Las FAQ van antes del cierre.

## Accessibility & Inclusion

- Contraste AAA en texto sobre foto (el velo del hero actual está calibrado a 7,8:1 y ese es
  el listón a mantener).
- FAQ con `<details>` nativos: teclado y lector de pantalla sin JavaScript.
- Animación intensa por scroll → `prefers-reduced-motion` es obligatorio, no opcional.
