import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  CircleAlert,
  KeyRound,
  Mail,
  Phone,
  Smartphone,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSeparator } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Heading, Text } from "@/shared/ui/typography";
import AuthFrame from "./AuthFrame";

type Profile = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const mockProfile: Profile = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "+1 (415) 555-0137",
  address: "225 Market Street, San Francisco, CA 94105",
};

function ContinueButton({ children = "Continue" }: { children?: string }) {
  return (
    <Button type="submit" size="lg" className="w-full">
      {children}
      <ArrowRight aria-hidden="true" />
    </Button>
  );
}

function IdentityField({
  id,
  label,
  type = "text",
  placeholder,
  defaultValue,
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  autoComplete?: string;
}) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        autoComplete={autoComplete}
        required
      />
    </Field>
  );
}

type SignInProps = { errorMessage?: string };

export function SignInScreen({ errorMessage }: SignInProps) {
  const navigate = useNavigate();

  return (
    <AuthFrame title="Welcome back" description="Sign in to continue to your account.">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate({ to: "/two-factor" });
        }}
      >
        <FieldGroup>
          {errorMessage ? (
            <Alert variant="destructive">
              <CircleAlert aria-hidden="true" />
              <AlertTitle>We couldn&apos;t sign you in</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          ) : null}
          <IdentityField
            id="email"
            label="Email or phone number"
            placeholder="you@example.com"
            autoComplete="username"
          />
          <Field>
            <div className="flex items-center justify-between gap-3">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Button variant="link" size="sm" className="h-auto px-0" asChild>
                <Link to="/forgot-password">Forgot password?</Link>
              </Button>
            </div>
            <Input id="password" name="password" type="password" autoComplete="current-password" required />
          </Field>
          <Field orientation="horizontal" className="items-center gap-3">
            <Checkbox id="remember-device" />
            <FieldLabel htmlFor="remember-device" className="font-normal">
              Remember this device for 30 days
            </FieldLabel>
          </Field>
          <ContinueButton>Sign in</ContinueButton>
        </FieldGroup>
      </form>

      <FieldSeparator className="my-6">New to Northstar?</FieldSeparator>
      <Button variant="outline" size="lg" className="w-full" asChild>
        <Link to="/sign-up">Create an account</Link>
      </Button>
    </AuthFrame>
  );
}

export function SignInErrorScreen() {
  return <SignInScreen errorMessage="Check your password and try again. Your account has not been changed." />;
}

export function SignUpScreen() {
  const navigate = useNavigate();

  return (
    <AuthFrame title="Create your account" description="A few details now, then we’ll verify your contact information." backTo="/">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate({ to: "/verify-email" });
        }}
      >
        <FieldGroup>
          <IdentityField id="full-name" label="Full name" placeholder="Alex Morgan" autoComplete="name" />
          <IdentityField id="sign-up-email" label="Email address" type="email" placeholder="you@example.com" autoComplete="email" />
          <IdentityField id="sign-up-phone" label="Mobile number" type="tel" placeholder="+1 (415) 555-0137" autoComplete="tel" />
          <IdentityField id="date-of-birth" label="Date of birth" type="date" autoComplete="bday" />
          <IdentityField id="street-address" label="Home address" placeholder="Street, city, postal code" autoComplete="street-address" />
          <Field>
            <FieldLabel htmlFor="new-password">Create password</FieldLabel>
            <Input id="new-password" name="new-password" type="password" autoComplete="new-password" required />
            <FieldDescription>Use at least 12 characters with a mix of letters, numbers, and symbols.</FieldDescription>
          </Field>
          <Field orientation="horizontal" className="items-start gap-3">
            <Checkbox id="terms" required />
            <FieldLabel htmlFor="terms" className="font-normal leading-snug">
              I agree to the Terms of Service and Privacy Notice.
            </FieldLabel>
          </Field>
          <ContinueButton>Create account</ContinueButton>
        </FieldGroup>
      </form>
      <Text variant="small" className="mt-5 text-center">
        Already have an account? <Link to="/" className="font-medium text-primary underline underline-offset-4">Sign in</Link>
      </Text>
    </AuthFrame>
  );
}

type VerificationProps = { channel: "email" | "phone"; destination: string; next: string };

