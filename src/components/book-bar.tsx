"use client";

import { useEffect, useState } from "react";
import { funnelCopy } from "@/lib/content";
import { cta, funnel } from "@/lib/site";

/**
 * Barra de reserva del móvil. Aparece cuando el botón del primer viewport ya
 * quedó atrás y se aparta cuando la agenda entra en pantalla: si ya hay un
 * calendario a la vista, la barra sobra y estorba.
 */
export function BookBar() {
  const [heroGone, setHeroGone] = useState(false);
  const [agendaInView, setAgendaInView] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("main section");
    const agenda = document.getElementById(funnel.agendaId);
    if (!hero || !agenda) return;

    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.target === hero) setHeroGone(!e.isIntersecting);
        if (e.target === agenda) setAgendaInView(e.isIntersecting);
      }
    });
    io.observe(hero);
    io.observe(agenda);
    return () => io.disconnect();
  }, []);

  const show = heroGone && !agendaInView;

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 flex items-center gap-4 border-t border-[var(--color-rule)] bg-[color-mix(in_oklab,var(--color-raised)_94%,transparent)] px-5 pt-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] backdrop-blur-xl transition-transform duration-300 ease-[var(--ease-out-strong)] sm:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="min-w-0 flex-1 leading-[1.3]">
        <p className="text-[15px] font-semibold">{funnelCopy.bar.title}</p>
        <p className="text-[13px] text-[var(--color-ink-faint)]">{funnelCopy.bar.note}</p>
      </div>
      <a
        href={funnel.agendaHref}
        tabIndex={show ? 0 : -1}
        className="shrink-0 rounded-full bg-[var(--color-solar)] px-5 py-3 text-[15px] leading-none font-medium text-white transition-[transform,background-color] duration-150 active:scale-[0.97]"
      >
        {cta.bookShort}
      </a>
    </div>
  );
}
