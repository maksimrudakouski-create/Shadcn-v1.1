// src/flows/routes.tsx
//
// DESIGNER-OWNED. The declarative route tree: structure and navigation only.
// There is deliberately no `loader` or `guard` field — there's nowhere to put
// logic, which is what keeps this folder safe to own.
//
// /app/router.tsx consumes this tree generically and builds the real router
// from it. Adding a screen = drop a component in src/flows/<name>/ and add an
// entry here. You never touch /app.
//
// Param syntax is `:id` (readable). The bridge in /app translates it to
// TanStack's `$id` — don't write `$id` here.

import type { ComponentType } from "react";
import {
  AccountScreen,
  EmailVerificationScreen,
  ForgotPasswordScreen,
  PasswordScreen,
  PhoneVerificationScreen,
  ProfileScreen,
  ResetPasswordScreen,
  SecurityScreen,
  SignInErrorScreen,
  SignInScreen,
  SignUpScreen,
  TwoFactorScreen,
} from "./auth/AuthScreens";

export type FlowRoute = {
  /** "/" | "loans" | ":id". Nested under the parent's path. */
  path: string;
  /** The screen. Omit on a node that exists purely to group children. */
  component?: ComponentType;
  children?: FlowRoute[];
  /**
   * Design annotation ONLY — grouping/labels for the DevBar and the Flow Map.
   * NOT enforcement: `meta.role: "admin"` restricts nothing.
   * Real role guards are dev's, in /app.
   */
  meta?: {
    role?: string;
    flow?: string;
    label?: string;
    /** Sample values so detail routes are clickable, e.g. { id: "1001" }. */
    sampleParams?: Record<string, string>;
  };
};

export const routes: FlowRoute[] = [
  {
    path: "/",
    component: SignInScreen,
    meta: { role: "user", flow: "Sign In / Log Out", label: "Sign in" },
  },
  { path: "sign-in-error", component: SignInErrorScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Sign-in error" } },
  { path: "sign-up", component: SignUpScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Create account" } },
  { path: "verify-email", component: EmailVerificationScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Verify email" } },
  { path: "verify-phone", component: PhoneVerificationScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Verify phone" } },
  { path: "two-factor", component: TwoFactorScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Two-factor authentication" } },
  { path: "forgot-password", component: ForgotPasswordScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Forgot password" } },
  { path: "reset-password", component: ResetPasswordScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Set new password" } },
  { path: "account", component: AccountScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Signed-in account" } },
  { path: "profile", component: ProfileScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Profile and notifications" } },
  { path: "password", component: PasswordScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Manage password" } },
  { path: "security", component: SecurityScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Security and 2FA" } },
];
