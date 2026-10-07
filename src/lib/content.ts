/**
 * Todo el texto visible de la página, en un solo sitio. Y ahora es verdad: los
 * titulares de la conversación y de las preguntas estaban sueltos dentro de sus
 * componentes, así que quien editaba este fichero se los saltaba.
 *
 * Tres respuestas están acordadas y no se cambian sin decidirlo: el precio no
 * se da (depende del catálogo y se ve en la llamada), no hay permanencia, y
 * cuando el agente no sabe algo no improvisa, avisa.
 *
 * No hay testimonios reales ni métricas de clientes. No se inventan. Las tres
 * frases de «Así hablan…» son las citas literales de la investigación del
 * avatar (ficha «Perfil de audiencia» del cuaderno): reseñas y llamadas a
 * instaladoras de Medellín, no clientes de Automatiza Solar, y la sección lo
 * dice así.
 *
 * Revisión del 7 oct 2026: la página hablaba de «clientes», «mensajes» y
 * «negocio», palabras que valen igual para una clínica o un concesionario, y
 * eso fue lo que reportaron: «muy general». Ahora habla de lo que le pasa a una
 * empresa de paneles en Medellín: la factura de luz, el techo, el kit, la visita
 * técnica, el trámite ante EPM, el tejado. El titular no se toca: es el del
 * anuncio, palabra por palabra.
 */

export const hero = {
  headline: ["El WhatsApp que no contestas", "lo contesta tu competencia"],
  // Sin «agente» ni «IA» en el primer pantallazo (regla de los anuncios: el
  // dolor primero, la solución después). Dice lo que pasa, en el orden en que
  // pasa, con las palabras del sector. «De siempre» sigue siendo el
  // diferenciador y se queda.
  sub: "Tu WhatsApp de siempre contesta solo mientras estás en un tejado o ya cerraste: pregunta la factura y el techo, recomienda el kit con tus precios y deja la visita técnica agendada.",
  clock: { day: "domingo", time: "22:14" },
};

export type VslVideo =
  | { src: string; poster: string; captions?: string }
  | { embed: string; poster: string };

/**
 * Pieza 3 del funnel: el VSL, debajo del titular (lección 6). Mientras `video`
 * sea null la sección no se pinta y la página queda como hoy. Para montarlo:
 *
 *  - vídeo propio (recomendado, sin terceros):
 *    `{ src: "/brand/video/vsl.mp4", poster: "/brand/video/vsl-portada.jpg", captions: "/brand/video/vsl.vtt" }`
 *  - Loom o YouTube:
 *    `{ embed: "https://www.loom.com/embed/XXXX", poster: "/brand/video/vsl-portada.jpg" }`
 *    (la CSP de vercel.json ya admite www.loom.com y www.youtube-nocookie.com)
 *
 * La portada es obligatoria: no se carga nada del vídeo hasta que alguien le da
 * al play, así no pesa en el primer pantallazo. El play se mide en el pixel
 * como evento VSLPlay, solo si se aceptaron las cookies. Cuando el vídeo
 * existe, el hero enseña además un enlace «Ver el video · 3 min».
 */
export const vsl = {
  video: null as VslVideo | null,
  title: "Dame tres minutos y te enseño cómo se contesta solo",
  lead: "De noche o un domingo, hasta dejar la visita técnica agendada. Funcionando, no en diapositivas.",
  play: "Ver el video",
  duration: "3 min",
};

/**
 * Las palabras del cliente final antes de la demo. Son las tres citas literales
 * de la investigación del avatar; no son clientes nuestros y no se presentan
 * como tales. Después, por qué pasa: no es desinterés, es que el dueño vende,
 * cotiza, instala y hace el trámite, y cada respuesta depende de que esté libre.
 */
export const voices = {
  title: "Así hablan de las empresas solares los que les escriben",
  source: "Reseñas y llamadas a instaladoras de Medellín",
  quotes: [
    "Te dejan en visto.",
    "Tardan horas en contestar, después más horas para cotizar.",
    "Como que no les interesa vender.",
  ],
  why: {
    title: "No es que no te interese vender",
    body: "Es que vendes, cotizas, instalas y haces el trámite ante EPM. Cotizar a mano te toma 30 o 40 minutos por cliente, y cada respuesta depende de que tú estés libre. Y te escriben a las diez de la noche o un sábado, cuando ya cerraste, muchas veces desde un anuncio que tú pagaste.",
  },
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
  lead: "Tres minutos de un domingo por la noche. No contestó nadie de tu equipo: contestó el agente, con tu catálogo de kits y tus precios en pesos.",
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
  body: "Cada conversación, en qué estado va, qué kit se recomendó y si la visita quedó agendada. Puedes tomar cualquier hilo cuando quieras: es tu WhatsApp de siempre y el agente se calla ahí mismo.",
  note: "El panel del enlace es real y está abierto. Míralo antes de hablar conmigo.",
  image: { src: "/brand/fotos/panel-ejemplo.jpg", w: 1240, h: 779 },
};

