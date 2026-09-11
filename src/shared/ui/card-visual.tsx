import { CreditCard, Wifi } from "lucide-react";
import { cn } from "@/lib/utils";

type CardVisualData = {
  label: string;
  number: string;
  cardholder: string;
  expires: string;
  network: string;
  tone?: "primary" | "secondary";
};

type CardVisualProps = {
  card: CardVisualData;
  compact?: boolean;
  className?: string;
};

export function CardVisual({ card, compact = false, className }: CardVisualProps) {
  const isPrimary = card.tone !== "secondary";

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl p-5 shadow-sm",
        isPrimary ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground",
        compact ? "min-h-44" : "min-h-56",
        className
      )}
    >
      <div className="absolute -right-7 -bottom-12 size-44 rounded-full border border-current opacity-15" />
      <div className="absolute right-10 -bottom-16 size-40 rounded-full border border-current opacity-10" />
      <div className="relative flex h-full flex-col justify-between gap-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-medium">{card.label}</p>
            <p className="mt-1 text-xs opacity-70">Everyday account</p>
          </div>
          <Wifi className="size-5 rotate-90 opacity-80" aria-label="Contactless payments" />
        </div>
        <div>
          <div className="mb-5 flex size-9 items-center justify-center rounded-md border border-current/25 bg-current/10">
            <CreditCard className="size-5" aria-hidden="true" />
          </div>
          <p className="font-mono text-lg tracking-[0.18em] sm:text-xl">{card.number}</p>
          <div className="mt-4 flex items-end justify-between gap-4 text-[10px] tracking-wide uppercase">
            <div><span className="block opacity-65">Cardholder</span><span className="mt-1 block text-xs font-medium tracking-normal">{card.cardholder}</span></div>
            <div><span className="block opacity-65">Expires</span><span className="mt-1 block text-xs font-medium tracking-normal">{card.expires}</span></div>
            <span className="text-sm font-semibold italic tracking-tight">{card.network}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
