export type ManagedCard = {
  id: string;
  label: string;
  number: string;
  lastFour: string;
  cardholder: string;
  expires: string;
  network: string;
  type: "Physical" | "Virtual";
  status: "Active" | "Frozen";
  balance: string;
  monthlySpend: string;
  walletCount: number;
  tone: "primary" | "secondary";
};

export type CardTransaction = {
  id: string;
  cardId: string;
  merchant: string;
  category: string;
  date: string;
  amount: string;
  status: "Completed" | "Pending";
};

export type WalletConnection = {
  id: string;
  name: string;
  description: string;
  device: string;
  status: "Connected" | "Not connected";
  cardId: string;
};

export type CardNotification = {
  id: string;
  title: string;
  description: string;
  date: string;
  unread?: boolean;
  cardId?: string;
};

export type NotificationPreference = {
  id: string;
  title: string;
  description: string;
  enabled: boolean;
};

export const mockManagedCards: ManagedCard[] = [
  {
    id: "northstar-debit",
    label: "Northstar debit",
    number: "•••• 4821",
    lastFour: "4821",
    cardholder: "Alex Morgan",
    expires: "08/29",
    network: "VISA",
    type: "Physical",
    status: "Active",
    balance: "$12,480.56",
    monthlySpend: "$1,284.70",
    walletCount: 2,
    tone: "primary",
  },
  {
    id: "travel-virtual",
    label: "Travel virtual",
    number: "•••• 9018",
    lastFour: "9018",
    cardholder: "Alex Morgan",
    expires: "11/27",
    network: "VISA",
    type: "Virtual",
    status: "Active",
    balance: "$2,500.00",
    monthlySpend: "$426.18",
    walletCount: 1,
    tone: "secondary",
  },
];

export const mockCardTransactions: CardTransaction[] = [
  { id: "market", cardId: "northstar-debit", merchant: "Morrow Market", category: "Groceries", date: "Today", amount: "−$84.20", status: "Completed" },
  { id: "ride", cardId: "northstar-debit", merchant: "Metro Ride", category: "Transport", date: "Yesterday", amount: "−$18.40", status: "Completed" },
  { id: "hotel", cardId: "travel-virtual", merchant: "Hotel Monte", category: "Travel", date: "Sep 9", amount: "−$236.00", status: "Pending" },
  { id: "coffee", cardId: "northstar-debit", merchant: "Campo Coffee", category: "Food & drink", date: "Sep 9", amount: "−$6.50", status: "Completed" },
];

export const mockWalletConnections: WalletConnection[] = [
  { id: "apple-wallet", name: "Apple Wallet", description: "Pay with your iPhone, Apple Watch, or Mac.", device: "iPhone 15 Pro", status: "Connected", cardId: "northstar-debit" },
  { id: "google-wallet", name: "Google Wallet", description: "Tap to pay on your Android device or online.", device: "Pixel 9", status: "Connected", cardId: "northstar-debit" },
  { id: "samsung-wallet", name: "Samsung Wallet", description: "Keep your card ready on your Galaxy device.", device: "Galaxy S24", status: "Not connected", cardId: "northstar-debit" },
];

export const mockCardNotifications: CardNotification[] = [
  { id: "digital-card", title: "Your virtual card is ready", description: "Travel virtual is active and can be used online or in your wallet.", date: "Today", unread: true, cardId: "travel-virtual" },
  { id: "wallet-added", title: "Card added to Apple Wallet", description: "Northstar debit is ready for tap-to-pay on your iPhone 15 Pro.", date: "Yesterday", unread: true, cardId: "northstar-debit" },
  { id: "transaction", title: "Card purchase approved", description: "Morrow Market charged $84.20 to your Northstar debit card.", date: "Sep 10", cardId: "northstar-debit" },
  { id: "statement-ready", title: "Your August statement is ready", description: "Download the latest account statement whenever you need it.", date: "Sep 1" },
];

export const mockNotificationPreferences: NotificationPreference[] = [
  { id: "purchases", title: "Card purchases", description: "Get notified when a card purchase is approved or declined.", enabled: true },
  { id: "wallet", title: "Wallet activity", description: "Know when a card is added, removed, or used in a digital wallet.", enabled: true },
  { id: "security", title: "Security alerts", description: "Receive important updates about card controls and unusual activity.", enabled: true },
  { id: "insights", title: "Spending insights", description: "Receive a weekly summary of card spending and recurring payments.", enabled: false },
];
