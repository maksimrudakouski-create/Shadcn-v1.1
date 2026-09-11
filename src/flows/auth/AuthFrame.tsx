import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Heading, Text } from "@/shared/ui/typography";

type Props = {
  title: string;
  description: string;
  children: ReactNode;
  backTo?: string;
  backLabel?: string;
};

export default function AuthFrame({
  title,
  description,
  children,
  backTo,
  backLabel = "Back to sign in",
}: Props) {
  return (
    <main className="min-h-svh bg-muted/40 px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-md">
        <div className="mb-8 flex items-center justify-center gap-2 text-foreground">
          <span className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Northstar</span>
        </div>

        <section className="rounded-2xl border bg-card p-6 shadow-sm sm:p-8" aria-labelledby="auth-title">
          {backTo ? (
            <Button variant="link" size="sm" className="-ml-2 mb-4" asChild>
              <Link to={backTo}>← {backLabel}</Link>
            </Button>
          ) : null}
          <div className="mb-6 space-y-2">
            <Heading id="auth-title" level={1} className="text-2xl">
              {title}
            </Heading>
            <Text variant="muted">{description}</Text>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}
