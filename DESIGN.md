# Design

Mundo visual **"La hora"**. Escrito desde lo construido, no antes de construirlo.

## La idea que sostiene todo

El antagonista del producto es el reloj, no la competencia: la competencia solo aparece
porque el reloj pasó. La página es **una jornada de guardia medida hora a hora**, de domingo
22:14 a lunes 22:14, y el scroll es el paso del tiempo. Todo lo demás se deriva de ahí.

Si una decisión no se puede justificar contra esa frase, no entra.

## Tema

**Un solo tema, claro.** Ninguna sección se invierte. No hay modo oscuro ni conmutador.

La página es **el parte de una jornada impreso en papel**: tinta navy de la marca sobre
papel, el raíl de horas grabado al margen y un único verde. Empezó siendo un campo nocturno
y se cambió a petición: sobre negro, el verde y el navy se fundían en una misma masa oscura y
el acento no se distinguía. Sobre papel se separan solos.

## Color

| Token | Valor | Uso | Medida |
|---|---|---|---|
| `--color-ground` | `#fafaf9` | Papel. Fondo de toda la página | — |
| `--color-raised` | `#ffffff` | Superficie elevada. **En claro, elevar es aclarar** | — |
| `--color-raised-2` | `#f1f3f2` | Burbujas del cliente en el hilo | — |
| `--color-rule` | `#dfe3e1` | Filete de 1px, espina y marcas del raíl | — |
| `--color-rule-soft` | `#eceeec` | Separadores internos | — |
| `--color-ink` | `#0a1e33` | Texto principal. Es el navy de la marca haciendo de negro | **16,1:1** sobre `ground` |
| `--color-ink-muted` | `#4e5c6a` | Párrafos y secundarios | **6,6:1** sobre `ground` |
| `--color-ink-faint` | `#647282` | Sellos de hora inactivos, nota legal | **4,7:1**, pasa AA |
| `--color-solar` | `#0f7355` | Acento único | **5,6:1** sobre `ground` |
| `--color-solar-deep` | `#0b6a4e` | Solo el hover de la acción principal | **6,3:1** |

**Ley del acento.** El verde no decora. Está reservado a tres cosas: el marcador de la hora
viva en el raíl, el eje que se dibuja, y la acción principal. Nada más lo usa. Cuando hubo
tentación de teñir cuatro puntos de un listado, se dejaron en `--color-rule` y solo se
iluminó el eje que los recorre.

**Sobre verde sólido la tinta es blanca** (5,8:1). Es lo contrario que en la versión oscura,
donde el verde era claro y la tinta oscura. Medido, no elegido a ojo.

**El verde de marca no se pudo usar tal cual.** `#17A07A` sobre papel da **3,2:1** y es
ilegible; incluso `#138363` se queda en 4,5:1 justo. Hubo que bajarlo a `#0f7355`, que
mantiene el tono de la marca y sostiene texto en los dos sentidos. En un tema claro el acento
tiene que oscurecerse, no aclararse.

No hay segundo acento. No hay degradados de color: los degradados que existen son velos del
propio `ground` sobre fotografía.

## Tipografía

- **Archivo** (variable, eje `wdth`) para todo el discurso. Es la tipografía heredada de la
  marca y se respeta.
- **JetBrains Mono** solo donde hay **medida**: horas, minutos de respuesta, cantidades,
  número de teléfono. Nunca como disfraz de "técnico".
- Cifras siempre tabulares (`.tnum`), para que las horas no bailen al cambiar.

Escala de display: `clamp(2.05rem, 5vw, 4.15rem)` en el titular; `clamp(2rem, 4.2vw, 3.4rem)`
en los títulos de sección. Tracking `-0.033em` en display, nunca por debajo de `-0.04em`.
Interlineado `1.03` a `1.06` en display, `1.55` a `1.65` en párrafo. Medida de lectura entre
`42ch` y `58ch`.

**Sin antetítulos.** Ni uno. El titular se sostiene solo. Las horas viven en el raíl, que es
estructura, no etiqueta encima de un encabezado.

## Forma y elevación

- **Radio:** `14px` en superficies, pill en controles pequeños. Sin excepciones.
- **Elevación declarada una sola vez:** borde de `1px`. No hay sombras difusas en toda la
  página. Nada de borde fino más sombra ancha.
- Las tarjetas aparecen en un solo sitio (la pila de las cuatro funciones), donde la
  superposición es el argumento. El resto se agrupa con filetes y aire.

## El orden del día

El scroll es el paso del tiempo, así que **el reloj no retrocede en ningún punto**.
Es la regla que ordena las secciones, no al revés:

`22:14` portada · `22:17` conversación · `07:40` panel · `08:15` las cuatro funciones ·
`09:10` los cuatro que escriben · `Día 1` los siete días · `18:20` para quién ·
`20:50` preguntas · `22:14` cierre.

Dos consecuencias que no son casuales:

