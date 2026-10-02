/**
 * Pixel de Meta (conjunto de datos «Automatiza Solar Web»). Mide dos cosas:
 * la visita (PageView) y la reserva confirmada en Calendly (Schedule), que es
 * la conversión para la que optimiza la campaña.
 *
 * Se carga en cuanto se abre la página, sin aviso de cookies: decisión del
 * negocio para que Meta reciba todas las visitas. La política de datos lo
 * explica. El ID no es un secreto, viaja en la propia página.
 */
export const META_PIXEL_ID = "1781780012699165";

type Fbq = {
  (...args: unknown[]): void;
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[][];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** El fragmento oficial de Meta, escrito en TypeScript. */
export function loadPixel() {
  if (window.fbq) return;

  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  document.head.appendChild(script);

  fbq("init", META_PIXEL_ID);
  fbq("track", "PageView");
}

/**
 * La reserva confirmada. El eventID es el invitado de Calendly: si un día se
 * añade la API de conversiones, Meta usa ese ID para no contarla dos veces.
 */
export function trackSchedule(eventId?: string) {
  window.fbq?.("track", "Schedule", {}, eventId ? { eventID: eventId } : undefined);
}