function VerificationScreen({ channel, destination, next }: VerificationProps) {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const Icon = channel === "email" ? Mail : Phone;
  const label = channel === "email" ? "email address" : "phone number";

  return (
    <AuthFrame
      title={`Verify your ${label}`}
      description={`Enter the 6-digit code we sent to ${destination}.`}
      backTo={channel === "email" ? "/sign-up" : "/verify-email"}
    >
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate({ to: next });
        }}
      >
        <FieldGroup>
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Icon className="size-5" aria-hidden="true" />
          </div>
          <Field>
            <FieldLabel htmlFor={`${channel}-verification-code`}>Verification code</FieldLabel>
            <InputOTP id={`${channel}-verification-code`} maxLength={6} value={code} onChange={setCode} required>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Field>
          <ContinueButton>Verify and continue</ContinueButton>
        </FieldGroup>
      </form>
      <Text variant="small" className="mt-5 text-center">
        Didn&apos;t receive it? <Button variant="link" size="sm" className="h-auto px-1">Resend code</Button>
      </Text>
    </AuthFrame>
  );
}

export function EmailVerificationScreen() {
  return <VerificationScreen channel="email" destination="alex.morgan@example.com" next="/verify-phone" />;
}

export function PhoneVerificationScreen() {
  return <VerificationScreen channel="phone" destination="+1 (415) 555-0137" next="/two-factor" />;
}

export function TwoFactorScreen() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");

  return (
    <AuthFrame title="Confirm it&apos;s you" description="Use your authenticator app or a biometric check to finish signing in." backTo="/">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate({ to: "/account" });
        }}
      >
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="two-factor-code">Authenticator code</FieldLabel>
            <InputOTP id="two-factor-code" maxLength={6} value={code} onChange={setCode} required>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </Field>
          <ContinueButton>Verify and sign in</ContinueButton>
        </FieldGroup>
      </form>
      <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground">
        <Separator className="flex-1" /> or <Separator className="flex-1" />
      </div>
      <Button variant="outline" size="lg" className="w-full" onClick={() => navigate({ to: "/account" })}>
        <Smartphone aria-hidden="true" /> Use Face ID or Touch ID
      </Button>
      <Text variant="small" className="mt-5 text-center">
        <Link to="/sign-in-error" className="font-medium text-primary underline underline-offset-4">Use a recovery code instead</Link>
      </Text>
    </AuthFrame>
  );
}

export function ForgotPasswordScreen() {
  const navigate = useNavigate();

  return (
    <AuthFrame title="Reset your password" description="Enter your email or phone number and we’ll send a reset code." backTo="/">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate({ to: "/reset-password" });
        }}
      >
        <FieldGroup>
          <IdentityField id="account-identifier" label="Email or phone number" placeholder="you@example.com" autoComplete="username" />
          <ContinueButton>Send reset code</ContinueButton>
        </FieldGroup>
      </form>
    </AuthFrame>
  );
}

export function ResetPasswordScreen() {
  const navigate = useNavigate();

  return (
    <AuthFrame title="Choose a new password" description="Use the code we sent and create a password you haven&apos;t used before." backTo="/forgot-password" backLabel="Change contact method">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate({ to: "/" });
        }}
      >
        <FieldGroup>
          <IdentityField id="reset-code" label="Reset code" placeholder="6-digit code" autoComplete="one-time-code" />
          <Field>
            <FieldLabel htmlFor="replacement-password">New password</FieldLabel>
            <Input id="replacement-password" name="replacement-password" type="password" autoComplete="new-password" required />
          </Field>
          <ContinueButton>Update password</ContinueButton>
        </FieldGroup>
      </form>
    </AuthFrame>
  );
}

type AccountProps = { profile?: Profile };

export function AccountScreen({ profile = mockProfile }: AccountProps) {
  const navigate = useNavigate();

  return (
    <main className="min-h-svh bg-muted/40 px-4 py-10 sm:py-16">
      <section className="mx-auto w-full max-w-2xl rounded-2xl border bg-card p-6 shadow-sm sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <Avatar size="lg"><AvatarFallback>AM</AvatarFallback></Avatar>
            <div>
              <Heading level={1} className="text-2xl">Welcome, {profile.name.split(" ")[0]}</Heading>
              <Text variant="muted">Your account is secure and ready to use.</Text>
            </div>
          </div>
          <Badge variant="secondary"><Check aria-hidden="true" /> Verified</Badge>
        </div>

        <Separator className="my-7" />
        <div className="grid gap-3 sm:grid-cols-2">
          <Card size="sm"><CardContent className="space-y-1"><Text variant="small">Email</Text><Text>{profile.email}</Text></CardContent></Card>
          <Card size="sm"><CardContent className="space-y-1"><Text variant="small">Mobile</Text><Text>{profile.phone}</Text></CardContent></Card>
        </div>
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Button size="lg" className="flex-1" asChild><Link to="/profile">Manage profile</Link></Button>
          <Button size="lg" variant="outline" className="flex-1" asChild><Link to="/security">Security settings</Link></Button>
        </div>
        <Button variant="link" className="mt-4 w-full text-muted-foreground" onClick={() => navigate({ to: "/" })}>
          Log out
        </Button>
      </section>
    </main>
  );
}