- **El panel va justo detrás de la conversación, a las 07:40.** Es la segunda demo, y
  encaja solo: el remate de la conversación dice «te enteraste el lunes a las 7:40» y el
  titular del panel empieza con una «Y» que únicamente conecta si está ahí.
- **Los cuatro que escriben se re-dataron a 09:10, 12:45, 16:30 y 21:30.** Antes
  empezaban a las 06:41, y al subir el panel el raíl habría ido de 07:40 a 06:41, hacia
  atrás. Esa sección es el goteo del resto de la jornada, no el amanecer.

El hueco largo del raíl entre las 22:17 y las 07:40 son nueve horas de noche en las que
nadie contestó. No es un accidente de maquetación: es la tesis dibujada.

## El raíl de horas

La pieza firma. Columna fija de `104px` a partir de `1024px`; por debajo se reduce a una
píldora con la hora en la esquina inferior izquierda.

Es un **graticulado medido**: cada división se coloca en la fracción de scroll donde de
verdad empieza su sección, así que la distancia entre dos marcas dice cuánto dura ese tramo.
No es decoración con horas inventadas.

- La marca activa se alarga y se enciende.
- El punto verde recorre el raíl con el progreso real de la página, escribiendo su
  `transform` directamente sobre el nodo, sin pasar por el estado de React.
- **El eje cambia de unidad una sola vez**, en los siete días hábiles: la marca se alarga
  para anunciar que ya no se miden horas sino días.
- Secciones fijadas por GSAP: se mide el `pin-spacer`, no el elemento, porque al fijarse
  pasa a `position: fixed` y su `offsetTop` se vuelve 0.

## Fotografía

Campo plano constante; la foto se mueve dentro de él. **Recortes duros y descentrados**,
nunca a sangre con un velo encima y texto flotando.

- **Toda foto es una placa con borde de 1px y radio 14px.** Nada de imágenes difuminadas
  contra el fondo: sobre papel, fundir una foto con un degradado del color del papel no la
  disuelve, la emborrona. Se probó en el hero y hubo que deshacerlo.
- **En ningún punto hay texto sobre una foto sin que el velo lo deje prácticamente en papel
  sólido.** En el hero directamente no hay texto sobre foto: la placa vive en la esquina
  inferior derecha, por debajo de la banda del titular y despejada de los botones a cualquier
  ancho. Está medido, no supuesto.
- Las fotos entran casi sin filtros. En un mundo de papel, apagarlas las ensuciaría. Lo único
  que se aplica es un `saturate(.92)` en la portada para que el cielo no grite.
- **Ninguna foto va de fondo bajo un texto.** Sobre papel, una imagen al dieciséis por ciento
  no es sutil, es sucia. La de «Lo único que necesito de ti» pasó de fondo lavado a placa
  lateral por esto.
- En la sección del panel va **una captura real del panel**, no una foto de archivo.

### Criterios al elegir fotografía

Se descartaron varias fotos técnicamente mejores por estas tres reglas, y conviene mantenerlas:

1. **Sin marcas de otras empresas.** Dos retratos editoriales excelentes se cayeron porque el
   chaleco y el casco llevaban el logotipo de otra instaladora.
2. **Tejado residencial o vivienda pequeña.** Nada de huertos solares de campo ni cubiertas
   industriales: se venden kits para casas y negocios pequeños.
3. **Que la foto argumente el texto que acompaña.** La de la portada no está porque quede
   bien: el instalador tiene las dos manos ocupadas, que es exactamente por lo que no está
   contestando el WhatsApp. La banda del agente es un par de manos atornillando, bajo el
   titular «mientras tú estás en una instalación».

## Movimiento

Una intención por sección, no el mismo efecto repetido nueve veces. Cada animación responde a
una frase:

| Sección | Movimiento | Por qué |
|---|---|---|
| Hero | Líneas que suben bajo su máscara, placa con paralaje | Entrada única de la página |
| Conversación | Fijada, raspada: los mensajes se escriben y el reloj avanza | El paso del tiempo **es** el argumento |
| Cuatro funciones | Pila fija: la anterior se encoge, se apaga y se desenfoca | Ocurren en la misma conversación, no en cuatro momentos |
| Los cuatro que escriben | Paneo horizontal fijado | El eje horizontal es el eje del día |
| Siete días | El eje se dibuja con el scroll | Hace visible el cambio de escala |
| Resto | Revelado escalonado, uno solo para toda la página | Ritmo, sin protagonismo |

### Presupuesto de movimiento

La página llegó a medir 18,2 pantallas y el cliente la vio larga. La mitad de esa
longitud era movimiento, no contenido. Los valores de ahora están calculados, no
elegidos a ojo, y **no deben subirse**:

