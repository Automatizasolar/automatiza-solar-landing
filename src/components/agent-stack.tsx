"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { agent } from "@/lib/content";
import { Measure, Section, Wrap } from "./ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Las cuatro funciones, apiladas de verdad.
 *
 * La pila está motivada: son cuatro pasos de una misma conversación, en orden,
 * y verlos superponerse dice que ocurren en la misma llamada y no en cuatro
 * momentos distintos. La que sale se encoge y se apaga; nunca desaparece.
 *
 * Cada tarjeta lleva su z-index explícito y creciente, y eso no es adorno.
 * Al fijar una tarjeta, GSAP la pone en `position: fixed`, y un elemento
 * posicionado se pinta por encima del contenido que sigue en flujo normal. La
 * última tarjeta es la única que nunca se fija, así que sin z-index se metía
 * por debajo de la anterior y los dos textos se leían encima del otro.
 */
export function AgentStack() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

        cards.forEach((card, i) => {
          if (i === cards.length - 1) return;

          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            endTrigger: cards[cards.length - 1],
            end: "top top",
            pin: true,
            pinSpacing: false,
          });

          gsap.to(card, {
            scale: 0.94,
            opacity: 0.28,
            filter: "blur(3px)",
            ease: "none",
            scrollTrigger: {
              trigger: cards[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <Section ref={root} hour={agent.steps[0].at}>
      <Wrap className="pt-16 pb-10 lg:pt-20">
        <h2 className="max-w-[17ch] text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance">
          {agent.title}
        </h2>
      </Wrap>

      {/* La banda ilustra el titular literalmente: estas manos están ocupadas,
          y por eso no hay nadie contestando el WhatsApp. */}
      <Wrap className="pb-14 lg:pb-20">
        <div className="reveal relative aspect-[21/9] overflow-hidden rounded-[14px] border border-[var(--color-rule)]">
          <Image
            src="/brand/fotos/manos-instalacion.jpg"
            alt="Manos enguantadas atornillando un panel solar sobre una estructura de tejado"
            fill
            sizes="(max-width: 1180px) 100vw, 1180px"
            className="object-cover object-[center_62%]"
          />
        </div>
      </Wrap>

      <div className="relative">
        {agent.steps.map((s, i) => (
          <div
            key={s.title}
            className="stack-card relative flex items-center py-6 lg:min-h-[100dvh] lg:py-0"
            style={{ zIndex: i + 1 }}
          >
            <Wrap>
              <div className="rounded-[14px] border border-[var(--color-rule)] bg-[var(--color-raised)] p-7 sm:p-10 lg:p-14">
                <div className="flex items-center gap-3">
                  <span className="tnum font-[family-name:var(--font-mono)] text-[12px] tracking-[0.06em] text-[var(--color-solar)]">
                    {s.at}
                  </span>
                  <span className="h-px w-10 bg-[var(--color-rule)]" />
                </div>

                <h3 className="mt-6 max-w-[16ch] text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.08] font-semibold tracking-[-0.025em] text-balance">
                  {s.title}
                </h3>
                <p className="mt-5 max-w-[48ch] text-[clamp(1rem,1.25vw,1.125rem)] leading-[1.6] text-[var(--color-ink-muted)]">
                  {s.body}
                </p>

                <div className="mt-8 border-t border-[var(--color-rule-soft)] pt-5">
                  <Measure value={s.metric.value} label={s.metric.label} />
                </div>
              </div>
            </Wrap>
          </div>
        ))}
      </div>
    </Section>
  );
}
