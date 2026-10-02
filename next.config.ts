import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // El indicador de desarrollo se sienta justo encima del reloj móvil de la
  // esquina inferior izquierda. Proyecto local: estorba más de lo que aporta.
  devIndicators: false,
  // El funnel vivió unas horas en /llamada antes de pasar a la home.
  async redirects() {
    return [{ source: "/llamada", destination: "/", permanent: true }];
  },
};

export default nextConfig;