type ProfileProps = { profile?: Profile };

export function ProfileScreen({ profile = mockProfile }: ProfileProps) {
  const navigate = useNavigate();

  return (
    <AuthFrame title="Profile and preferences" description="Keep your contact details and communications up to date." backTo="/account" backLabel="Back to account">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate({ to: "/account" });
        }}
      >
        <FieldGroup>
          <IdentityField id="profile-name" label="Full name" defaultValue={profile.name} autoComplete="name" />
          <IdentityField id="profile-email" label="Email address" type="email" defaultValue={profile.email} autoComplete="email" />
          <IdentityField id="profile-phone" label="Mobile number" type="tel" defaultValue={profile.phone} autoComplete="tel" />
          <IdentityField id="profile-address" label="Home address" defaultValue={profile.address} autoComplete="street-address" />
          <Separator />
          <div className="space-y-1">
            <Heading level={3}>Notifications</Heading>
            <Text variant="muted">Choose which account updates you receive.</Text>
          </div>
          <Field orientation="horizontal" className="items-center justify-between gap-4">
            <FieldLabel htmlFor="security-notifications" className="font-normal">Security alerts</FieldLabel>
            <Switch id="security-notifications" defaultChecked />
          </Field>
          <Field orientation="horizontal" className="items-center justify-between gap-4">
            <FieldLabel htmlFor="product-notifications" className="font-normal">Product updates</FieldLabel>
            <Switch id="product-notifications" />
          </Field>
          <ContinueButton>Save changes</ContinueButton>
        </FieldGroup>
      </form>
      <Button variant="link" className="mt-5 w-full" asChild><Link to="/password">Change password</Link></Button>
    </AuthFrame>
  );
}

export function PasswordScreen() {
  const navigate = useNavigate();

  return (
    <AuthFrame title="Change password" description="We’ll sign you out on other devices after you update it." backTo="/profile" backLabel="Back to profile">
      <form onSubmit={(event) => { event.preventDefault(); navigate({ to: "/account" }); }}>
        <FieldGroup>
          <IdentityField id="current-password" label="Current password" type="password" autoComplete="current-password" />
          <IdentityField id="updated-password" label="New password" type="password" autoComplete="new-password" />
          <IdentityField id="confirm-password" label="Confirm new password" type="password" autoComplete="new-password" />
          <ContinueButton>Update password</ContinueButton>
        </FieldGroup>
      </form>
    </AuthFrame>
  );
}

export function SecurityScreen() {
  const navigate = useNavigate();

  return (
    <AuthFrame title="Security settings" description="Use more than one way to confirm it&apos;s really you." backTo="/account" backLabel="Back to account">
      <div className="space-y-4">
        <Card size="sm">
          <CardContent className="flex items-start justify-between gap-4">
            <div className="space-y-1"><Heading level={3}>Authenticator app</Heading><Text variant="muted">Required for sensitive actions.</Text></div>
            <Switch defaultChecked aria-label="Authenticator app" />
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="flex items-start justify-between gap-4">
            <div className="space-y-1"><Heading level={3}>Face ID or Touch ID</Heading><Text variant="muted">Available on supported devices.</Text></div>
            <Switch aria-label="Face ID or Touch ID" />
          </CardContent>
        </Card>
        <Card size="sm">
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2"><KeyRound className="size-4 text-primary" aria-hidden="true" /><Heading level={3}>Recovery codes</Heading></div>
            <Text variant="muted">Keep recovery codes somewhere safe in case you lose your device.</Text>
            <Button variant="outline" size="sm">View recovery codes</Button>
          </CardContent>
        </Card>
        <Button size="lg" className="w-full" onClick={() => navigate({ to: "/account" })}>Done</Button>
      </div>
    </AuthFrame>
  );
}
