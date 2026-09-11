import { Link } from "@tanstack/react-router";
import { ArrowDownToLine, Bell, Check, ChevronRight, CreditCard, ReceiptText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AppShell } from "@/shared/ui/app-shell";
import { Heading, Text } from "@/shared/ui/typography";
import { type AccountOverview, type ActivityItem, type Profile, mockAccountOverview, mockActivity, mockProfile } from "../_mocks/account";

type HomeProps = { profile?: Profile; overview?: AccountOverview; activity?: ActivityItem[] };

export function HomeScreen({ profile = mockProfile, overview = mockAccountOverview, activity = mockActivity }: HomeProps) {
  return (
    <AppShell>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div><Text variant="muted">Good morning</Text><Heading level={1} className="mt-1">{profile.name.split(" ")[0]}</Heading></div>
          <Badge variant="secondary"><Check aria-hidden="true" /> Identity verified</Badge>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
          <Card className="bg-primary text-primary-foreground">
            <CardHeader><CardDescription className="text-primary-foreground/70">Available balance</CardDescription><CardTitle className="text-4xl tracking-tight text-primary-foreground">{overview.availableBalance}</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap items-center justify-between gap-3 text-sm text-primary-foreground/80"><span>{overview.accountType} · {overview.accountNumber}</span><Button variant="secondary" size="sm" asChild><Link to="/statement"><ArrowDownToLine aria-hidden="true" /> Statement</Link></Button></CardContent>
          </Card>
          <Card><CardHeader><CardTitle>Account status</CardTitle><CardDescription>{overview.nextStep}</CardDescription></CardHeader><CardContent><Button variant="outline" size="sm" asChild><Link to="/profile">View profile <ChevronRight aria-hidden="true" /></Link></Button></CardContent></Card>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <section aria-labelledby="activity-title"><div className="mb-4 flex items-center justify-between"><Heading id="activity-title" level={2}>Recent activity</Heading><Button variant="link" size="sm" asChild><Link to="/cards">View cards</Link></Button></div><Card><CardContent className="divide-y p-0">{activity.map((item) => <div key={item.id} className="flex items-center justify-between gap-4 p-4"><div><Text className="font-medium">{item.merchant}</Text><Text variant="small">{item.category} · {item.date}</Text></div><Text className={item.amount.startsWith("+") ? "font-medium text-primary" : "font-medium"}>{item.amount}</Text></div>)}</CardContent></Card></section>
          <section aria-labelledby="quick-actions-title"><Heading id="quick-actions-title" level={2} className="mb-4">Quick actions</Heading><div className="grid gap-3"><Button variant="outline" className="justify-start" asChild><Link to="/cards"><CreditCard aria-hidden="true" /> Manage cards</Link></Button><Button variant="outline" className="justify-start" asChild><Link to="/notifications"><Bell aria-hidden="true" /> Notifications</Link></Button><Button variant="outline" className="justify-start" asChild><Link to="/statement"><ReceiptText aria-hidden="true" /> Download statement</Link></Button></div></section>
        </div>
      </div>
    </AppShell>
  );
}

type StatementProps = { overview?: AccountOverview };

export function StatementScreen({ overview = mockAccountOverview }: StatementProps) {
  return <AppShell><div className="mx-auto w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-10"><Heading level={1}>Account statement</Heading><Text variant="muted" className="mt-1">Your latest monthly account summary.</Text><Card className="mt-7"><CardHeader><CardTitle>August 2026</CardTitle><CardDescription>{overview.accountType} · {overview.accountNumber}</CardDescription></CardHeader><CardContent className="space-y-5"><div><Text variant="small">Closing balance</Text><Text className="text-2xl font-semibold">{overview.availableBalance}</Text></div><Separator /><Text variant="muted">Your statement is ready to download as a PDF.</Text><Button size="lg" asChild><Link to="/home"><ArrowDownToLine aria-hidden="true" /> Download PDF</Link></Button></CardContent></Card></div></AppShell>;
}
