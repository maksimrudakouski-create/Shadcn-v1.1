import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BanknoteArrowDown,
  Check,
  ChevronRight,
  CircleCheck,
  Clock3,
  Gift,
  Landmark,
  Plus,
  Send,
  SlidersHorizontal,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppShell } from "@/shared/ui/app-shell";
import { TransactionRow } from "@/shared/ui/transaction-row";
import { Heading, Text } from "@/shared/ui/typography";
import {
  type FundingSource,
  type InternalRecipient,
  type PayoutRecipient,
  type RewardSummary,
  type TransactionKind,
  type TransactionPeriod,
  type TransactionRecord,
  mockFundingSources,
  mockInternalRecipients,
  mockPayoutRecipients,
  mockRewardSummary,
  mockTransactions,
} from "../_mocks/transactions";

type TransactionsProps = { transactions?: TransactionRecord[] };

export function TransactionsScreen({ transactions = mockTransactions }: TransactionsProps) {
  const [kind, setKind] = useState<"all" | TransactionKind>("all");
  const [period, setPeriod] = useState<"all" | TransactionPeriod>("all");
  const visibleTransactions = transactions.filter((transaction) => {
    const matchesKind = kind === "all" || transaction.kind === kind;
    const matchesPeriod = period === "all" || transaction.period === period;
    return matchesKind && matchesPeriod;
  });

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Text variant="muted">Account activity</Text>
            <Heading level={1} className="mt-1">Transactions</Heading>
            <Text variant="muted" className="mt-2">Review funding, pay-outs, transfers, card activity, and rewards in one place.</Text>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" asChild><Link to="/transactions/send"><Send aria-hidden="true" /> Send money</Link></Button>
            <Button asChild><Link to="/transactions/fund"><Plus aria-hidden="true" /> Add money</Link></Button>
          </div>
        </div>

        <section className="mt-8 grid gap-4 sm:grid-cols-3" aria-label="Transaction shortcuts">
          <ActionCard icon={BanknoteArrowDown} title="Add money" description="Top up from a UK bank account with Faster Payments." to="/transactions/fund" />
          <ActionCard icon={Landmark} title="Make a pay-out" description="Send to a UK or international bank account." to="/transactions/payout" />
          <ActionCard icon={Gift} title="Rewards" description="See the cashback earned from eligible card spend." to="/transactions/rewards" />
        </section>

        <section className="mt-10" aria-labelledby="all-transactions-title">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <Heading id="all-transactions-title" level={2}>All transactions</Heading>
              <Text variant="muted" className="mt-1">Filter activity by type or date.</Text>
            </div>
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="size-4 text-muted-foreground" aria-hidden="true" />
              <Select value={period} onValueChange={(value) => setPeriod(value as "all" | TransactionPeriod)}>
                <SelectTrigger aria-label="Filter transactions by date"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="Today">Today</SelectItem>
                  <SelectItem value="This week">This week</SelectItem>
                  <SelectItem value="This month">This month</SelectItem>
                  <SelectItem value="Earlier">Earlier</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Tabs value={kind} onValueChange={(value) => setKind(value as "all" | TransactionKind)} className="mt-5">
            <TabsList className="max-w-full overflow-x-auto">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="Funding">Funding</TabsTrigger>
              <TabsTrigger value="Payout">Pay-outs</TabsTrigger>
              <TabsTrigger value="Reward">Rewards</TabsTrigger>
            </TabsList>
          </Tabs>
          <Card className="mt-5">
            {visibleTransactions.length > 0 ? (
              <CardContent className="divide-y p-0">
                {visibleTransactions.map((transaction) => (
                  <Link key={transaction.id} to="/transactions/$id" params={{ id: transaction.id }} className="block transition-colors hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset">
                    <TransactionRow {...transaction} />
                  </Link>
                ))}
              </CardContent>
            ) : (
              <CardContent className="p-8 text-center"><SlidersHorizontal className="mx-auto size-6" aria-hidden="true" /><Heading level={3} className="mt-3">No matching transactions</Heading><Text variant="muted" className="mt-1">Try a different date or transaction type.</Text></CardContent>
            )}
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

type ActionCardProps = {
  icon: typeof Landmark;
  title: string;
  description: string;
  to: "/transactions/fund" | "/transactions/payout" | "/transactions/rewards";
};

function ActionCard({ icon: Icon, title, description, to }: ActionCardProps) {
  return (
    <Card className="transition-shadow hover:shadow-sm">
      <CardHeader>
        <span className="flex size-10 items-center justify-center rounded-xl bg-muted"><Icon className="size-5" aria-hidden="true" /></span>
        <CardTitle className="mt-3">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent><Button variant="outline" asChild><Link to={to}>Get started <ArrowRight aria-hidden="true" /></Link></Button></CardContent>
    </Card>
  );
}

type TransactionDetailProps = { transactions?: TransactionRecord[] };

export function TransactionDetailScreen({ transactions = mockTransactions }: TransactionDetailProps) {
  const { id } = useParams({ strict: false });
  const transaction = transactions.find((item) => item.id === id) ?? transactions[0] ?? mockTransactions[0];
  const nextStep = transaction.kind === "Payout" ? "/transactions/payout" : transaction.kind === "Funding" ? "/transactions/fund" : "/transactions/send";

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <Button variant="ghost" size="sm" className="-ml-2" asChild><Link to="/transactions"><ArrowLeft aria-hidden="true" /> Transactions</Link></Button>
        <div className="mt-5 flex flex-wrap items-start justify-between gap-4">
          <div><Text variant="muted">{transaction.kind}</Text><Heading level={1} className="mt-1">{transaction.title}</Heading><Text variant="muted" className="mt-2">{transaction.date}</Text></div>
          <Badge variant={transaction.status === "Completed" ? "secondary" : transaction.status === "Failed" ? "destructive" : "outline"}>{transaction.status === "Pending" ? <Clock3 aria-hidden="true" /> : <Check aria-hidden="true" />}{transaction.status}</Badge>
        </div>
        <Card className="mt-8">
          <CardContent className="p-5 sm:p-6">
            <Text variant="small">Amount</Text>
            <Text className={transaction.direction === "in" ? "mt-1 text-3xl font-semibold text-primary" : "mt-1 text-3xl font-semibold"}>{transaction.amount}</Text>
            <Separator className="my-6" />
            <dl className="space-y-5">
              <DetailRow label="Status" value={transaction.status} />
              <DetailRow label="From" value={transaction.source} />
              <DetailRow label="To" value={transaction.destination} />
              <DetailRow label="Reference" value={transaction.reference} mono />
              <DetailRow label="Fee" value={transaction.fee} />
              <DetailRow label="Balance after" value={transaction.balanceAfter} />
            </dl>
          </CardContent>
        </Card>
        <div className="mt-6 flex flex-wrap gap-3">
          <Button asChild><Link to={nextStep}>Make another {transaction.kind === "Funding" ? "top-up" : transaction.kind === "Payout" ? "pay-out" : "transfer"} <ArrowRight aria-hidden="true" /></Link></Button>
          <Button variant="outline" asChild><Link to="/notifications/preferences">Manage alerts</Link></Button>
        </div>
      </div>
    </AppShell>
  );
}

function DetailRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return <div className="flex items-start justify-between gap-6"><Text variant="small">{label}</Text><Text as="span" className={mono ? "text-right font-mono text-xs font-medium" : "text-right font-medium"}>{value}</Text></div>;
}

type FundingProps = { sources?: FundingSource[] };

export function FundingScreen({ sources = mockFundingSources }: FundingProps) {
  const [sourceId, setSourceId] = useState(sources[0]?.id ?? "");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const source = sources.find((item) => item.id === sourceId) ?? sources[0] ?? mockFundingSources[0];

  if (isSubmitted) {
    return <FundingConfirmation source={source} />;
  }

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <Button variant="ghost" size="sm" className="-ml-2" asChild><Link to="/transactions"><ArrowLeft aria-hidden="true" /> Transactions</Link></Button>
        <div className="mt-5"><Text variant="muted">Funding</Text><Heading level={1} className="mt-1">Add money from your bank</Heading><Text variant="muted" className="mt-2">Create a secure transfer instruction for a UK Faster Payments top-up.</Text></div>
        <div className="mt-8 grid gap-6 md:grid-cols-[1.15fr_0.85fr]">
          <Card>
            <CardHeader><CardTitle>Top-up details</CardTitle><CardDescription>The bank transfer is initiated outside Northstar. We’ll update your balance as soon as it arrives.</CardDescription></CardHeader>
            <CardContent>
              <form className="space-y-5" onSubmit={(event) => { event.preventDefault(); setIsSubmitted(true); }}>
                <div className="space-y-2"><Label htmlFor="funding-source">Bank account</Label><Select value={sourceId} onValueChange={setSourceId}><SelectTrigger id="funding-source" className="w-full"><SelectValue /></SelectTrigger><SelectContent>{sources.map((item) => <SelectItem key={item.id} value={item.id}>{item.name} · {item.accountHint}</SelectItem>)}</SelectContent></Select></div>
                <div className="space-y-2"><Label htmlFor="funding-amount">Amount</Label><Input id="funding-amount" inputMode="decimal" defaultValue="£1,250.00" /></div>
                <Button type="submit" className="w-full">Continue <ArrowRight aria-hidden="true" /></Button>
              </form>
            </CardContent>
          </Card>
          <Card className="h-fit"><CardHeader><CardTitle>Transfer instructions</CardTitle><CardDescription>Use these details in your bank app.</CardDescription></CardHeader><CardContent className="space-y-4"><DetailRow label="Sort code" value={source.sortCode} mono /><DetailRow label="Reference" value={source.transferReference} mono /><Separator /><Text variant="small">Faster Payments usually arrive within minutes. There’s no fee for this top-up.</Text></CardContent></Card>
        </div>
      </div>
    </AppShell>
  );
}

