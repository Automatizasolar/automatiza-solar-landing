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
 * Qué pasó con el VSL en esta visita, para leer el resto del embudo partido en
 * dos: quien vio el vídeo y quien no. Vive en sessionStorage (muere al cerrar
 * la pestaña y no identifica a nadie) y viaja como parámetro en los eventos
 * de la agenda. En el administrador de eventos de Meta se filtra por él.
 */
const VSL_KEY = "as-vsl";

function rememberVideo(pct: number) {
  try {
    const prev = Number(sessionStorage.getItem(VSL_KEY) ?? -1);
    if (pct > prev) sessionStorage.setItem(VSL_KEY, String(pct));
  } catch {
    // Sin almacenamiento, el dato dura lo que dura el evento.
  }
}

function videoStatus() {
  let pct = -1;
  try {
    pct = Number(sessionStorage.getItem(VSL_KEY) ?? -1);
  } catch {
    pct = -1;
  }
  return pct < 0 ? { video: "no_visto" } : { video: "visto", video_porcentaje: pct };
}

/**
 * El play del VSL. Evento propio (no estándar de Meta) para leer qué parte de
 * las visitas le da al play; la referencia del programa es un 20 %.
 */
export function trackVideoPlay() {
  rememberVideo(0);
  window.fbq?.("trackCustom", "VSLPlay");
}

/**
 * Los cuartos del VSL: cuánto del vídeo se ve de verdad, no solo quién le dio
 * al play. Solo con vídeo propio; un embed de Loom o YouTube no avisa.
 */
export function trackVideoProgress(pct: 25 | 50 | 75 | 100) {
  rememberVideo(pct);
  window.fbq?.("trackCustom", "VSLProgreso", { porcentaje: pct });
}

/** Eligió día y hora en Calendly y se le abrió el formulario: el paso anterior a reservar. */
export function trackDateSelected() {
  window.fbq?.("trackCustom", "AgendaHora", videoStatus());
}

/**
 * La reserva confirmada. El eventID es el invitado de Calendly: si un día se
 * añade la API de conversiones, Meta usa ese ID para no contarla dos veces.
 */
export function trackSchedule(eventId?: string) {
  window.fbq?.("track", "Schedule", videoStatus(), eventId ? { eventID: eventId } : undefined);
}
