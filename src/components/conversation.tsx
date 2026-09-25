"use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { conversation, hero } from "@/lib/content";
import { Section, Wrap } from "./ui";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * La conversación se escribe con el scroll.
 *
 * No es una captura falsa de WhatsApp hecha con divs: es un hilo tipográfico
 * en el lenguaje de esta página, con sus horas medidas. Se lee igual con un
 * lector de pantalla y no imita la interfaz de nadie.
 *
 * Se fija y se raspa solo a partir de 1024px. Por debajo, los mensajes entran
 * escalonados sin secuestrar el scroll, que en un móvil es hostil.
 */
export function Conversation() {
  const root = useRef<HTMLElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const thread = useRef<HTMLDivElement>(null);
  const clock = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
          handheld: "(max-width: 1023px) and (prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop } = ctx.conditions as { desktop: boolean };
          const items = gsap.utils.toArray<HTMLElement>(".msg");

          if (!desktop) {
            items.forEach((el) =>
              gsap.from(el, {
                opacity: 0,
                y: 16,
                duration: 0.7,
                ease: "expo.out",
                scrollTrigger: { trigger: el, start: "top 90%", once: true },
              }),
            );
            gsap.from(".payoff", {
              opacity: 0,
              y: 16,
              duration: 0.8,
              ease: "expo.out",
              scrollTrigger: { trigger: ".payoff", start: "top 90%", once: true },
            });
            return;
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=1900",
              pin: stage.current,
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });

          // El reloj avanza con la conversación, no con un temporizador.
          const ticker = { t: 0 };
          const stamps = conversation.messages.map((m) => m.at);
          tl.to(
            ticker,
            {
              t: stamps.length - 1,
              ease: "none",
              onUpdate: () => {
                if (clock.current) {
                  clock.current.textContent = stamps[Math.round(ticker.t)] ?? stamps[0];
                }
              },
            },
            0,
          );

          items.forEach((el, i) => {
            tl.fromTo(
              el,
              { opacity: 0, y: 22, filter: "blur(7px)" },
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.55, ease: "expo.out" },
              // El offset es menor que la duración a propósito: con el raspado
              // más corto los mensajes se pisan un poco, que es como llegan los
              // WhatsApp de verdad.
              i * 0.45,
            );
          });

          // El hilo sube para que el último mensaje siga a la vista.
          tl.fromTo(
            thread.current,
            { y: 0 },
            {
              y: () => {
                const el = thread.current;
                const box = el?.parentElement;
                if (!el || !box) return 0;
                return Math.min(0, box.clientHeight - el.scrollHeight);
              },
              ease: "none",
              duration: items.length * 0.45,
            },
            0,
          );

          tl.fromTo(
            ".payoff",
            { opacity: 0, y: 18 },
            { opacity: 1, y: 0, duration: 0.8, ease: "expo.out" },
            items.length * 0.45 + 0.2,
          );
        },
      );
    },
    { scope: root },
  );

  return (
    <Section ref={root} hour="22:17" className="relative">
      <div ref={stage} className="flex min-h-[100dvh] items-center py-20 lg:py-0">
        <Wrap>
          <div className="conv-grid">
            <div className="conv-head">
              <h2 className="max-w-[18ch] text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06] font-semibold tracking-[-0.03em] text-balance">
                {conversation.heading}
              </h2>

              <p className="mt-6 max-w-[44ch] text-[17px] leading-[1.6] text-[var(--color-ink-muted)]">
                {conversation.lead}
              </p>
            </div>

            <p className="payoff conv-payoff max-w-[42ch] border-l border-[var(--color-solar)] pl-5 text-[17px] leading-[1.6] text-[var(--color-ink)]">
              {conversation.payoff}
            </p>

            <div className="conv-thread">
              {/* Un hilo de chat sin participantes es un hilo roto. Y aquí,
                  además, es donde hay que decir que quien responde es el agente:
                  es el punto exacto donde se está demostrando. */}
              <div className="mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-[var(--color-rule-soft)] pb-3">
                <span className="text-[14px] font-medium text-[var(--color-ink)]">
                  {conversation.contact.name}
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-solar)]" />
                  <span className="text-[12px] font-medium text-[var(--color-solar)]">
                    {conversation.agentLabel}
                  </span>
                  <span className="h-3 w-px bg-[var(--color-rule)]" />
                  <span className="tnum font-[family-name:var(--font-mono)] text-[12px] tracking-[0.06em] text-[var(--color-ink-faint)]">
                    {hero.clock.day}
                    {", "}
                    <span ref={clock}>{conversation.messages[0].at}</span>
                  </span>
                </span>
              </div>

              <div className="relative lg:h-[58vh] lg:overflow-hidden">
              <div ref={thread} className="flex flex-col gap-4 will-change-transform">
                {conversation.messages.map((m, i) => {
                  const mine = m.from === "us";
                  return (
                    <div
                      key={i}
                      className={`msg flex max-w-[92%] gap-3 ${mine ? "ml-auto flex-row-reverse" : "mr-auto"}`}
                    >
                      {!mine && (
                        <Image
                          src={conversation.contact.avatar}
                          alt=""
                          width={96}
                          height={96}
                          className="mt-1 h-8 w-8 shrink-0 rounded-full object-cover"
                        />
                      )}
                      <div
                        className={`rounded-[14px] border px-4 py-3 ${
                          mine
                            ? "border-[var(--color-rule)] bg-[var(--color-raised)] text-[var(--color-ink)]"
                            : "border-transparent bg-[var(--color-raised-2)] text-[var(--color-ink-muted)]"
                        }`}
                      >
                        <p className="text-[15px] leading-[1.5]">{m.text}</p>
                        <span className="tnum mt-1.5 block font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-ink-faint)]">
                          {m.at}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="pointer-events-none absolute inset-x-0 top-0 hidden h-16 bg-[linear-gradient(180deg,var(--color-ground),transparent)] lg:block" />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-16 bg-[linear-gradient(0deg,var(--color-ground),transparent)] lg:block" />
              </div>
            </div>
          </div>
        </Wrap>
      </div>
    </Section>
  );
}
