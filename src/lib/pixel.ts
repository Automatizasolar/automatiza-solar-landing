/**
 * Pixel de Meta (conjunto de datos «Web» del portfolio Automatiza Solar,
 * conectado a la cuenta publicitaria Automatiza Solar). Mide dos cosas:
 * la visita (PageView) y la reserva confirmada en Calendly (Schedule), que es
 * la conversión para la que optimiza la campaña.
 *
 * No se carga nada de Meta hasta que la persona acepta las cookies: es lo que
 * pide la política de datos y lo que dice el aviso. El ID no es un secreto,
 * viaja en la propia página.
 */
export const META_PIXEL_ID = "994422470343287";

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

export type Consent = "granted" | "denied";

const KEY = "as-cookies";
const CHANGE = "as-cookies-change";

/** El almacenamiento puede no existir (modo privado, bloqueo): sin decisión, no hay pixel. */
export function readConsent(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function saveConsent(value: Consent | null) {
  try {
    if (value) localStorage.setItem(KEY, value);
    else localStorage.removeItem(KEY);
  } catch {
    // Sin almacenamiento la decisión dura lo que dura la página.
  }
  if (value !== "granted") window.fbq?.("consent", "revoke");
  window.dispatchEvent(new Event(CHANGE));
}

export function onConsentChange(cb: () => void) {
  window.addEventListener(CHANGE, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CHANGE, cb);
    window.removeEventListener("storage", cb);
  };
}

/** El fragmento oficial de Meta, sin la etiqueta <noscript>: sin JS no hay forma de aceptar. */
export function loadPixel() {
  if (window.fbq) {
    window.fbq("consent", "grant");
    return;
  }

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

/**
 * El play del VSL. Evento propio (no estándar de Meta) para leer en el
 * administrador de eventos qué parte de las visitas ve el vídeo; la referencia
 * del programa es un 20 %.
 */
export function trackVideoPlay() {
  window.fbq?.("trackCustom", "VSLPlay");
}
