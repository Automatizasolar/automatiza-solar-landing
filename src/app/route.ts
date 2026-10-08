import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * La home es el funnel de los anuncios, hecho como la landing de ejemplo de la
 * lección 5 de AIlink Élite: un solo HTML con sus estilos y su JS, en
 * `src/funnel/index.html`. Se sirve tal cual y se genera al compilar, así que
 * en Vercel es un archivo estático más.
 *
 * Desde el 8 de octubre de 2026 sustituye a la home de componentes (la del raíl
 * de horas): `src/app/page.tsx` se retiró y sus componentes siguen en
 * `src/components` por si hubiera que volver a ella. /privacidad sigue igual.
 */
export const dynamic = "force-static";

export async function GET() {
  const html = await readFile(join(process.cwd(), "src/funnel/index.html"), "utf8");
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
