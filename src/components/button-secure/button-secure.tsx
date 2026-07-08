import { twMerge } from "tailwind-merge";

import Link from "next/link";

import type { ButtonSecureProps } from "./types";
import { Button } from "../button/button";

export function ButtonSecure({
  text,
  pathname = "/",
  onClick,
  className,
  ...props
}: ButtonSecureProps) {
  return (
    <div className={twMerge("flex flex-col items-center gap-4", className)}>
      <Button asChild size="base" {...props}>
        <Link href={pathname} target="_blank" onClick={onClick}>
          {text}
        </Link>
      </Button>

      <span className="max-w-lg text-center text-xs text-neutral-400">
        Treinamento desenvolvido por André Costa — cofundador de uma das maiores
        empresas do setor farmacêutico brasileiro, com formação executiva pela
        FGV, IBMEC e Columbia University (NY).
      </span>
    </div>
  );
}
