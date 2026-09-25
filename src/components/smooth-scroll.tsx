"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Dueño único del scroll y de los reveals.
 *
 * Lenis conduce la posición y GSAP la lee desde su propio ticker, así que
 * ScrollTrigger va sobre el scroll suavizado y no sobre el nativo. Un solo
 * ScrollTrigger.batch atiende a todos los `.reveal` de la página en vez de
 * crear uno por elemento.
 *
 * El gancho `data-motion` se pone en <body> y no como clase en <html>: React
 * es dueño del className de la raíz y lo reescribe al hidratar, borrando
 * cualquier clase puesta a mano.
 *
 * Y se pone al final, cuando el batch ya existe. Ese orden es la red de
 * seguridad: si algo fallara antes, el atributo no llega a escribirse, el CSS
 * no esconde nada y la página se ve entera. Un temporizador que lo quitara
 * pasados unos segundos apagaría los reveals para cualquiera que siga en la
 * página, que es justo todo el mundo.
 */
export function SmoothScroll() {
  useEffect(() => {
    const body = document.body;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.batch(".reveal", {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: reduce ? 0 : 0.85,
            ease: "expo.out",
            stagger: reduce ? 0 : 0.06,
            overwrite: true,
            clearProps: "willChange",
          }),
      });
    });

    body.dataset.motion = "on";

    if (reduce) {
      return () => {
        ctx.revert();
        delete body.dataset.motion;
      };
    }

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      gsap.ticker.lagSmoothing(500, 33);
      lenis.destroy();
      ctx.revert();
      delete body.dataset.motion;
    };
  }, []);

  return null;
}
