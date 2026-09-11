export type Profile = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

export type AccountOverview = {
  availableBalance: string;
  accountNumber: string;
  accountType: string;
  nextStep: string;
};

export type ActivityItem = {
  id: string;
  merchant: string;
  category: string;
  amount: string;
  date: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  description: string;
  date: string;
  unread?: boolean;
};

export type PaymentCard = {
  label: string;
  number: string;
  type: string;
  status: string;
};

export const mockProfile: Profile = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "+1 (415) 555-0137",
  address: "225 Market Street, San Francisco, CA 94105",
};

export const mockAccountOverview: AccountOverview = {
  availableBalance: "$12,480.56",
  accountNumber: "•••• 4821",
  accountType: "Everyday account",
  nextStep: "Your identity is verified and your account is ready to use.",
};

export const mockActivity: ActivityItem[] = [
  { id: "groceries", merchant: "Morrow Market", category: "Groceries", amount: "−$84.20", date: "Today" },
  { id: "salary", merchant: "Northwind Payroll", category: "Income", amount: "+$3,240.00", date: "Sep 10" },
  { id: "coffee", merchant: "Campo Coffee", category: "Food & drink", amount: "−$6.50", date: "Sep 9" },
];

export const mockNotifications: NotificationItem[] = [
  { id: "kyc-approved", title: "Identity verification complete", description: "Your account has been created and is ready to use.", date: "Today", unread: true },
  { id: "statement-ready", title: "Your August statement is ready", description: "Download your latest account statement whenever you need it.", date: "Yesterday" },
  { id: "security", title: "New sign-in confirmed", description: "We noticed a sign-in from your usual device.", date: "Sep 8" },
];

export const mockPaymentCard: PaymentCard = {
  label: "Northstar debit card",
  number: "•••• 4821",
  type: "Physical card",
  status: "Active",
};
