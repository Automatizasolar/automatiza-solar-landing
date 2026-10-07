import { FunnelHeader } from "@/components/funnel-header";
import { FunnelFooter } from "@/components/funnel-footer";
import { HourRail } from "@/components/hour-rail";
import { Hero } from "@/components/hero";
import { Vsl } from "@/components/vsl";
import { Voices } from "@/components/voices";
import { Conversation } from "@/components/conversation";
import { Panel } from "@/components/panel";
import { AgentStack } from "@/components/agent-stack";
import { Arrivals } from "@/components/arrivals";
import { SevenDays } from "@/components/seven-days";
import { Fit } from "@/components/fit";
import { About } from "@/components/about";
import { Pilot } from "@/components/pilot";
import { Faq } from "@/components/faq";
import { Agenda } from "@/components/agenda";
import { BookBar } from "@/components/book-bar";

/**
 * La web es el funnel de los anuncios: sin menú ni salidas. Las seis piezas,
 * en orden: llamada al nicho y titular (hero), VSL (se enciende rellenando
 * `vsl.video` en content.ts), las palabras del cliente final, demo (la
 * conversación y el panel), y el formulario con el calendario al final
 * (agenda). Lo de en medio responde las preguntas con las que llega el dueño.
 */
export default function Page() {
  return (
    <>
      <span id="top" />
      <FunnelHeader />
      <HourRail mobileClock={false} />

      <main>
        <Hero funnel />
        <Vsl />
        <Voices />
        <Conversation />
        <Panel link={false} />
        <AgentStack />
        <Arrivals />
        <SevenDays />
        <Fit />
        <About />
        <Pilot />
        <Faq />
        <Agenda />
      </main>

      <FunnelFooter />
      <BookBar />
    </>
  );
}
