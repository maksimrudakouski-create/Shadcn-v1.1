// src/flows/_ready/ReadyView.tsx
//
// The ONLY screen created at init. A status screen, not product UI.
//
// It lives in /flows (DESIGNER-owned) on purpose: your first real prompt
// replaces it, and Design Mode must be able to do that without tripping the
// scope guard. It's registered as the "/" route in src/flows/routes.tsx —
// delete both when you add your first flow. /app is never involved.
//
// Built purely from shadcn components and semantic tokens, so it is also live
// proof that the whole setup works: no style prop, no literal colours, no raw
// palette utilities. If this screen renders, the guardrails are not fighting
// the library.
//
// ── This file is also the worked example of the screen contract ──────────
//
// Note the signature: data comes in as a PROP with a mock DEFAULT.
//
//   export default function ReadyView({ items = setupChecklist }: Props)
//
// That is the pattern every screen in /flows must follow, and it is what makes
// the seam hold. TanStack renders route components with no props, so the
// default supplies the mock in Design Mode; at integration Dev wraps the screen
// in a controller that passes real data, and THE SCREEN FILE DOES NOT CHANGE.
// Hardcode the array inside the component instead and that promise breaks —
// the designer stops owning the screen the moment real data arrives.
// scripts/check-props.mjs enforces this.
//
// Headings and body copy come from shared/ui/typography so the type scale is
// defined in one place. Raw <h1>/<p> stay legal for prose — see AGENTS.md §2.

import { CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading, Text } from "@/shared/ui/typography";

const setupChecklist: string[] = [
  "Vite + React + TypeScript + Tailwind v4",
  "shadcn/ui (radix-ui 1.6.7) + lucide-react (Tailwind CSS 4.3.3)",
  "Theme via CSS custom properties (/src/theme/theme.css)",
  "Light/dark via ThemeProvider (/src/theme/ThemeProvider.tsx)",
  "Domain-Driven folder structure (/app, /flows, /features, /shared/ui)",
  "Navigable user-flows on mock data (/flows, route-group folders)",
  "Router bridge in /app — reads /flows/routes.tsx generically (designers never touch /app)",
  "DevBar — dev-only nav panel (jump to any screen, dev builds only)",
  "Modern state & API stack (Zustand, React Query, Zod, Router)",
  "Storybook + Theme Showcase + Flow Map (running alongside the app)",
  "ESLint guardrails (component-over-raw-element, tokens-not-palette, no logic in presentation)",
  "Husky + lint-staged (pre-commit scope, props and param checks)",
  "Scope-guard PR check via GitHub Actions (scope-guard.yml)",
  ".workflow-mode = designer",
];

type Props = {
  /** Mock default so the screen renders standalone. Dev overrides it later. */
  items?: string[];
};

export default function ReadyView({ items = setupChecklist }: Props) {
  return (
    <div className="flex min-h-svh justify-center bg-background px-4 py-10">
      <Card className="w-full max-w-2xl">
        <CardHeader className="items-center gap-3 text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="size-6 text-primary" />
          </div>
          <Heading level={1}>We&rsquo;re ready to start</Heading>
          <Text variant="muted">
            Design Mode is active. Describe a screen and it&rsquo;ll be built with shadcn/ui &mdash;
            UI only, no logic.
          </Text>
          <Badge variant="secondary" className="mx-auto font-mono">
            mode: designer
          </Badge>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <Text variant="muted" className="mb-4 font-medium">
            Set up in this project:
          </Text>
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
