import { useState } from "react";
import { Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  CircleCheck,
  CreditCard,
  Eye,
  Plus,
  ReceiptText,
  ShieldCheck,
  Smartphone,
  Snowflake,
  Wallet,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { AppShell } from "@/shared/ui/app-shell";
import { CardVisual } from "@/shared/ui/card-visual";
import { Heading, Text } from "@/shared/ui/typography";
import {
  type CardTransaction,
  type ManagedCard,
  type WalletConnection,
  mockCardTransactions,
  mockManagedCards,
  mockWalletConnections,
} from "../_mocks/cards";

type CardsProps = { cards?: ManagedCard[] };

export function CardsScreen({ cards = mockManagedCards }: CardsProps) {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Text variant="muted">Card issuing & management</Text>
            <Heading level={1} className="mt-1">Your cards</Heading>
            <Text variant="muted" className="mt-2">Issue cards, manage controls, and keep your wallets in sync.</Text>
          </div>
          <Button asChild><Link to="/cards/issue"><Plus aria-hidden="true" /> Get a card</Link></Button>
        </div>

        <section className="mt-8" aria-labelledby="active-cards-title">
          <div className="mb-4 flex items-center justify-between gap-3">
            <Heading id="active-cards-title" level={2}>Active cards</Heading>
            <Text variant="small">{cards.length} cards</Text>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {cards.map((card) => (
              <Card key={card.id} className="overflow-hidden py-0 transition-shadow hover:shadow-md">
                <Link to="/cards/$id" params={{ id: card.id }} className="block p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                  <CardVisual card={card} compact />
                  <div className="flex items-center justify-between gap-3 pt-4">
                    <div>
                      <Text className="font-medium">{card.type} card</Text>
                      <Text variant="small">{card.walletCount} {card.walletCount === 1 ? "wallet" : "wallets"} connected</Text>
                    </div>
                    <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-10 grid gap-5 lg:grid-cols-2" aria-label="Card shortcuts">
          <Card>
            <CardHeader>
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted"><Wallet className="size-5" aria-hidden="true" /></div>
              <CardTitle className="mt-3">Digital wallets</CardTitle>
              <CardDescription>Add your card to the devices you use most.</CardDescription>
            </CardHeader>
            <CardContent><Button variant="outline" asChild><Link to="/wallet">Manage wallets <ArrowRight aria-hidden="true" /></Link></Button></CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex size-10 items-center justify-center rounded-xl bg-muted"><Bell className="size-5" aria-hidden="true" /></div>
              <CardTitle className="mt-3">Card alerts</CardTitle>
              <CardDescription>Stay informed about purchases, security, and wallet activity.</CardDescription>
            </CardHeader>
            <CardContent><Button variant="outline" asChild><Link to="/notifications/preferences">Set alert preferences <ArrowRight aria-hidden="true" /></Link></Button></CardContent>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}

type CardDetailProps = { cards?: ManagedCard[]; transactions?: CardTransaction[] };

export function CardDetailScreen({ cards = mockManagedCards, transactions = mockCardTransactions }: CardDetailProps) {
  const { id } = useParams({ strict: false });
  const card = cards.find((item) => item.id === id) ?? cards[0] ?? mockManagedCards[0];
  const cardTransactions = transactions.filter((transaction) => transaction.cardId === card.id);
  const [isFrozen, setIsFrozen] = useState(card.status === "Frozen");

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <Button variant="ghost" size="sm" className="-ml-2" asChild><Link to="/cards"><ArrowLeft aria-hidden="true" /> All cards</Link></Button>
        <div className="mt-5 grid gap-8 lg:grid-cols-[minmax(0,1fr)_0.8fr]">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <Text variant="muted">{card.type} card</Text>
                <Heading level={1} className="mt-1">{card.label}</Heading>
              </div>
              <Badge variant={isFrozen ? "outline" : "secondary"}>{isFrozen ? <Snowflake aria-hidden="true" /> : <Check aria-hidden="true" />}{isFrozen ? "Frozen" : "Active"}</Badge>
            </div>
            <CardVisual card={card} className="mt-7 max-w-xl" />
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Card><CardContent className="p-4"><Text variant="small">Available</Text><Text className="mt-1 text-lg font-semibold">{card.balance}</Text></CardContent></Card>
              <Card><CardContent className="p-4"><Text variant="small">This month</Text><Text className="mt-1 text-lg font-semibold">{card.monthlySpend}</Text></CardContent></Card>
              <Card className="col-span-2 sm:col-span-1"><CardContent className="p-4"><Text variant="small">Wallets</Text><Text className="mt-1 text-lg font-semibold">{card.walletCount} connected</Text></CardContent></Card>
            </div>
          </div>

          <Card className="h-fit">
            <CardHeader><CardTitle>Card controls</CardTitle><CardDescription>Make immediate changes to this card.</CardDescription></CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between gap-4"><div><Text className="font-medium">Freeze card</Text><Text variant="small">Pause new purchases until you turn it back on.</Text></div><Switch checked={isFrozen} onCheckedChange={setIsFrozen} aria-label="Freeze card" /></div>
              <Separator />
              <div className="flex items-center justify-between gap-4"><div><Text className="font-medium">Digital wallets</Text><Text variant="small">{card.walletCount} connected devices</Text></div><Button variant="outline" size="sm" asChild><Link to="/wallet">Manage</Link></Button></div>
              <Separator />
              <Dialog>
                <DialogTrigger asChild><Button variant="outline" className="w-full"><Eye aria-hidden="true" /> Show card details</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Card details</DialogTitle><DialogDescription>Keep these details private and never share them in a message.</DialogDescription></DialogHeader>
                  <div className="space-y-4 rounded-lg bg-muted p-4"><div className="flex justify-between gap-4"><Text variant="small">Card number</Text><Text as="span" className="font-mono font-medium">4111 4821 1092 3475</Text></div><div className="flex justify-between gap-4"><Text variant="small">Expires</Text><Text as="span" className="font-medium">{card.expires}</Text></div><div className="flex justify-between gap-4"><Text variant="small">Security code</Text><Text as="span" className="font-medium">482</Text></div></div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>

        <section className="mt-10" aria-labelledby="transactions-title">
          <div className="mb-4 flex items-center justify-between gap-3"><Heading id="transactions-title" level={2}>Recent card activity</Heading><Button variant="link" size="sm" asChild><Link to="/statement">View statement</Link></Button></div>
          <Card><CardContent className="divide-y p-0">{cardTransactions.map((transaction) => <div key={transaction.id} className="flex items-center justify-between gap-4 p-4 sm:p-5"><div className="flex min-w-0 items-center gap-3"><span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted"><ReceiptText className="size-4" aria-hidden="true" /></span><div className="min-w-0"><Text className="truncate font-medium">{transaction.merchant}</Text><Text variant="small">{transaction.category} · {transaction.date}</Text></div></div><div className="text-right"><Text className="font-medium">{transaction.amount}</Text><Text variant="small">{transaction.status}</Text></div></div>)}</CardContent></Card>
        </section>
      </div>
    </AppShell>
  );
}

export function CardIssueScreen() {
  const [choice, setChoice] = useState<"virtual" | "physical">("virtual");
  const isVirtual = choice === "virtual";

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <Button variant="ghost" size="sm" className="-ml-2" asChild><Link to="/cards"><ArrowLeft aria-hidden="true" /> Cards</Link></Button>
        <div className="mt-5"><Text variant="muted">New card</Text><Heading level={1} className="mt-1">Choose a card type</Heading><Text variant="muted" className="mt-2">Pick the card that fits how you want to spend.</Text></div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Button variant={isVirtual ? "default" : "outline"} className="h-auto justify-start p-5 text-left" onClick={() => setChoice("virtual")} aria-pressed={isVirtual}>
            <div><Smartphone className="mb-5 size-6" aria-hidden="true" /><span className="block text-base font-semibold">Virtual card</span><span className="mt-2 block text-sm font-normal opacity-75">Get a card number instantly for online purchases and digital wallets.</span></div>
          </Button>
          <Button variant={isVirtual ? "outline" : "default"} className="h-auto justify-start p-5 text-left" onClick={() => setChoice("physical")} aria-pressed={!isVirtual}>
            <div><CreditCard className="mb-5 size-6" aria-hidden="true" /><span className="block text-base font-semibold">Physical card</span><span className="mt-2 block text-sm font-normal opacity-75">Order a contactless card delivered to your home address.</span></div>
          </Button>
        </div>
        <Card className="mt-6"><CardHeader><CardTitle>{isVirtual ? "Ready in a moment" : "Delivered in 5–7 business days"}</CardTitle><CardDescription>{isVirtual ? "Your virtual card will be ready right away and can be added to a wallet." : "We’ll use the address in your profile and keep you updated along the way."}</CardDescription></CardHeader><CardContent className="flex flex-wrap gap-3"><Button asChild><Link to="/cards/issue/complete">Continue <ArrowRight aria-hidden="true" /></Link></Button><Button variant="outline" asChild><Link to="/profile">Review profile</Link></Button></CardContent></Card>
      </div>
    </AppShell>
  );
}

type CardIssuedProps = { card?: ManagedCard };

export function CardIssuedScreen({ card = mockManagedCards[1] }: CardIssuedProps) {
  const issuedCard = card;

  return (
    <AppShell>
      <div className="mx-auto flex min-h-[calc(100svh-4rem)] max-w-2xl flex-col justify-center px-4 py-10 sm:px-6">
        <div className="mx-auto w-full text-center"><span className="mx-auto flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground"><CircleCheck className="size-7" aria-hidden="true" /></span><Text variant="muted" className="mt-6">Card issued</Text><Heading level={1} className="mt-1">Your virtual card is ready</Heading><Text variant="muted" className="mx-auto mt-2 max-w-lg">Use it for secure online payments now, or add it to a digital wallet for tap-to-pay.</Text></div>
        <CardVisual card={issuedCard} className="mx-auto mt-8 w-full max-w-md text-left" />
        <div className="mx-auto mt-7 flex w-full max-w-md flex-col gap-3 sm:flex-row"><Button className="flex-1" asChild><Link to="/wallet">Add to wallet <Wallet aria-hidden="true" /></Link></Button><Button variant="outline" className="flex-1" asChild><Link to="/cards/$id" params={{ id: issuedCard.id }}>View card</Link></Button></div>
      </div>
    </AppShell>
  );
}

type WalletIntegrationProps = { wallets?: WalletConnection[]; cards?: ManagedCard[] };

export function WalletIntegrationScreen({ wallets = mockWalletConnections, cards = mockManagedCards }: WalletIntegrationProps) {
  const connectedCount = wallets.filter((wallet) => wallet.status === "Connected").length;
  const primaryCard = cards[0] ?? mockManagedCards[0];

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-start justify-between gap-4"><div><Text variant="muted">Wallet integration</Text><Heading level={1} className="mt-1">Digital wallets</Heading><Text variant="muted" className="mt-2">Use your Northstar card securely across the devices you carry.</Text></div><Badge variant="secondary"><Check aria-hidden="true" /> {connectedCount} connected</Badge></div>
        <div className="mt-8 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div><CardVisual card={primaryCard} compact /><Card className="mt-4"><CardContent className="flex gap-3 p-4"><ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" /><div><Text className="font-medium">Protected payments</Text><Text variant="small">Your card number is never shared when you tap to pay.</Text></div></CardContent></Card></div>
          <section aria-labelledby="wallets-title"><Heading id="wallets-title" level={2} className="mb-4">Choose a wallet</Heading><div className="space-y-3">{wallets.map((wallet) => <Card key={wallet.id} className="transition-shadow hover:shadow-sm"><Link to="/wallet/$wallet" params={{ wallet: wallet.id }} className="flex items-center gap-4 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"><span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted"><Smartphone className="size-5" aria-hidden="true" /></span><div className="min-w-0 flex-1"><Text className="font-medium">{wallet.name}</Text><Text variant="small">{wallet.status === "Connected" ? wallet.device : wallet.description}</Text></div><Badge variant={wallet.status === "Connected" ? "secondary" : "outline"}>{wallet.status}</Badge><ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" /></Link></Card>)}</div></section>
        </div>
      </div>
    </AppShell>
  );
}

type WalletSetupProps = { wallets?: WalletConnection[]; cards?: ManagedCard[] };

export function WalletSetupScreen({ wallets = mockWalletConnections, cards = mockManagedCards }: WalletSetupProps) {
  const { wallet: walletId } = useParams({ strict: false });
  const wallet = wallets.find((item) => item.id === walletId) ?? wallets[0];
  const card = cards.find((item) => item.id === wallet.cardId) ?? cards[0] ?? mockManagedCards[0];
  const [isComplete, setIsComplete] = useState(wallet.status === "Connected");

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <Button variant="ghost" size="sm" className="-ml-2" asChild><Link to="/wallet"><ArrowLeft aria-hidden="true" /> Digital wallets</Link></Button>
        <div className="mt-5"><Text variant="muted">{wallet.name}</Text><Heading level={1} className="mt-1">{isComplete ? "Your card is connected" : "Add a card to your wallet"}</Heading><Text variant="muted" className="mt-2">{isComplete ? `${card.label} is ready to use on ${wallet.device}.` : "Review the card you want to use, then confirm the secure setup."}</Text></div>
        <div className="mt-8 grid gap-6 md:grid-cols-[0.9fr_1.1fr]"><CardVisual card={card} compact /><Card><CardHeader><CardTitle>{isComplete ? "Wallet connection" : "Secure setup"}</CardTitle><CardDescription>{isComplete ? "Your wallet can now use this card for compatible purchases." : "You’ll confirm the connection with your device after continuing."}</CardDescription></CardHeader><CardContent>{isComplete ? <div className="space-y-4"><div className="flex items-center gap-3 rounded-lg bg-muted p-3"><Check className="size-4" aria-hidden="true" /><Text>{wallet.device}</Text></div><Button className="w-full" asChild><Link to="/cards/$id" params={{ id: card.id }}>Manage card</Link></Button></div> : <Button className="w-full" onClick={() => setIsComplete(true)}>Add to {wallet.name} <ArrowRight aria-hidden="true" /></Button>}</CardContent></Card></div>
      </div>
    </AppShell>
  );
}