function FundingConfirmation({ source }: { source: FundingSource }) {
  return (
    <AppShell><div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-2xl flex-col justify-center px-4 py-10 sm:px-6"><div className="mx-auto w-full text-center"><span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><CircleCheck className="size-7" aria-hidden="true" /></span><Text variant="muted" className="mt-6">Transfer instructions ready</Text><Heading level={1} className="mt-1">Top up your account</Heading><Text variant="muted" className="mx-auto mt-2 max-w-lg">Send the transfer from {source.name} using the reference below. We’ll notify you when the funds arrive.</Text></div><Card className="mx-auto mt-8 w-full max-w-md"><CardContent className="space-y-4 p-5"><DetailRow label="Sort code" value={source.sortCode} mono /><DetailRow label="Reference" value={source.transferReference} mono /></CardContent></Card><div className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row"><Button className="flex-1" asChild><Link to="/transactions">View activity</Link></Button><Button variant="outline" className="flex-1" asChild><Link to="/notifications/preferences">Set alerts</Link></Button></div></div></AppShell>
  );
}

type PayoutProps = { recipients?: PayoutRecipient[] };

export function PayoutScreen({ recipients = mockPayoutRecipients }: PayoutProps) {
  const [recipientId, setRecipientId] = useState(recipients[0]?.id ?? "");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const recipient = recipients.find((item) => item.id === recipientId) ?? recipients[0] ?? mockPayoutRecipients[0];

  if (isSubmitted) {
    return <PayoutConfirmation recipient={recipient} />;
  }

  return (
    <AppShell><div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10"><Button variant="ghost" size="sm" className="-ml-2" asChild><Link to="/transactions"><ArrowLeft aria-hidden="true" /> Transactions</Link></Button><div className="mt-5"><Text variant="muted">Pay-outs</Text><Heading level={1} className="mt-1">Send to a bank account</Heading><Text variant="muted" className="mt-2">Make a domestic or international pay-out from your Northstar balance.</Text></div><Card className="mt-8"><CardHeader><CardTitle>Pay-out details</CardTitle><CardDescription>Review the recipient and amount before confirming.</CardDescription></CardHeader><CardContent><form className="grid gap-5 md:grid-cols-2" onSubmit={(event) => { event.preventDefault(); setIsSubmitted(true); }}><div className="space-y-2"><Label htmlFor="payout-recipient">Recipient</Label><Select value={recipientId} onValueChange={setRecipientId}><SelectTrigger id="payout-recipient" className="w-full"><SelectValue /></SelectTrigger><SelectContent>{recipients.map((item) => <SelectItem key={item.id} value={item.id}>{item.name} · {item.accountHint}</SelectItem>)}</SelectContent></Select></div><div className="space-y-2"><Label htmlFor="payout-amount">Amount</Label><Input id="payout-amount" inputMode="decimal" defaultValue="£240.00" /></div><div className="rounded-lg bg-muted p-4 md:col-span-2"><Text className="font-medium">{recipient.destination}</Text><Text variant="small" className="mt-1">{recipient.delivery} · Fees are shown before the pay-out is processed.</Text></div><div className="flex flex-wrap gap-3 md:col-span-2"><Button type="submit">Review pay-out <ArrowRight aria-hidden="true" /></Button><Button variant="outline" asChild><Link to="/notifications/preferences">Pay-out alerts</Link></Button></div></form></CardContent></Card></div></AppShell>
  );
}

