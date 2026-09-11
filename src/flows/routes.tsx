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
import { KycApprovedScreen, KycPendingScreen, KycRejectedScreen, KycStartScreen } from "./kyc/KycScreens";
import { CardDetailScreen, CardIssueScreen, CardIssuedScreen, CardsScreen, WalletIntegrationScreen, WalletSetupScreen } from "./cards/CardScreens";
import { HomeScreen, StatementScreen } from "./home/HomeScreens";
import { NotificationPreferencesScreen, NotificationsScreen } from "./notifications/NotificationScreens";

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
  { path: "kyc", component: KycStartScreen, meta: { role: "user", flow: "Onboarding and KYC", label: "Start identity verification" } },
  { path: "kyc-pending", component: KycPendingScreen, meta: { role: "user", flow: "Onboarding and KYC", label: "Verification pending" } },
  { path: "kyc-approved", component: KycApprovedScreen, meta: { role: "user", flow: "Onboarding and KYC", label: "Verification approved" } },
  { path: "kyc-rejected", component: KycRejectedScreen, meta: { role: "user", flow: "Onboarding and KYC", label: "Verification rejected" } },
  { path: "two-factor", component: TwoFactorScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Two-factor authentication" } },
  { path: "forgot-password", component: ForgotPasswordScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Forgot password" } },
  { path: "reset-password", component: ResetPasswordScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Set new password" } },
  { path: "account", component: AccountScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Signed-in account" } },
  { path: "profile", component: ProfileScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Profile and notifications" } },
  { path: "password", component: PasswordScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Manage password" } },
  { path: "security", component: SecurityScreen, meta: { role: "user", flow: "Sign In / Log Out", label: "Security and 2FA" } },
  { path: "home", component: HomeScreen, meta: { role: "user", flow: "User Profile & Home Dashboard", label: "Home dashboard" } },
  {
    path: "cards",
    component: CardsScreen,
    meta: { role: "user", flow: "Card Issuing & Management", label: "Your cards" },
    children: [
      { path: "issue", component: CardIssueScreen, meta: { role: "user", flow: "Card Issuing & Management", label: "Choose card type" } },
      { path: "issue/complete", component: CardIssuedScreen, meta: { role: "user", flow: "Card Issuing & Management", label: "Virtual card issued" } },
      { path: ":id", component: CardDetailScreen, meta: { role: "user", flow: "Card Issuing & Management", label: "Card controls", sampleParams: { id: "northstar-debit" } } },
    ],
  },
  {
    path: "wallet",
    component: WalletIntegrationScreen,
    meta: { role: "user", flow: "Wallet Integration", label: "Digital wallets" },
    children: [
      { path: ":wallet", component: WalletSetupScreen, meta: { role: "user", flow: "Wallet Integration", label: "Wallet setup", sampleParams: { wallet: "apple-wallet" } } },
    ],
  },
  {
    path: "notifications",
    component: NotificationsScreen,
    meta: { role: "user", flow: "Notifications", label: "Notification centre" },
    children: [
      { path: "preferences", component: NotificationPreferencesScreen, meta: { role: "user", flow: "Notifications", label: "Alert preferences" } },
    ],
  },
  { path: "statement", component: StatementScreen, meta: { role: "user", flow: "User Profile & Home Dashboard", label: "Account statement" } },
];
