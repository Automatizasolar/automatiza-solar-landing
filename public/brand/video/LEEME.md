# El VSL va aquí

Tres ficheros, con estos nombres, y luego se rellena `vsl.video` en `src/lib/content.ts`:

- `vsl.mp4` — el vídeo final (16:9, 1920×1080, H.264, audio AAC; unos 3 minutos).
- `vsl-portada.jpg` — la miniatura, 1920×1080. Es lo único que se ve hasta que alguien le da al play.
- `vsl.vtt` — los subtítulos en español (WebVTT). Opcionales, pero el programa los pide.

```ts
video: { src: "/brand/video/vsl.mp4", poster: "/brand/video/vsl-portada.jpg", captions: "/brand/video/vsl.vtt" },
```

Si el vídeo se sube a Loom o YouTube en vez de aquí, basta la portada:

```ts
video: { embed: "https://www.loom.com/embed/XXXXXXXX", poster: "/brand/video/vsl-portada.jpg" },
```