function PayoutConfirmation({ recipient }: { recipient: PayoutRecipient }) {
  return (
    <AppShell><div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-2xl flex-col justify-center px-4 py-10 sm:px-6"><div className="mx-auto w-full text-center"><span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><CircleCheck className="size-7" aria-hidden="true" /></span><Text variant="muted" className="mt-6">Pay-out submitted</Text><Heading level={1} className="mt-1">We’re sending your money</Heading><Text variant="muted" className="mx-auto mt-2 max-w-lg">Your pay-out to {recipient.name} is on its way. We’ll send a push or email update when it completes or needs attention.</Text></div><Card className="mx-auto mt-8 w-full max-w-md"><CardContent className="space-y-4 p-5"><DetailRow label="Recipient" value={recipient.name} /><DetailRow label="Destination" value={recipient.destination} /><DetailRow label="Expected delivery" value={recipient.delivery} /></CardContent></Card><div className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row"><Button className="flex-1" asChild><Link to="/transactions">View pay-out</Link></Button><Button variant="outline" className="flex-1" asChild><Link to="/notifications/preferences">Manage alerts</Link></Button></div></div></AppShell>
  );
}

type SendMoneyProps = { recipients?: InternalRecipient[] };

export function SendMoneyScreen({ recipients = mockInternalRecipients }: SendMoneyProps) {
  const [recipientId, setRecipientId] = useState(recipients[0]?.id ?? "");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const recipient = recipients.find((item) => item.id === recipientId) ?? recipients[0] ?? mockInternalRecipients[0];

  if (isSubmitted) {
    return <SendMoneyConfirmation recipient={recipient} />;
  }

  return (
    <AppShell><div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10"><Button variant="ghost" size="sm" className="-ml-2" asChild><Link to="/transactions"><ArrowLeft aria-hidden="true" /> Transactions</Link></Button><div className="mt-5"><Text variant="muted">Internal transfer</Text><Heading level={1} className="mt-1">Send money instantly</Heading><Text variant="muted" className="mt-2">Move money to another Northstar user with no transfer fee.</Text></div><Card className="mt-8"><CardHeader><CardTitle>Who are you paying?</CardTitle><CardDescription>Internal transfers arrive instantly once confirmed.</CardDescription></CardHeader><CardContent><form className="space-y-5" onSubmit={(event) => { event.preventDefault(); setIsSubmitted(true); }}><div className="grid gap-3 sm:grid-cols-2">{recipients.map((item) => <Button key={item.id} type="button" variant={item.id === recipientId ? "default" : "outline"} className="h-auto justify-start p-4 text-left" onClick={() => setRecipientId(item.id)}><span className="flex size-9 items-center justify-center rounded-full bg-background/20 text-xs font-semibold">{item.initials}</span><span><span className="block text-sm font-semibold">{item.name}</span><span className="mt-1 block text-xs font-normal opacity-75">{item.handle}</span></span></Button>)}</div><div className="space-y-2"><Label htmlFor="transfer-amount">Amount</Label><Input id="transfer-amount" inputMode="decimal" defaultValue="£35.00" /></div><Button type="submit" className="w-full">Send to {recipient.name} <Send aria-hidden="true" /></Button></form></CardContent></Card></div></AppShell>
  );
}

