"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Mark = { hour: string; scale: string; at: number };

/**
 * El raíl de horas: un graticulado medido, no un adorno.
 *
 * Cada división se coloca en la fracción de scroll donde de verdad empieza su
 * sección, así que la distancia entre dos marcas dice cuánto dura leer ese
 * tramo. El punto verde es el único momento vivo de la página y se mueve
 * escribiendo el transform directamente sobre el nodo, sin pasar por React.
 *
 * La escala cambia de HORA a DÍA en la sección de los siete días. Es el único
 * sitio donde el eje del tiempo cambia de unidad, y se anuncia.
 */
export function HourRail() {
  const railRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [marks, setMarks] = useState<Mark[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let positions: number[] = [];

    const measure = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-hour]"),
      );
      const span = document.documentElement.scrollHeight - window.innerHeight;
      if (span <= 0) return;

      const next = sections.map((el) => {
        // Una sección fijada por GSAP pasa a position:fixed y su offsetTop se
        // vuelve 0. La medida buena es la del pin-spacer que la envuelve, que
        // sí conserva el hueco en el documento.
        const node = (el.closest(".pin-spacer") as HTMLElement | null) ?? el;
        const top = node.getBoundingClientRect().top + window.scrollY;

        return {
          hour: el.dataset.hour ?? "",
          scale: el.dataset.scale ?? "hora",
          // Fracción real de scroll en la que la sección toca el borde superior.
          at: Math.min(1, Math.max(0, top / span)),
        };
      });

      positions = next.map((m) => m.at);
      setMarks(next);
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const rail = railRef.current;
          const dot = dotRef.current;
          if (rail && dot) {
            dot.style.transform = `translate3d(-50%, ${self.progress * rail.clientHeight}px, 0)`;
          }
          // Índice activo: discreto, así que aquí sí vale tocar estado.
          let i = 0;
          for (let k = 0; k < positions.length; k += 1) {
            if (self.progress >= positions[k] - 0.02) i = k;
          }
          setActive((prev) => (prev === i ? prev : i));
        },
      });
    });

    ScrollTrigger.addEventListener("refresh", measure);
    ScrollTrigger.refresh();
    measure();

    return () => {
      ScrollTrigger.removeEventListener("refresh", measure);
      ctx.revert();
    };
  }, []);

  const current = marks[active];

  return (
    <>
      {/* Raíl completo: solo donde hay columna para habitarlo. */}
      <div
        aria-hidden
        className="pointer-events-none fixed top-0 left-0 z-30 hidden h-dvh w-[104px] select-none lg:block"
      >
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-[var(--color-rule)]" />

        <div ref={railRef} className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2">
          {marks.map((m, i) => (
            <div
              key={`${m.hour}-${i}`}
              className="absolute left-1/2 flex -translate-x-1/2 items-center gap-2"
              style={{ top: `${m.at * 100}%` }}
            >
              <span
                className={`block h-px transition-[width,background-color] duration-300 ease-[var(--ease-out-strong)] ${
                  i === active ? "bg-[var(--color-solar)]" : "bg-[var(--color-rule)]"
                } ${
                  /* El eje cambia de unidad en los siete días: la división se alarga. */
                  m.scale === "día" ? (i === active ? "w-10" : "w-7") : i === active ? "w-6" : "w-3"
                }`}
              />
              <span
                className={`tnum font-[family-name:var(--font-mono)] text-[10px] whitespace-nowrap tracking-[0.08em] transition-colors duration-300 ${
                  i === active ? "text-[var(--color-ink-muted)]" : "text-[var(--color-ink-faint)]"
                }`}
              >
                {m.hour}
              </span>
            </div>
          ))}

          {/* El único momento vivo de la página. */}
          <div
            ref={dotRef}
            className="absolute top-0 left-1/2 h-2 w-2 rounded-full bg-[var(--color-solar)]"
            style={{ boxShadow: "0 0 0 4px color-mix(in oklab, var(--color-solar) 18%, transparent)" }}
          />
        </div>

      </div>

      {/* Móvil: la hora sigue presente, sin raíl. */}
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-4 left-4 z-30 flex items-center gap-2 rounded-full border border-[var(--color-rule)] bg-[color-mix(in_oklab,var(--color-ground)_82%,transparent)] px-3 py-1.5 backdrop-blur-md lg:hidden"
      >
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inset-0 rounded-full bg-[var(--color-solar)]" />
        </span>
        <span className="tnum font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-ink-muted)]">
          {current?.hour ?? "22:14"}
        </span>
      </div>
    </>
  );
}
