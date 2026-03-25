import type { ButtonSecureProps } from "./types";
import { Button } from "../button/button";

export function ButtonSecure({ text }: ButtonSecureProps) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <Button size="base">{text}</Button>

      <span className="text-xs text-neutral-400">
        🔒 Acesso imediato · Pagamento 100% seguro
      </span>
    </div>
  );
}
