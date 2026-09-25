/**
 * Todo el texto visible de la página, en un solo sitio. Y ahora es verdad: los
 * titulares de la conversación y de las preguntas estaban sueltos dentro de sus
 * componentes, así que quien editaba este fichero se los saltaba.
 *
 * Tres respuestas están acordadas y no se cambian sin decidirlo: el precio no
 * se da (depende del catálogo y se ve en la llamada), no hay permanencia, y
 * cuando el agente no sabe algo no improvisa, avisa.
 *
 * No hay testimonios reales ni métricas de clientes. No se inventan.
 */

export const hero = {
  headline: ["El WhatsApp que no contestas", "lo contesta tu competencia"],
  // Nombra la categoría, conserva "Instalo" (toda la página está escrita en
  // primera persona) y conserva "de siempre", que es el diferenciador.
  sub: "Instalo un agente de atención y ventas en tu WhatsApp de siempre: responde al instante, califica y agenda la visita.",
  clock: { day: "domingo", time: "22:14" },
};

/** Recreación con datos ficticios. El aviso del pie lo declara. */
export const conversation = {
  heading: "Tú estabas dormido. Alguien preguntaba precios.",
  /**
   * Antes decía "sin nadie al otro lado del teléfono". Leído en frío, eso
   * significa que ahí no contestó nadie, que es lo contrario del argumento.
   * Tiene que quedar claro que no había nadie *de tu equipo*, y que quien
   * respondió fue el agente.
   */
  lead: "Tres minutos de un domingo por la noche. No contestó nadie de tu equipo: contestó el agente, con tu catálogo y tus precios.",
  contact: { name: "Andrés Zapata", initials: "AZ", avatar: "/brand/avatares/andres.webp" },
  agentLabel: "Responde el agente",
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

/**
 * El panel es la segunda demo y va justo detrás de la conversación, a las 07:40:
 * el remate dice "te enteraste el lunes a las 7:40" y este titular empieza con
 * una "Y" que ahí sí conecta con algo.
 */
export const panel = {
  title: "Y tú lo ves todo desde un panel",
  body: "Cada conversación, en qué estado va y qué se respondió. Puedes tomar cualquier hilo cuando quieras: es tu WhatsApp de siempre y el agente se calla ahí mismo.",
  note: "El panel del enlace es real y está abierto. Míralo antes de hablar conmigo.",
  image: { src: "/brand/fotos/panel-ejemplo.jpg", w: 1240, h: 779 },
};

/**
 * Los cuatro que escriben. Llegan a horas distintas, y ninguna te conviene.
 *
 * Sus horas van después de las 08:21 de la pila a propósito: el raíl mide un
 * día que corre hacia delante y no puede retroceder en ningún punto. Esta
 * sección es el goteo del resto de la jornada.
 */
export const arrivals = {
  title: "A tu WhatsApp no le escribe un solo tipo de persona",
  lead: "Le escriben cuatro, y cada uno se pierde de una forma distinta cuando nadie contesta.",
  people: [
    {
      at: "09:10",
      label: "Ya decidió",
      body: "Tiene el presupuesto aprobado y solo quiere saber para cuándo puedes. Si tardas un día, ya arrancó con otro.",
    },
    {
      at: "12:45",
      label: "Está comparando",
      body: "Está cotizando en tres empresas al tiempo. Gana la que responde primero, no la más barata.",
    },
    {
      at: "16:30",
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

/**
 * Aquí la escala del raíl cambia de horas a días. Es el único sitio.
 *
 * El Día 1 absorbe lo que antes era una sección aparte, "Lo único que necesito
 * de ti". Decía exactamente lo mismo, a una pantalla de distancia. Va como
 * enumeración dentro de la frase y no como lista de viñetas, para no
 * desequilibrar la línea de tiempo frente a los días 3 y 7.
 */
export const timeline = {
  title: "Siete días hábiles",
  lead: "Desde que me pasas tu número y tu catálogo hasta que está respondiendo.",
  days: [
    {
      n: "Día 1",
      title: "Me pasas lo tuyo",
      body: "Cuatro cosas que ya tienes y ninguna es técnica: el número de WhatsApp que usas con tus clientes, tu catálogo con los precios en pesos, las cantidades por kit (paneles, inversor, baterías) y qué se puede combinar con qué.",
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

export const faqTitle = "Lo que siempre me preguntan";

/**
 * Seis, no nueve. Se quitaron tres que la página ya respondía con las mismas
 * palabras: de dónde saca los precios (lo dice el Día 1), cuánto tarda (lo dice
 * la sección entera de los siete días) y si necesitas saber de tecnología (esa
 * respuesta era idéntica, palabra por palabra, al Día 7).
 *
 * Las tres acordadas se quedan: precio, permanencia y no improvisar.
 */
export const faqs = [
  {
    q: "¿Tengo que cambiar de número de WhatsApp?",
    a: "No. El agente trabaja sobre el número que ya usas con tus clientes.",
  },
  {
    q: "¿Y si le preguntan algo que no está en mi catálogo?",
    a: "No improvisa. Cuando la pregunta se sale de lo que tú le diste, lo deja anotado y te avisa.",
  },
  {
    q: "¿Puedo tomar yo una conversación cuando quiera?",
    a: "Sí, en cualquier momento. Entras al hilo y el agente deja de responder ahí.",
  },
  {
    q: "¿Y si cambio mis precios o mis productos?",
    a: "Se actualizan. No están escritos a fuego: cuando cambien, me los pasas y responde con los nuevos.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende de cuántos productos y combinaciones tenga tu catálogo, porque eso es lo que marca el trabajo de montarlo. Lo vemos en la llamada, sobre tu catálogo real y sin compromiso.",
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
