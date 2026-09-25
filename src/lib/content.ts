/**
 * Todo el texto visible de la página, en un solo sitio.
 *
 * Tres respuestas están acordadas y no se cambian sin decidirlo: el precio no
 * se da (depende del catálogo y se ve en la llamada), no hay permanencia, y
 * cuando el agente no sabe algo no improvisa, avisa.
 *
 * No hay testimonios reales ni métricas de clientes. No se inventan.
 */

export const hero = {
  headline: ["El WhatsApp que no contestas", "lo contesta tu competencia"],
  sub: "Instalo un agente que responde al instante sobre tu número de siempre, califica a quien escribe y agenda la visita.",
  clock: { day: "domingo", time: "22:14" },
};

/** Recreación con datos ficticios. El aviso del pie lo declara. */
export const conversation = {
  contact: { name: "Andrés Zapata", initials: "AZ", avatar: "/brand/avatares/andres.webp" },
  messages: [
    { from: "them", at: "22:14", text: "Buenas noches, vi el video de los paneles. ¿Cuánto me sale para una casa?" },
    { from: "us", at: "22:14", text: "Buenas noches, Andrés. Con gusto. ¿Cuánto te llega de luz al mes, más o menos?" },
    { from: "them", at: "22:15", text: "Como 195 mil" },
    { from: "us", at: "22:15", text: "Con esa factura te sirve un sistema de 4 a 8 paneles, según el techo. ¿Los pondrías en techo o en patio?" },
    { from: "them", at: "22:16", text: "En el techo, es teja de barro" },
    { from: "us", at: "22:16", text: "Para teja de barro va soporte de gancho, sin perforar. Te propongo el kit de 6 paneles con inversor de 3 kW. ¿Te agendo la visita técnica esta semana?" },
    { from: "them", at: "22:17", text: "Sí, el jueves en la tarde" },
    { from: "us", at: "22:17", text: "Agendado: jueves, 3:00 p. m. Un técnico va con la ficha completa y el cálculo listo." },
  ],
  payoff: "Tú te enteraste el lunes a las 7:40 de la mañana. La visita ya estaba puesta.",
};

/** Los cuatro que escriben. Llegan a horas distintas, y ninguna te conviene. */
export const arrivals = {
  title: "A tu WhatsApp no le escribe un solo tipo de persona",
  lead: "Le escriben cuatro, y cada uno se pierde de una forma distinta cuando nadie contesta.",
  people: [
    {
      at: "06:41",
      label: "Ya decidió",
      body: "Tiene el presupuesto aprobado y solo quiere saber para cuándo puedes. Si tardas un día, ya arrancó con otro.",
    },
    {
      at: "10:12",
      label: "Está comparando",
      body: "Está cotizando en tres empresas al tiempo. Gana la que responde primero, no la más barata.",
    },
    {
      at: "14:58",
      label: "Vio un video",
      body: "Le interesó pero no sabe cuánto consume ni qué necesita. Alguien tiene que preguntárselo.",
    },
    {
      at: "21:30",
      label: "Apenas está entendiendo",
      body: "Pregunta cosas básicas que merecen respuesta. Hoy se quedan sin contestar hasta mañana.",
    },
  ],
};

/** Las cuatro funciones. Es lo que hace, en el orden en que lo hace. */
export const agent = {
  title: "Qué hace mientras tú estás en una instalación",
  steps: [
    {
      at: "08:15",
      title: "Contesta en segundos",
      body: "A las diez de la noche, un domingo o en temporada alta. No hay hora mala ni cola de mensajes por revisar.",
      metric: { value: "< 5 s", label: "en responder" },
    },
    {
      at: "08:16",
      title: "Pregunta lo que importa",
      body: "Cuánto paga de luz, dónde iría la instalación, si es casa o negocio. Las tres que tú harías si estuvieras mirando.",
      metric: { value: "3", label: "datos que califican" },
    },
    {
      at: "08:18",
      title: "Recomienda el kit",
      body: "Con tu catálogo y tus precios en pesos. Nada de cifras aproximadas ni de productos que no vendes.",
      metric: { value: "100 %", label: "de tu catálogo" },
    },
    {
      at: "08:21",
      title: "Agenda la visita",
      body: "Te deja la cita puesta con los datos completos, para que el técnico llegue sabiendo a qué va.",
      metric: { value: "1", label: "cita con ficha" },
    },
  ],
};

