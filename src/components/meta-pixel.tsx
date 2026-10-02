"use client";

import { useEffect } from "react";
import { loadPixel, META_PIXEL_ID } from "@/lib/pixel";

/**
 * Carga el pixel de Meta en cuanto la página se abre. El <noscript> es el del
 * código oficial: cuenta la visita aunque el navegador no ejecute JavaScript.
 */
export function MetaPixel() {
  useEffect(() => {
    loadPixel();
  }, []);

  return (
    <noscript>
      {/* eslint-disable-next-line @next/next/no-img-element -- píxel de seguimiento de 1×1, no una imagen */}
      <img
        height="1"
        width="1"
        style={{ display: "none" }}
        alt=""
        src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
      />
    </noscript>
  );
}
