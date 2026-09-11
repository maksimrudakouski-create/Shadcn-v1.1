import { ArrowDownLeft, ArrowUpRight, CreditCard, Gift, Landmark, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Text } from "@/shared/ui/typography";

type TransactionRowProps = {
  kind: "Funding" | "Payout" | "Transfer" | "Card purchase" | "Reward";
  title: string;
  description: string;
  amount: string;
  direction: "in" | "out";
  status: "Completed" | "Pending" | "Failed";
  date: string;
  compact?: boolean;
};

const icons = {
  Funding: ArrowDownLeft,
  Payout: ArrowUpRight,
  Transfer: Send,
  "Card purchase": CreditCard,
  Reward: Gift,
};

export function TransactionRow({ kind, title, description, amount, direction, status, date, compact = false }: TransactionRowProps) {
  const Icon = icons[kind] ?? Landmark;

  return (
    <div className={compact ? "flex items-center justify-between gap-4 p-4" : "flex items-center justify-between gap-4 p-4 sm:p-5"}>
      <div className="flex min-w-0 items-center gap-3">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted"><Icon className="size-4" aria-hidden="true" /></span>
        <div className="min-w-0">
          <Text className="truncate font-medium">{title}</Text>
          <Text variant="small" className="mt-0.5 truncate">{description} · {date}</Text>
        </div>
      </div>
      <div className="shrink-0 text-right">
        <Text as="span" className={direction === "in" ? "font-medium text-primary" : "font-medium"}>{amount}</Text>
        {compact ? <Text variant="small" className="mt-0.5">{status}</Text> : <Badge variant={status === "Completed" ? "secondary" : status === "Failed" ? "destructive" : "outline"} className="mt-1">{status}</Badge>}
      </div>
    </div>
  );
}
