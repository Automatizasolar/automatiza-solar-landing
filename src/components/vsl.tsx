"use client";

import { useState } from "react";
import Image from "next/image";
import { PlayIcon } from "@phosphor-icons/react/dist/ssr";
import { vsl } from "@/lib/content";
import { trackVideoPlay } from "@/lib/pixel";
import { Wrap } from "./ui";

export const VSL_ID = "video";

/**
 * Pieza 3 del funnel: el VSL, justo debajo del primer pantallazo.
 *
 * Mientras `vsl.video` sea null no pinta nada y la página queda como estaba.
 * Cuando exista, es una placa 16:9 con borde, igual que las demás imágenes:
 * la portada y un botón de play. Del vídeo no se carga ni un byte hasta ese
 * clic, que es también lo que se mide en el pixel (VSLPlay). Sirve un vídeo
 * propio con subtítulos .vtt o un embed de Loom/YouTube; en los dos casos el
 * reproductor entra en el mismo hueco, sin saltos de altura.
 *
 * Sin hora propia en el raíl: sigue siendo el domingo a las 22:14 del hero.
 */
export function Vsl() {
  const [playing, setPlaying] = useState(false);
  const video = vsl.video;
  if (!video) return null;

  const start = () => {
    setPlaying(true);
    trackVideoPlay();
  };

  return (
    <section id={VSL_ID} className="relative scroll-mt-20 lg:pl-[104px]">
      <Wrap className="pt-2 pb-16 lg:pb-24">
        <div className="reveal max-w-[44rem]">
          <h2 className="text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance">
            {vsl.title}
          </h2>
          <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-[var(--color-ink-muted)]">
            {vsl.lead}
          </p>
        </div>

        <div className="reveal relative mt-8 aspect-video overflow-hidden rounded-[14px] border border-[var(--color-rule)] bg-[var(--color-ink)]">
          {playing ? (
            "embed" in video ? (
              <iframe
                src={withAutoplay(video.embed)}
                title={vsl.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <video
                src={video.src}
                poster={video.poster}
                controls
                autoPlay
                playsInline
                className="absolute inset-0 h-full w-full"
              >
                {video.captions && (
                  <track kind="subtitles" srcLang="es" label="Español" src={video.captions} default />
                )}
              </video>
            )
          ) : (
            <button
              type="button"
              onClick={start}
              aria-label={`${vsl.play}, ${vsl.duration}`}
              className="group absolute inset-0 block w-full cursor-pointer"
            >
              <Image
                src={video.poster}
                alt=""
                fill
                sizes="(max-width: 1180px) 100vw, 1180px"
                className="object-cover"
              />
              <span className="absolute inset-0 flex items-center justify-center">
                <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-rule)] bg-white px-5 py-3 text-[15px] leading-none font-medium text-[var(--color-ink)] transition-colors duration-150 group-hover:bg-[var(--color-raised-2)]">
                  <PlayIcon size={18} weight="fill" />
                  {vsl.play} · {vsl.duration}
                </span>
              </span>
            </button>
          )}
        </div>
      </Wrap>
    </section>
  );
}

/** Loom y YouTube arrancan solos con `autoplay=1` cuando el clic fue de la persona. */
function withAutoplay(embed: string) {
  const url = new URL(embed);
  url.searchParams.set("autoplay", "1");
  return url.toString();
}
