import { site } from "./site";

/**
 * Política de tratamiento de datos (Ley 1581 de 2012 y Decreto 1377 de 2013).
 * Cubre lo que recoge la web: la reserva de la llamada en Calendly. Es un
 * borrador práctico, no asesoría legal: se valida con un profesional antes de
 * lanzar anuncios. Incluye el pixel de Meta, que carga al abrir la página.
 */
export const privacy = {
  title: "Política de tratamiento de datos personales",
  updated: "1 de octubre de 2026",
  sections: [
    {
      h: "Quién trata tus datos",
      p: [
        `Alejandro Piedrahita, de ${site.name}, con domicilio en Medellín, Colombia. Para cualquier cuestión sobre tus datos puedes escribirme a ${site.email} o al WhatsApp ${site.whatsappPretty}.`,
      ],
    },
    {
      h: "Qué datos recojo",
      p: [
        "Los que dejas al reservar una llamada: nombre, correo, número de WhatsApp, la web o el Instagram de tu empresa y el día y la hora que eliges.",
      ],
    },
    {
      h: "Para qué los uso",
      p: [
        "Para contactarte sobre tu solicitud, preparar la llamada y enviarte la confirmación y el recordatorio. Nada más: no los vendo, no los cedo a terceros y no te apunto a ninguna lista sin que lo pidas.",
      ],
    },
    {
      h: "Quién más los toca",
      p: [
        "La agenda funciona con Calendly, que guarda la reserva por encargo mío, y la web está alojada en Vercel. Los dos tienen sus servidores fuera de Colombia. Al reservar autorizas que tus datos se guarden ahí con esta única finalidad.",
      ],
    },
    {
      h: "Cookies y medición de anuncios",
      p: [
        "La página usa el pixel de Meta para saber qué anuncios traen visitas y reservas. Meta recibe que visitaste la página y, si reservas, que hubo una reserva, y lo guarda con sus cookies. Si no quieres que se mida, puedes bloquear las cookies de terceros en la configuración de tu navegador; la página funciona igual.",
      ],
    },
    {
      h: "Cuánto tiempo los guardo",
      p: [
        "Mientras dure la conversación comercial contigo, o hasta que me pidas borrarlos.",
      ],
    },
    {
      h: "Tus derechos",
      p: [
        "Puedes conocer, actualizar y rectificar tus datos, pedir prueba de tu autorización, saber cómo se han usado, revocar la autorización o pedir que los borre, y presentar una queja ante la Superintendencia de Industria y Comercio.",
        `Para ejercerlos, escríbeme a ${site.email}. Respondo las consultas en un máximo de diez días hábiles y los reclamos en un máximo de quince, y te confirmo por escrito cuando tus datos estén borrados.`,
      ],
    },
  ],
};
