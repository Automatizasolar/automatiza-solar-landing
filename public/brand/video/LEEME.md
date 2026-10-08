# El VSL

Lo que usa la home (`src/funnel/index.html`):

- `vsl-v1.mp4` — el vídeo (1920×1080, H.264 a ~2 Mbps, AAC, `-movflags +faststart` para que
  empiece a sonar sin descargarlo entero). Subtítulos incrustados. 2:11.
- `vsl-v1-portada.jpg` — la portada, 1280×720. Es lo único que se descarga hasta el play.

El máster está en el repo Rells: `out/vsl.mp4` (99 MB, CRF 18). La versión web sale de ahí:

```bash
npx remotion ffmpeg -i out/vsl.mp4 -c:v libx264 -preset slow -crf 25 -maxrate 2800k -bufsize 5600k \
  -pix_fmt yuv420p -profile:v high -level 4.1 -g 60 -c:a aac -b:a 128k -ar 48000 \
  -movflags +faststart out/web/vsl-v1.mp4
```

**Para cambiar el vídeo, nombre nuevo** (`vsl-v2.mp4`, `vsl-v2-portada.jpg`) y se cambian las
rutas en el HTML. `vercel.json` cachea `/brand/` un año como inmutable: con el mismo nombre,
quien ya lo cargó seguiría viendo el viejo.
