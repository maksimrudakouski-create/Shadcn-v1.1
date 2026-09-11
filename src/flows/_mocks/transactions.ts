export type TransactionKind = "Funding" | "Payout" | "Transfer" | "Card purchase" | "Reward";
export type TransactionStatus = "Completed" | "Pending" | "Failed";
export type TransactionPeriod = "Today" | "This week" | "This month" | "Earlier";

export type TransactionRecord = {
  id: string;
  kind: TransactionKind;
  title: string;
  description: string;
  amount: string;
  direction: "in" | "out";
  status: TransactionStatus;
  date: string;
  period: TransactionPeriod;
  reference: string;
  source: string;
  destination: string;
  fee: string;
  balanceAfter: string;
};

export type FundingSource = {
  id: string;
  name: string;
  accountHint: string;
  sortCode: string;
  transferReference: string;
};

export type PayoutRecipient = {
  id: string;
  name: string;
  accountHint: string;
  destination: string;
  delivery: string;
};

export type InternalRecipient = {
  id: string;
  name: string;
  handle: string;
  initials: string;
};

export type RewardSummary = {
  availableCashback: string;
  nextPayout: string;
  qualifyingSpend: string;
};

export const mockTransactions: TransactionRecord[] = [
  {
    id: "fps-top-up",
    kind: "Funding",
    title: "Top up from Monzo",
    description: "Faster Payments",
    amount: "+£1,250.00",
    direction: "in",
    status: "Completed",
    date: "Today, 10:42",
    period: "Today",
    reference: "FPS-904812",
    source: "Monzo •• 1742",
    destination: "Northstar Everyday account",
    fee: "£0.00",
    balanceAfter: "£12,480.56",
  },
  {
    id: "mia-payout",
    kind: "Payout",
    title: "Payout to Mia Thomas",
    description: "UK bank transfer",
    amount: "−£240.00",
    direction: "out",
    status: "Pending",
    date: "Today, 09:15",
    period: "Today",
    reference: "PAY-285019",
    source: "Northstar Everyday account",
    destination: "Mia Thomas •• 4291",
    fee: "£0.00",
    balanceAfter: "£11,230.56",
  },
  {
    id: "morrow-market",
    kind: "Card purchase",
    title: "Morrow Market",
    description: "Groceries · Northstar debit",
    amount: "−£84.20",
    direction: "out",
    status: "Completed",
    date: "Yesterday, 17:21",
    period: "This week",
    reference: "CARD-719863",
    source: "Northstar debit •• 4821",
    destination: "Morrow Market",
    fee: "£0.00",
    balanceAfter: "£11,470.56",
  },
  {
    id: "jordan-transfer",
    kind: "Transfer",
    title: "Jordan Lee",
    description: "Internal transfer",
    amount: "−£35.00",
    direction: "out",
    status: "Completed",
    date: "Sep 10, 14:08",
    period: "This week",
    reference: "INT-483920",
    source: "Northstar Everyday account",
    destination: "@jordanlee",
    fee: "£0.00",
    balanceAfter: "£11,554.76",
  },
  {
    id: "monthly-cashback",
    kind: "Reward",
    title: "Monthly cashback",
    description: "September rewards",
    amount: "+£18.64",
    direction: "in",
    status: "Completed",
    date: "Sep 9, 08:00",
    period: "This week",
    reference: "RWD-118230",
    source: "Northstar Rewards",
    destination: "Northstar Everyday account",
    fee: "£0.00",
    balanceAfter: "£11,589.76",
  },
  {
    id: "global-payout",
    kind: "Payout",
    title: "Payout to Atelier Berlin",
    description: "International bank transfer",
    amount: "−€320.00",
    direction: "out",
    status: "Completed",
    date: "Sep 6, 11:30",
    period: "This month",
    reference: "PAY-280384",
    source: "Northstar Everyday account",
    destination: "Atelier Berlin •• 8080",
    fee: "£2.50",
    balanceAfter: "£11,571.12",
  },
  {
    id: "travel-reward",
    kind: "Reward",
    title: "Travel reward",
    description: "Card spend bonus",
    amount: "+£6.20",
    direction: "in",
    status: "Completed",
    date: "Sep 2, 08:00",
    period: "This month",
    reference: "RWD-115920",
    source: "Northstar Rewards",
    destination: "Northstar Everyday account",
    fee: "£0.00",
    balanceAfter: "£11,891.12",
  },
];

export const mockFundingSources: FundingSource[] = [
  { id: "monzo", name: "Monzo", accountHint: "Personal account •• 1742", sortCode: "04-00-04", transferReference: "NORTHSTAR ALEX" },
  { id: "starling", name: "Starling Bank", accountHint: "Current account •• 9810", sortCode: "60-83-71", transferReference: "NORTHSTAR ALEX" },
];

export const mockPayoutRecipients: PayoutRecipient[] = [
  { id: "mia-thomas", name: "Mia Thomas", accountHint: "UK account •• 4291", destination: "United Kingdom", delivery: "Usually within minutes" },
  { id: "atelier-berlin", name: "Atelier Berlin", accountHint: "EUR account •• 8080", destination: "Germany", delivery: "1–2 business days" },
];

export const mockInternalRecipients: InternalRecipient[] = [
  { id: "jordan-lee", name: "Jordan Lee", handle: "@jordanlee", initials: "JL" },
  { id: "sam-rivera", name: "Sam Rivera", handle: "@samrivera", initials: "SR" },
];

export const mockRewardSummary: RewardSummary = {
  availableCashback: "£24.84",
  nextPayout: "October 1",
  qualifyingSpend: "£1,242.00",
};
