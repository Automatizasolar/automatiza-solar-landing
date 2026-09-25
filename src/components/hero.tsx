"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { WhatsappLogoIcon, CalendarBlankIcon } from "@phosphor-icons/react/dist/ssr";
import { hero } from "@/lib/content";
import { cta, site } from "@/lib/site";
import { ActionPrimary, ActionSecondary, Section, Wrap } from "./ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Primer viewport.
 *
 * El campo oscuro es la constante y la foto se mueve dentro de él, recortada
 * dura contra la esquina inferior derecha en vez de ocupar media pantalla a
 * sangre. Así el titular tiene ancho de verdad y no necesita velo encima para
 * ser legible: no hay texto sobre la foto en ningún punto.
 *
 * La foto entra casi sin filtros: en un mundo de papel, apagarla la ensuciaría.
 * Y entra como placa con borde, igual que las demás imágenes de la página, no
 * difuminada contra el fondo: sobre papel, fundir una foto con un degradado
 * del color del papel no la disuelve, la emborrona.
 *
 * El titular entra por líneas desde debajo de su propia máscara, que es lo
 * único que se mueve de golpe; lo demás entra desde un estado ya visible.
 */
export function Hero() {
  const root = useRef<HTMLElement>(null);
  const photo = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      gsap
        .timeline({ defaults: { ease: "expo.out" } })
        .from(".hero-line > span", { yPercent: 106, duration: 1.15, stagger: 0.09 })
        .from(".hero-sub", { opacity: 0, y: 14, duration: 0.7 }, "-=0.74")
        .from(".hero-act", { opacity: 0, y: 14, duration: 0.7, stagger: 0.07 }, "-=0.62")
        .from(photo.current, { opacity: 0, scale: 1.06, duration: 1.5 }, 0.15);

      gsap.to(photo.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
    },
    { scope: root },
  );

  return (
    <Section
      ref={root}
      hour={hero.clock.time}
      className="flex min-h-[100dvh] items-center overflow-clip pt-24 pb-14"
    >
      {/* Recorte duro a la esquina. Nunca hay texto encima. */}
      <div
        ref={photo}
        className="pointer-events-none absolute right-0 bottom-[4vh] h-[19vh] w-[min(50%,230px)] overflow-hidden rounded-l-[14px] border border-r-0 border-[var(--color-rule)] sm:h-[38vh] sm:w-[min(48%,360px)] lg:bottom-[8vh] lg:h-[44vh] lg:w-[min(38%,470px)]"
      >
        <Image
          src="/brand/fotos/hero-instalador.jpg"
          alt="Instalador colocando un panel solar negro sobre el tejado de una casa, con las dos manos ocupadas"
          fill
          priority
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 48vw, 470px"
          className="object-cover object-[34%_center] saturate-[0.92]"
        />
      </div>

      <Wrap className="relative">
        <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.05rem,5vw,4.15rem)] leading-[1.035] font-semibold tracking-[-0.033em]">
          {hero.headline.map((line) => (
            <span key={line} className="hero-line block overflow-hidden pb-[0.07em]">
              <span className="block text-balance">{line}</span>
            </span>
          ))}
        </h1>

        <p className="hero-sub mt-8 max-w-[44ch] text-[clamp(1rem,1.3vw,1.15rem)] leading-[1.55] text-[var(--color-ink-muted)]">
          {hero.sub}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <span className="hero-act">
            <ActionPrimary href={site.whatsappHref} icon={<WhatsappLogoIcon size={19} weight="fill" />}>
              {cta.whatsapp}
            </ActionPrimary>
          </span>
          <span className="hero-act">
            <ActionSecondary href={site.calendly} icon={<CalendarBlankIcon size={18} />}>
              {cta.call}
            </ActionSecondary>
          </span>
        </div>
      </Wrap>
    </Section>
  );
}
