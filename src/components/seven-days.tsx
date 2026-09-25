"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { timeline } from "@/lib/content";
import { Section, Wrap } from "./ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Único punto de la página donde el eje del tiempo cambia de unidad: de horas
 * a días. El raíl lo anuncia con `data-scale`, y aquí la línea se dibuja con
 * el scroll para que el salto de escala se vea, no solo se lea.
 */
export function SevenDays() {
  const root = useRef<HTMLElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          line.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top center",
            scrollTrigger: {
              trigger: ".days-grid",
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.5,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <Section ref={root} hour="Día 1" scale="día">
      <Wrap className="py-24 lg:py-32">
        <h2 className="reveal max-w-[14ch] text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance">
          {timeline.title}
        </h2>
        <p className="reveal mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-[var(--color-ink-muted)]">
          {timeline.lead}
        </p>

        <div className="days-grid relative mt-16 pl-8 sm:pl-10">
          {/* El eje que se dibuja. */}
          <span className="absolute top-2 bottom-2 left-[3px] w-px bg-[var(--color-rule-soft)]" />
          <span
            ref={line}
            className="absolute top-2 bottom-2 left-[3px] w-px bg-[var(--color-solar)]"
          />

          <ol className="flex flex-col gap-14 sm:gap-20">
            {timeline.days.map((d) => (
              <li key={d.n} className="reveal relative">
                <span className="absolute top-[0.55rem] -left-8 h-[7px] w-[7px] rounded-full bg-[var(--color-rule)] sm:-left-10" />
                <span className="tnum font-[family-name:var(--font-mono)] text-[12px] tracking-[0.08em] text-[var(--color-ink-faint)]">
                  {d.n}
                </span>
                <h3 className="mt-3 text-[clamp(1.4rem,2.6vw,2rem)] leading-[1.12] font-semibold tracking-[-0.025em]">
                  {d.title}
                </h3>
                <p className="mt-3 max-w-[50ch] text-[16px] leading-[1.6] text-[var(--color-ink-muted)]">
                  {d.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Wrap>
    </Section>
  );
}
