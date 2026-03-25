import Link from "next/link";

import type { ButtonSecureProps } from "./types";
import { Button } from "../button/button";

export function ButtonSecure({
  text,
  pathname = "/",
  ...props
}: ButtonSecureProps) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <Button asChild size="base" {...props}>
        <Link href={pathname} target="_blank">
          {text}
        </Link>
      </Button>

      <span className="text-xs text-neutral-400">
        🔒 Acesso imediato · Pagamento 100% seguro
      </span>
    </div>
  );
}