- **Conversación, `end: "+=1900"`.** La unidad no son píxeles por sección sino píxeles
  por mensaje: hay nueve tiempos, así que tocan 211 px cada uno. Por debajo de ~180 los
  mensajes aparecen de dos en dos y se rompe la ilusión de que se escriben en vivo; por
  encima de ~300 el lector gira la rueda con la pantalla quieta y eso se siente como un
  secuestro. El escalonado va a `i * 0.45` con `duration: 0.55`, es decir con solape:
  los WhatsApp de verdad se pisan.
- **Pila, `lg:min-h-[58dvh]`.** El contenido de cada tarjeta mide ~449 px; a 522 quedan
  73 px de holgura, el mínimo para que siga leyéndose como tarjeta flotando y no como
  caja llena. Por debajo de 56dvh el efecto muere. Y **se lee mejor corta**: el
  desenfoque de la que sale corre siempre sobre un viewport completo, mida lo que mida
  la tarjeta, así que con tarjetas de 522 px la siguiente entra mientras la anterior aún
  está en su sitio y el solape se ve de verdad.
- **Paneo, tarjetas de `min(34vw,440px)`.** Recorrido de ~400 px. La sección ya no fuerza
  `100dvh`: la altura la da el contenido.

Reglas de ejecución:

- Curvas propias: `expo.out` para entradas; las nativas no tienen fuerza.
- Solo `transform`, `opacity`, `filter` y `mask`. Nunca `top`, `left`, `width` ni `height`.
- **Nada de `window.addEventListener("scroll")`.** Lenis conduce y GSAP lee desde su ticker.
- El paneo y la pila **solo se fijan a partir de 1024px**. Secuestrar el scroll en un móvil
  es hostil, y una sección pensada para estar fijada deja pantallas vacías cuando no lo está.
- Un solo `ScrollTrigger.batch` atiende a todos los `.reveal`.
- **Las tarjetas de la pila llevan z-index explícito y creciente.** Al fijar una tarjeta,
  GSAP la pone en `position: fixed`, y un elemento posicionado se pinta por encima del
  contenido que sigue en flujo normal. La última tarjeta es la única que nunca se fija, así
  que sin z-index se colaba por debajo de la anterior y los dos textos se leían encima del
  otro. No se toca.
- La que sale se retira hasta `opacity .28` con `blur(3px)`. Sobre papel una tarjeta blanca
  al 45% todavía se lee, y competía con la que entra.

### El gancho `data-motion`

El estado inicial oculto de los reveals cuelga de `body[data-motion="on"]`, y el atributo se
escribe **después** de crear el batch.

Dos decisiones que costaron un fallo cada una y no deben deshacerse:

1. **Va en `<body>` y como atributo**, no como clase en `<html>`. React es dueño del
   `className` de la raíz y lo reescribe al hidratar, borrando cualquier clase puesta a mano.
   Con la clase en `<html>` los reveals no animaban nunca.
2. **Se escribe al final, y no hay temporizador que lo retire.** Ese orden es la red de
   seguridad: si algo fallara antes, el atributo no llega a escribirse, el CSS no esconde
   nada y la página se ve entera. Un temporizador que lo quitara a los pocos segundos apagaba
   los reveals para cualquiera que siguiera en la página, que es todo el mundo.

### Movimiento reducido

`prefers-reduced-motion` no es opcional en una página que se lee scrolleando. Verificado: sin
fijados, sin Lenis, **34 elementos animados y ninguno invisible**. La página se queda quieta
y completa.

## Superficies del navegador

Se visten desde la paleta, no se dejan por defecto: selección de texto, cursor de escritura,
`accent-color`, anillo de foco (2px verde con 3px de separación) y barra de scroll.

## Responsive

- Un solo sitio fija los márgenes laterales y el ancho máximo (`Wrap`, `1180px`).
- `min-h-[100dvh]`, nunca `h-screen`.
- Rejillas con CSS Grid, jamás aritmética de porcentajes en flex.
- La conversación reordena por áreas de rejilla: en móvil el remate va **después** del hilo,
  que es su orden narrativo; en escritorio vuelve bajo el titular con el hilo al lado.
- El paneo horizontal tiene máscara de degradado en los bordes: las tarjetas entran y salen
  bajo el velo en vez de cortarse a mitad de palabra.

## Lo que este mundo rechaza

El arreglo por defecto de la categoría, la landing oscura con degradado violeta y un mockup
de móvil flotando con burbujas verdes. Y su opuesto previsible, la landing blanca de SaaS con
tres tarjetas iguales de icono más titular más párrafo.

En concreto, y por decisión, no hay: antetítulos, numeración de secciones decorativa,
paginación tipo `01/04`, texto en vertical rotado, indicaciones de "scroll", tiras decorativas
de tres palabras, píldoras encima de fotos, pies de foto inventados, puntos de color de
estado, texto con degradado, sombras de bloque, cristal como adorno, iconos dibujados a mano
ni una segunda marquesina. Los iconos vienen todos de Phosphor, con un solo peso.
