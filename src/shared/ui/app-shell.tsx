import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeftRight, Bell, CreditCard, House, ShieldCheck, UserRound, Wallet } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Props = {
  children: ReactNode;
};

const navItems = [
  { to: "/home", label: "Home", icon: House },
  { to: "/transactions", label: "Transactions", icon: ArrowLeftRight },
  { to: "/cards", label: "Cards", icon: CreditCard },
  { to: "/wallet", label: "Wallet", icon: Wallet },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: UserRound },
];

export function AppShell({ children }: Props) {
  return (
    <main className="min-h-svh bg-muted/40">
      <header className="sticky top-(--devbar-height) z-40 border-b bg-background/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/home" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"><ShieldCheck className="size-4" aria-hidden="true" /></span>
            Northstar
          </Link>
          <nav className="flex items-center gap-1" aria-label="Primary navigation">
            {navItems.map(({ to, label, icon: Icon }) => (
              <Button key={to} variant="ghost" size="sm" asChild>
                <Link to={to}>
                  <Icon aria-hidden="true" /> <span className="hidden sm:inline">{label}</span>
                  {to === "/notifications" ? <Badge className="ml-1 hidden size-4 justify-center rounded-full p-0 text-[10px] sm:flex">1</Badge> : null}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
      </header>
      {children}
    </main>
  );
}
