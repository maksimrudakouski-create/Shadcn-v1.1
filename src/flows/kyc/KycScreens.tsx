import { Link, useNavigate } from "@tanstack/react-router";
import { BadgeCheck, CircleAlert, Clock3, ExternalLink, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Heading, Text } from "@/shared/ui/typography";
import { type Profile, mockProfile } from "../_mocks/account";

type KycStartProps = { profile?: Profile };

export function KycStartScreen({ profile = mockProfile }: KycStartProps) {
  const navigate = useNavigate();

  return (
    <main className="min-h-svh bg-muted/40 px-4 py-10 sm:py-16">
      <section className="mx-auto w-full max-w-xl rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <Badge variant="secondary"><ShieldCheck aria-hidden="true" /> Secure verification</Badge>
        <div className="mt-5 space-y-2">
          <Heading level={1}>Verify your identity</Heading>
          <Text variant="lead">One short check lets us activate your Northstar account securely.</Text>
        </div>
        <Card className="mt-7" size="sm">
          <CardHeader>
            <CardTitle>What you&apos;ll need</CardTitle>
            <CardDescription>A government-issued ID and a camera-enabled device.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Take photos of your ID</li>
              <li>• Complete a quick face check</li>
              <li>• Review and submit your details</li>
            </ul>
          </CardContent>
        </Card>
        <Alert className="mt-5">
          <ShieldCheck aria-hidden="true" />
          <AlertTitle>Your information is protected</AlertTitle>
          <AlertDescription>Verification opens in the secure Sumsub identity-verification flow.</AlertDescription>
        </Alert>
        <Separator className="my-6" />
        <Text variant="small">You&apos;re verifying as {profile.name}.</Text>
        <Button className="mt-4 w-full" size="lg" onClick={() => navigate({ to: "/kyc-pending" })}>
          Start secure verification <ExternalLink aria-hidden="true" />
        </Button>
        <Button variant="link" className="mt-3 w-full" asChild><Link to="/">Save and finish later</Link></Button>
      </section>
    </main>
  );
}

export type KycStatus = "pending" | "approved" | "rejected";

type KycStatusProps = { status?: KycStatus; profile?: Profile };

const statusContent = {
  pending: {
    icon: Clock3,
    badge: "Verification in progress",
    title: "We're reviewing your identity",
    description: "This usually takes just a few minutes. We'll let you know as soon as your account is ready.",
  },
  approved: {
    icon: BadgeCheck,
    badge: "Identity verified",
    title: "Your account is ready",
    description: "Your verification was approved and we've created your Northstar account automatically.",
  },
  rejected: {
    icon: CircleAlert,
    badge: "Action needed",
    title: "We couldn't verify your identity",
    description: "Please review your ID details and try the verification again. Your account has not been activated yet.",
  },
} as const;

export function KycStatusScreen({ status = "pending", profile = mockProfile }: KycStatusProps) {
  const content = statusContent[status];
  const Icon = content.icon;

  return (
    <main className="min-h-svh bg-muted/40 px-4 py-10 sm:py-16">
      <section className="mx-auto w-full max-w-xl rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary"><Icon className="size-6" aria-hidden="true" /></div>
        <Badge variant={status === "rejected" ? "destructive" : "secondary"} className="mt-5">{content.badge}</Badge>
        <div className="mt-4 space-y-2">
          <Heading level={1}>{content.title}</Heading>
          <Text variant="lead">{content.description}</Text>
        </div>
        {status === "approved" ? (
          <Card className="mt-7" size="sm"><CardContent className="space-y-1"><Text variant="small">Account holder</Text><Text>{profile.name}</Text><Text variant="small">Your Everyday account is active and ready to use.</Text></CardContent></Card>
        ) : null}
        {status === "rejected" ? (
          <Alert variant="destructive" className="mt-7"><CircleAlert aria-hidden="true" /><AlertTitle>Before you retry</AlertTitle><AlertDescription>Use a valid, unexpired ID and make sure all four corners are visible.</AlertDescription></Alert>
        ) : null}
        <div className="mt-7 flex flex-col gap-3">
          {status === "pending" ? <Button size="lg" asChild><Link to="/kyc-approved">Check verification status</Link></Button> : null}
          {status === "approved" ? <Button size="lg" asChild><Link to="/home">Go to home</Link></Button> : null}
          {status === "rejected" ? <Button size="lg" asChild><Link to="/kyc">Retry verification</Link></Button> : null}
          {status !== "approved" ? <Button variant="outline" size="lg" asChild><Link to="/">Back to sign in</Link></Button> : null}
        </div>
      </section>
    </main>
  );
}

export function KycPendingScreen() { return <KycStatusScreen status="pending" />; }
export function KycApprovedScreen() { return <KycStatusScreen status="approved" />; }
export function KycRejectedScreen() { return <KycStatusScreen status="rejected" />; }
