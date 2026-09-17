# Automatiza Solar — Landing

Landing estática de una sola página (`index.html`, sin build ni dependencias) para captar
empresas de energía solar en Colombia.

## La oferta que comunica

- **Nicho** — dueños de negocios de energía solar que atienden más de 15 personas al día.
- **Método** — un agente que responde WhatsApp al instante, califica y agenda la visita.
- **Promesa** — instalación cerrada en **7 días hábiles**, sobre el número de siempre.
- **Mercado** — Colombia, pesos colombianos.
- Sin precio visible: el objetivo de la página es la llamada de Calendly.

## Las tres vías de contacto

Por orden de fricción, que es el orden en que aparecen en pantalla:

1. **WhatsApp** — `+57 314 549 2336`, como `https://wa.me/573145492336` con un mensaje ya
   escrito. Es el botón principal (verde, con el glifo de la marca) porque la página vende
   respuesta instantánea por WhatsApp: mandar al visitante a un formulario o a un calendario
   para contarle eso contradice la oferta.
2. **Calendly** — para quien ya decidió y quiere agendar de una vez, sin conversación previa.
3. **Correo** — en el cierre y en el pie.

El enlace de WhatsApp está en **cuatro sitios** (barra superior, hero, cierre y pie). Si el
número cambia hay que tocar los cuatro: `grep -n 'wa.me' index.html`. El número también vive
en `telephone` dentro del bloque JSON-LD.

En la barra superior, por debajo de 30rem el botón de WhatsApp se queda **solo con el icono**
(la etiqueta pasa a lectores de pantalla): con el logo al lado no caben dos etiquetas.

## Estructura

```
index.html      la página completa (estilos y scripts en línea)
brand/          logo, favicons e imagen para compartir enlaces
vercel.json     cabeceras de seguridad y caché
```

## Pendientes antes de publicar

- [ ] **Dominio propio.** Al ponerlo hay que actualizar `og:url`, `canonical` y la URL del
      `og:image` en `index.html`, y el `url` del bloque JSON-LD.
- [ ] **Conectar el repo a Vercel** para que cada `push` despliegue solo. Hoy no lo está.
- [ ] **Analítica** (Vercel Analytics). Requiere ampliar `script-src` en `vercel.json`.

## Datos y privacidad

La conversación del inicio es una recreación con **datos ficticios**. No hay formularios,
ni cookies, ni variables de entorno: nada que el visitante envíe sale de su navegador.
Si más adelante se añade un formulario de captación, las credenciales del servicio de envío
van en `.env` (nunca al repositorio) y se documentan en un `.env.example` con valores vacíos.

## Deploy

Sitio 100% estático — Framework Preset *Other*, sin comando de build.
