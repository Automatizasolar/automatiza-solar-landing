import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PrivacyText } from "@/components/privacy";
import { Wrap } from "@/components/ui";

export const metadata: Metadata = {
  title: "Automatiza Solar | Política de tratamiento de datos",
  alternates: { canonical: "/privacidad" },
};

export default function Privacidad() {
  return (
    <main>
      <Wrap className="py-14 lg:py-20">
        <Link href="/" aria-label="Automatiza Solar, ir al inicio">
          <Image
            src="/brand/logo-horizontal.svg"
            alt="Automatiza Solar"
            width={720}
            height={170}
            className="h-6 w-auto"
          />
        </Link>
        <div className="mt-12 max-w-[46rem]">
          <PrivacyText headingLevel={1} />
        </div>
      </Wrap>
    </main>
  );
}
