/**
 * Único sitio donde se escribe el número. Si cambia, cambia aquí y ya:
 * los botones, el pie y los datos estructurados lo leen de esta constante.
 * Formato internacional, sin signos ni espacios.
 */
export const WHATSAPP = "573223275495";

export const WHATSAPP_MESSAGE =
  "Hola, vengo de la página. Quiero saber cómo funciona el agente para mi negocio.";

export const site = {
  name: "Automatiza Solar",
  email: "piedrahita@automatizasolar.com",
  calendly: "https://calendly.com/piedrahita-automatizasolar/30min",
  panel: "https://automatiza-solar-demo.vercel.app",
  whatsappHref: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
  whatsappPretty: "+57 322 327 5495",
} as const;

/** Etiquetas de acción. Una por intención, repetida igual en toda la página. */
export const cta = {
  whatsapp: "Escríbeme por WhatsApp",
  call: "Agendar 30 minutos",
  panel: "Ver el panel",
  book: "Reservar llamada de 30 minutos",
  bookShort: "Reservar",
  privacy: "Política de tratamiento de datos",
} as const;

/**
 * La web es el funnel de los anuncios. No hay enlaces de salida: todos los
 * botones bajan a la agenda, que es Calendly embebido en la página.
 */
export const funnel = {
  agendaId: "agenda",
  agendaHref: "#agenda",
  calendlyEmbed(host: string) {
    const params = new URLSearchParams({
      embed_domain: host,
      embed_type: "Inline",
      hide_gdpr_banner: "1",
      hide_event_type_details: "1",
      primary_color: "0f7355",
    });
    return `${site.calendly}?${params}`;
  },
};
