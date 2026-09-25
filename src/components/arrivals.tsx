"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { arrivals } from "@/lib/content";
import { Section, Wrap } from "./ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Los cuatro que escriben, como llegadas a lo largo del día.
 *
 * El paneo horizontal está motivado: son horas distintas de una misma jornada,
 * y el eje horizontal es el eje del tiempo. Si se apilaran en vertical se
 * perdería lo único que los diferencia.
 */
export function Arrivals() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current;
        if (!el) return;

        gsap.to(el, {
          x: () => -(el.scrollWidth - window.innerWidth + 96),
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: () => `+=${el.scrollWidth - window.innerWidth + 96}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <Section ref={root} hour={arrivals.people[0].at}>
      <div className="flex flex-col justify-center py-24 lg:min-h-[100dvh]">
        <Wrap>
          <h2 className="max-w-[18ch] text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance">
            {arrivals.title}
          </h2>
          <p className="mt-5 max-w-[52ch] text-[17px] leading-[1.6] text-[var(--color-ink-muted)]">
            {arrivals.lead}
          </p>
        </Wrap>

        {/* El recorte va aquí dentro y no en la sección: GSAP fija la sección
            y un overflow en el elemento fijado deja escapar la primera tarjeta. */}
        <div className="mt-14 overflow-hidden lg:mt-20 lg:[mask-image:linear-gradient(90deg,transparent_0,#000_176px,#000_calc(100%-176px),transparent_100%)]">
          <div
            ref={track}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-5 px-5 pb-6 sm:scroll-pl-8 sm:px-8 lg:scroll-pl-12 lg:overflow-visible lg:px-12 lg:pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {arrivals.people.map((p) => (
              <article
                key={p.label}
                className="w-[78vw] shrink-0 snap-start sm:w-[58vw] lg:w-[min(42vw,560px)]"
              >
                {/* Anotación fijada al eje con línea guía, no tarjeta suelta. */}
                <div className="flex items-center gap-3">
                  <span className="tnum font-[family-name:var(--font-mono)] text-[12px] tracking-[0.06em] text-[var(--color-solar)]">
                    {p.at}
                  </span>
                  <span className="h-px flex-1 bg-[var(--color-rule)]" />
                </div>
                <h3 className="mt-5 text-[clamp(1.35rem,2vw,1.75rem)] leading-[1.15] font-semibold tracking-[-0.02em]">
                  {p.label}
                </h3>
                <p className="mt-3 text-[16px] leading-[1.6] text-[var(--color-ink-muted)]">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
