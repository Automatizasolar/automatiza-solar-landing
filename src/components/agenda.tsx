"use client";

import { useEffect, useRef, useState } from "react";
import { funnelCopy } from "@/lib/content";
import { trackSchedule } from "@/lib/pixel";
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
 * El src se escribe al montar, directo sobre el nodo, porque Calendly necesita
 * saber en qué dominio está embebido y en una preview de Vercel no es
 * automatizasolar.com.
 *
 * Por el mismo canal Calendly avisa de la reserva confirmada: ahí se manda el
 * Schedule al pixel.
 */
export function Agenda() {
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState<number>();

  useEffect(() => {
    if (frame.current) frame.current.src = funnel.calendlyEmbed(window.location.host);

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event === "calendly.page_height") {
        const h = parseInt(e.data.payload?.height, 10);
        if (h > 0) setHeight(h);
      }
      if (e.data?.event === "calendly.event_scheduled") {
        trackSchedule(e.data.payload?.invitee?.uri);
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
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

        <div className="mt-10 -mx-5 overflow-hidden border-y border-[var(--color-rule)] bg-[var(--color-raised)] sm:mx-0 sm:rounded-[14px] sm:border">
          <iframe
            ref={frame}
            title="Elige día y hora para la llamada"
            loading="lazy"
            className="block w-full"
            style={{ height: height ?? 1060 }}
          />
        </div>

        <p className="mt-5 text-[14px] leading-[1.5] text-[var(--color-ink-faint)]">
          {funnelCopy.agenda.privacyNote} <PrivacyButton />.
        </p>
      </Wrap>
    </Section>
  );
}