function SendMoneyConfirmation({ recipient }: { recipient: InternalRecipient }) {
  return <AppShell><div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-2xl flex-col justify-center px-4 py-10 sm:px-6"><div className="mx-auto w-full text-center"><span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><CircleCheck className="size-7" aria-hidden="true" /></span><Text variant="muted" className="mt-6">Transfer complete</Text><Heading level={1} className="mt-1">Money sent to {recipient.name}</Heading><Text variant="muted" className="mx-auto mt-2 max-w-lg">Your transfer was instant and fee-free.</Text></div><div className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row"><Button className="flex-1" asChild><Link to="/transactions">View activity</Link></Button><Button variant="outline" className="flex-1" asChild><Link to="/transactions/send">Send more</Link></Button></div></div></AppShell>;
}

type RewardsProps = { summary?: RewardSummary; transactions?: TransactionRecord[] };

export function RewardsScreen({ summary = mockRewardSummary, transactions = mockTransactions }: RewardsProps) {
  const rewards = transactions.filter((transaction) => transaction.kind === "Reward");

  return (
    <AppShell><div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10"><Button variant="ghost" size="sm" className="-ml-2" asChild><Link to="/transactions"><ArrowLeft aria-hidden="true" /> Transactions</Link></Button><div className="mt-5 flex flex-wrap items-start justify-between gap-4"><div><Text variant="muted">Northstar Rewards</Text><Heading level={1} className="mt-1">Your cashback</Heading><Text variant="muted" className="mt-2">Eligible card purchases earn cashback automatically.</Text></div><Badge variant="secondary"><Gift aria-hidden="true" /> Rewards active</Badge></div><div className="mt-8 grid gap-4 sm:grid-cols-3"><RewardMetric label="Available cashback" value={summary.availableCashback} /><RewardMetric label="Next payout" value={summary.nextPayout} /><RewardMetric label="Eligible spend" value={summary.qualifyingSpend} /></div><section className="mt-10" aria-labelledby="reward-activity-title"><div className="mb-4 flex items-center justify-between gap-4"><Heading id="reward-activity-title" level={2}>Reward activity</Heading><Button variant="link" size="sm" asChild><Link to="/transactions">All transactions <ChevronRight aria-hidden="true" /></Link></Button></div><Card><CardContent className="divide-y p-0">{rewards.map((reward) => <Link key={reward.id} to="/transactions/$id" params={{ id: reward.id }} className="block transition-colors hover:bg-muted/50"><TransactionRow {...reward} /></Link>)}</CardContent></Card></section></div></AppShell>
  );
}

function RewardMetric({ label, value }: { label: string; value: string }) {
  return <Card><CardContent className="p-5"><Text variant="small">{label}</Text><Text className="mt-2 text-xl font-semibold">{value}</Text></CardContent></Card>;
}
