"use client";

import { useEffect, useRef, useState } from "react";
import { preconnect } from "react-dom";
import { funnelCopy } from "@/lib/content";
import { trackDateSelected, trackSchedule } from "@/lib/pixel";
import { funnel } from "@/lib/site";
import { PrivacyButton } from "./privacy";
import { Section, Wrap } from "./ui";

/**
 * Piezas 5 y 6: el formulario y el calendario en un solo flujo. Es Calendly
 * embebido, que pide los datos al reservar y no los vuelve a pedir: nombre,
 * correo, WhatsApp, web o Instagram y la casilla de consentimiento se
 * configuran en el propio evento de Calendly, no aquí.
 *
 * Sin el script de Calendly: un iframe y nada más, que la CSP de la web ya
 * permite. La altura la manda Calendly por postMessage cuando cambia de paso;
 * hasta entonces se reserva una altura que cabe en móvil sin scroll interno.
 *
 * El src se escribe directo sobre el nodo porque Calendly necesita saber en qué
 * dominio está embebido, y en una preview de Vercel no es automatizasolar.com.
 *
 * Calendly es pesado (su app y sus filtros anti-bots tardan segundos en
 * arrancar), así que se le adelanta el trabajo: conexión abierta desde el
 * principio, y el iframe empieza a cargar en cuanto la página terminó lo suyo,
 * no cuando la persona llega abajo. Mientras arranca se ve un esqueleto del
 * calendario en vez de un hueco en blanco.
 *
 * Por el mismo canal Calendly avisa de los pasos: cuando eligen día y hora y
 * se abre el formulario (AgendaHora) y cuando la reserva queda confirmada
 * (Schedule). Los dos van al pixel, solo si la persona aceptó las cookies, y
 * los dos llevan si vio el VSL o no.
 */
export function Agenda() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>();
  const [ready, setReady] = useState(false);

  preconnect("https://calendly.com");
  preconnect("https://assets.calendly.com");

  useEffect(() => {
    // Después del load: así no le quita ancho de banda al primer pantallazo.
    const start = () => {
      if (frame.current && !frame.current.src) {
        frame.current.src = funnel.calendlyEmbed(window.location.host);
      }
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if (typeof e.data?.event === "string" && e.data.event.startsWith("calendly.")) setReady(true);
      if (e.data?.event === "calendly.page_height") {
        const h = parseInt(e.data.payload?.height, 10);
        if (h > 0) setHeight(h);
      }
      if (e.data?.event === "calendly.date_and_time_selected") {
        trackDateSelected();
      }
      if (e.data?.event === "calendly.event_scheduled") {
        trackSchedule(e.data.payload?.invitee?.uri);
      }
    };
    window.addEventListener("message", onMessage);
    return () => {
      window.removeEventListener("load", start);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return (
    <Section id={funnel.agendaId} hour="22:14" className="scroll-mt-16">
      <Wrap className="py-16 lg:py-24">
        <div className="reveal max-w-[40rem]">
          <h2 className="text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.05] font-semibold tracking-[-0.03em] text-balance">
            {funnelCopy.agenda.title}
          </h2>
          <p className="mt-6 max-w-[48ch] text-[clamp(1.05rem,1.4vw,1.2rem)] leading-[1.6] text-[var(--color-ink-muted)]">
            {funnelCopy.agenda.body}
          </p>
        </div>

        <div className="relative mt-10 -mx-5 overflow-hidden border-y border-[var(--color-rule)] bg-[var(--color-raised)] sm:mx-0 sm:rounded-[14px] sm:border">
          <iframe
            ref={frame}
            title="Elige día y hora para la llamada"
            className="block w-full"
            style={{ height: height ?? 700 }}
          />
          {!ready && <CalendarSkeleton />}
        </div>

        <p className="mt-5 text-[14px] leading-[1.5] text-[var(--color-ink-faint)]">
          {funnelCopy.agenda.privacyNote} <PrivacyButton />.
        </p>
      </Wrap>
    </Section>
  );
}

/** Lo que se ve mientras Calendly arranca: la forma del calendario y qué está pasando. */
function CalendarSkeleton() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex flex-col items-center bg-[var(--color-raised)] px-6 pt-10"
    >
      <p className="text-[15px] font-medium text-[var(--color-ink-muted)]">Cargando el calendario…</p>
      <div className="mt-8 grid w-full max-w-[22rem] grid-cols-7 gap-3">
        {Array.from({ length: 35 }, (_, i) => (
          <span
            key={i}
            className="aspect-square animate-pulse rounded-full bg-[var(--color-raised-2)]"
            style={{ animationDelay: `${(i % 7) * 80}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