export const panel = {
  title: "Y tú lo ves todo desde un panel",
  body: "Cada conversación, en qué estado va y qué se respondió. Puedes tomar cualquier hilo cuando quieras: es tu WhatsApp de siempre y el agente se calla ahí mismo.",
  note: "El panel del enlace es real y está abierto. Míralo antes de hablar conmigo.",
  image: { src: "/brand/fotos/panel-ejemplo.jpg", w: 1240, h: 779 },
};

/** Aquí la escala del raíl cambia de horas a días. Es el único sitio. */
export const timeline = {
  title: "Siete días hábiles",
  lead: "Desde que me pasas tu número y tu catálogo hasta que está respondiendo.",
  days: [
    {
      n: "Día 1",
      title: "Me pasas lo tuyo",
      body: "Tu número de WhatsApp y tu catálogo: qué vendes, a cuánto, en qué cantidades y qué combina con qué.",
    },
    {
      n: "Día 3",
      title: "Ya responde y lo pruebas",
      body: "El agente contesta con tus productos reales. Le escribes tú, ves cómo responde y me pides los cambios.",
    },
    {
      n: "Día 7",
      title: "Queda instalado",
      body: "Funcionando en tu número. No instalas nada, no aprendes ningún programa y no cambias de herramienta.",
    },
  ],
};

export const requirements = {
  title: "Lo único que necesito de ti",
  lead: "Cuatro cosas. Ninguna es técnica y todas las tienes ya.",
  items: [
    { n: "01", text: "El número de WhatsApp que ya usas con tus clientes" },
    { n: "02", text: "Tu catálogo con los precios en pesos" },
    { n: "03", text: "Las cantidades por kit: paneles, inversor, baterías" },
    { n: "04", text: "Qué se puede combinar con qué" },
  ],
};

export const fit = {
  title: "Esto no le sirve a todo el mundo",
  yes: {
    title: "Trabajo contigo si",
    items: [
      "Atiendes más de quince personas al día",
      "Inviertes en innovación cuando ves que devuelve",
      "Tomas la decisión sin pasar por un comité",
    ],
  },
  no: {
    title: "No te sirve si",
    items: [
      "Tu negocio va al ritmo que quieres y no buscas crecer",
      "Prefieres revisar cada mensaje a mano",
      "Quieres probarlo con datos inventados en vez de tu catálogo",
    ],
  },
};

export const faqs = [
  {
    q: "¿Tengo que cambiar de número de WhatsApp?",
    a: "No. El agente trabaja sobre el número que ya usas con tus clientes.",
  },
  {
    q: "¿De dónde saca los precios que da?",
    a: "De tu catálogo. Le pasas qué vendes, a cuánto, en qué cantidades y qué se puede combinar con qué.",
  },
  {
    q: "¿Y si le preguntan algo que no está en mi catálogo?",
    a: "No improvisa. Cuando la pregunta se sale de lo que tú le diste, lo deja anotado y te avisa.",
  },
  {
    q: "¿Puedo tomar yo una conversación cuando quiera?",
    a: "Sí, en cualquier momento. Es tu WhatsApp de siempre: el agente deja de responder en ese hilo.",
  },
  {
    q: "¿Cuánto tarda en estar funcionando?",
    a: "Siete días hábiles desde que me pasas tu número y tu catálogo.",
  },
  {
    q: "¿Y si cambio mis precios o mis productos?",
    a: "Se actualizan. No están escritos a fuego: cuando cambien, me los pasas y responde con los nuevos.",
  },
  {
    q: "¿Necesito saber de tecnología?",
    a: "No. No instalas nada, no aprendes ningún programa y no cambias de herramienta.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende de cuántos productos y combinaciones tenga tu catálogo, porque eso es lo que marca el trabajo de montarlo. Lo vemos en los treinta minutos de llamada, con tu caso delante y sin compromiso.",
  },
  {
    q: "¿Hay permanencia?",
    a: "No. Puedes parar cuando quieras. No tiene sentido atarte a algo que debería sostenerse solo por lo que te trae cada mes.",
  },
];

export const closing = {
  title: "Mañana a las 22:14 vuelve a pasar",
  body: "La diferencia es quién contesta. Cuéntame qué vendes y en treinta minutos te digo si esto te sirve, con tu catálogo delante.",
};

export const legal =
  "La conversación de esta página es una recreación con datos ficticios. La foto de perfil es de banco de imágenes y no corresponde a esa persona.";