/**
 * Los cuatro que escriben. Llegan a horas distintas, y ninguna te conviene.
 *
 * Sus horas van después de las 08:21 de la pila a propósito: el raíl mide un
 * día que corre hacia delante y no puede retroceder en ningún punto. Esta
 * sección es el goteo del resto de la jornada.
 *
 * Cada uno con lo que de verdad pregunta quien quiere paneles: la factura, el
 * techo, cuándo instalas. Antes eran cuatro perfiles de manual que valían para
 * cualquier negocio.
 */
export const arrivals = {
  title: "A tu WhatsApp no le escribe un solo tipo de persona",
  lead: "Le escriben cuatro, y cada uno se pierde de una forma distinta cuando nadie contesta.",
  people: [
    {
      at: "09:10",
      label: "Ya decidió",
      body: "Ya comparó, tiene la plata y solo quiere saber para cuándo le instalas. Si tardas un día, firma con otra empresa.",
    },
    {
      at: "12:45",
      label: "Está cotizando con tres",
      body: "Mandó la misma factura a tres instaladoras. Gana la que le contesta primero con un kit y un precio, no la más barata.",
    },
    {
      at: "16:30",
      label: "Vio tu anuncio",
      body: "Le interesó, pero no sabe cuánto consume ni si su techo sirve. Alguien tiene que preguntárselo antes de que se le pase.",
    },
    {
      at: "21:30",
      label: "Apenas está entendiendo",
      body: "Pregunta si con una factura de 180 mil le sirve o si hay que cambiar el techo. Son preguntas básicas que merecen respuesta, y hoy esperan hasta mañana.",
    },
  ],
};

/** Las cuatro funciones. Es lo que hace, en el orden en que lo hace. */
export const agent = {
  title: "Qué hace mientras tú estás en un tejado",
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
      body: "Cuánto le llega de luz, si los paneles irían en techo o en patio, si es casa o negocio. Las tres que tú harías si estuvieras mirando el celular.",
      metric: { value: "3", label: "datos que califican" },
    },
    {
      at: "08:18",
      title: "Recomienda el kit",
      body: "Paneles, inversor y baterías de tu catálogo, con tus precios en pesos. Nada de cifras aproximadas ni de productos que no vendes.",
      metric: { value: "100 %", label: "de tu catálogo" },
    },
    {
      at: "08:21",
      title: "Agenda la visita técnica",
      body: "Te deja la cita puesta con la factura, el techo y el kit anotados, para que el técnico llegue sabiendo a qué va.",
      metric: { value: "1", label: "visita con ficha" },
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
  lead: "Desde que me pasas tu número y tu catálogo de kits hasta que está respondiendo.",
  days: [
    {
      n: "Día 1",
      title: "Me pasas lo tuyo",
      body: "Cuatro cosas que ya tienes y ninguna es técnica: el número de WhatsApp que usas con tus clientes, tu catálogo con los precios en pesos, las cantidades por kit (paneles, inversor, baterías) y qué se puede combinar con qué.",
    },
    {
      n: "Día 3",
      title: "Ya responde y lo pruebas",
      body: "El agente contesta con tus kits reales. Le escribes tú como si fueras un cliente, ves cómo responde y me pides los cambios.",
    },
    {
      n: "Día 7",
      title: "Queda instalado",
      body: "Funcionando en tu número. No instalas nada, no aprendes ningún programa y no cambias de herramienta.",
    },
  ],
};

/**
 * Los tres criterios son los de la ficha de cualificación de la oferta
 * (volumen, ya invierte, decide solo), dichos con lo que ve una instaladora.
 */
export const fit = {
  title: "Esto no le sirve a todo el mundo",
  yes: {
    title: "Trabajo contigo si",
    items: [
      "Te escriben más de quince personas al día preguntando por paneles, y hoy las contestas tú entre instalaciones",
      "Ya inviertes en que te escriban (anuncios, Instagram, referidos) y quieres que no se pierdan",
      "Eres el dueño o socio y decides sin pasar por un comité",
    ],
  },
  no: {
    title: "No te sirve si",
    items: [
      "Vendes solo proyectos grandes o licitaciones y el WhatsApp no es tu canal de venta",
      "Prefieres cotizar cada caso a mano y revisar cada mensaje",
      "Quieres probarlo con datos inventados en vez de tu catálogo de kits",
    ],
  },
};

export const faqTitle = "Lo que siempre me preguntan";

/**
 * Ocho. Las tres acordadas se quedan (precio, permanencia, no improvisar) y
 * entran dos que hace una instaladora y no cualquier negocio: cómo sabe qué
 * kit recomendar y si sirve para clientes comerciales. Se quitaron en su día
 * tres que la página ya respondía con las mismas palabras.
 */
export const faqs = [
  {
    q: "¿Tengo que cambiar de número de WhatsApp?",
    a: "No. El agente trabaja sobre el número que ya usas con tus clientes.",
  },
  {
    q: "¿Cómo sabe cuántos paneles recomendar?",
    a: "Con la regla que tú le des: factura de luz, techo o patio, casa o negocio, y tu tabla de kits. Si el caso se sale de la tabla, no adivina: deja la visita técnica agendada y te lo pasa a ti.",
  },
  {
    q: "¿Y si le preguntan algo que no está en mi catálogo?",
    a: "No improvisa. Cuando la pregunta se sale de lo que tú le diste, lo deja anotado y te avisa.",
  },
  {
    q: "¿Sirve si también le vendo a negocios y no solo a casas?",
    a: "Sí. Una de las tres preguntas es justo si es casa o negocio, y recomienda con la parte de tu catálogo que toque.",
  },
  {
    q: "¿Puedo tomar yo una conversación cuando quiera?",
    a: "Sí, en cualquier momento. Entras al hilo y el agente deja de responder ahí.",
  },
  {
    q: "¿Y si cambio mis precios o mis kits?",
    a: "Se actualizan. No están escritos a fuego: cuando cambien, me los pasas y responde con los nuevos.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende de cuántos kits y combinaciones tenga tu catálogo, porque eso es lo que marca el trabajo de montarlo. Lo vemos en la llamada, sobre tu catálogo real y sin compromiso.",
  },
  {
    q: "¿Hay permanencia?",
    a: "No. Puedes parar cuando quieras. No tiene sentido atarte a algo que debería sostenerse solo por las visitas que te trae cada mes.",
  },
];

export const closing = {
  title: "Mañana a las 22:14 vuelve a pasar",
  body: "Alguien va a preguntar cuánto le sale un sistema para su casa, y la diferencia es quién contesta. Cuéntame cómo cotizas hoy y en treinta minutos te digo si esto te sirve, con tu catálogo de kits delante.",
};

/**
 * El funnel de los anuncios, que es la propia home. Las seis piezas, en orden:
 * llamada al nicho, titular de resultado, VSL, demo, formulario y calendario.
 * El titular tiene que coincidir palabra por palabra con el del anuncio.
 *
 * Sin preguntas de filtro por ahora: los datos de contacto se piden en el
 * propio Calendly. Las dos preguntas de filtro están escritas en el cuaderno y
 * se activan en Calendly cuando sobren reservas de mala calidad.
 */
export const funnelCopy = {
  // La misma primera línea que el texto del anuncio.
  niche: "Empresas de paneles solares en Medellín",
  nicheNote: "Si la empresa es tuya y el WhatsApp lo contestas tú entre instalaciones, esto es para ti.",
  ctaNote: "Sin compromiso. Si veo que no le sirve a tu empresa, te lo digo en esa misma llamada.",
  about: {
    title: "Con quién vas a hablar",
    name: "Alejandro Piedrahita",
    place: "Medellín",
    body: "Construyo e instalo el agente yo mismo y solo trabajo con empresas de paneles solares. En la llamada estoy yo: no hay vendedor ni equipo de cuentas en el medio.",
    // Prueba social: va aquí el primer caso real, con nombre y permiso.
    // Hasta que exista, se dice tal cual. No se inventa.
    honest:
      "Todavía no tengo casos con nombre y cifras para enseñarte. Lo que sí tengo es el agente construido y funcionando: en la llamada lo vemos con tu catálogo delante.",
    photo: { src: "/brand/fotos/alejandro.jpg", w: 640, h: 640 },
    // El botón de mitad de página: después de la prueba, como en la landing de
    // ejemplo del programa. Lleva a la misma agenda que todos los demás.
    ctaNote: "Treinta minutos, gratis. Sales sabiendo si esto te sirve o no.",
  },
  /**
   * Responde a «¿qué es esto exactamente?» con la oferta del cuaderno (Worksheet
   * de oferta): piloto acotado, siete días hábiles y la garantía de los 15 días.
   * Sin precio, que se ve en la llamada.
   */
  pilot: {
    title: "Se empieza por un piloto",
    lead: "Nadie firma un proyecto grande con alguien a quien acaba de conocer. Yo tampoco lo haría.",
    items: [
      {
        title: "En tu WhatsApp de siempre",
        body: "Con tu número, tu catálogo y tus precios. No cambias de herramienta ni de número.",
      },
      {
        title: "Funcionando en siete días hábiles",
        body: "Lo pruebas tú antes de que le responda a tus clientes, y me pides los cambios.",
      },
      {
        title: "Con garantía",
        body: "Si en 15 días el agente no te ha agendado al menos una visita técnica, te devuelvo el dinero.",
      },
      {
        title: "Y si no encaja, se queda ahí",
        body: "Sin permanencia. Ves funcionando lo que contrataste antes de hablar de nada más grande.",
      },
    ],
  },
  agenda: {
    title: closing.title,
    body: "Alguien va a preguntar cuánto le sale un sistema para su casa, y la diferencia es quién contesta. Elige día y hora y en treinta minutos te digo si esto te sirve, con tu catálogo de kits delante. No tienes que preparar nada.",
    privacyNote: "Tus datos se usan solo para esta llamada.",
  },
  bar: { title: "Llamada gratis de 30 minutos", note: "Sin compromiso" },
  legal:
    "La conversación de esta página es una recreación con datos ficticios. La foto de perfil del cliente es de banco de imágenes y no corresponde a esa persona.",
};
