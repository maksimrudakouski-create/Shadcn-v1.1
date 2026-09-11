import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, Bell, Check, ChevronRight, CreditCard, Settings2, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppShell } from "@/shared/ui/app-shell";
import { Heading, Text } from "@/shared/ui/typography";
import {
  type CardNotification,
  type NotificationPreference,
  mockCardNotifications,
  mockNotificationPreferences,
} from "../_mocks/cards";

type NotificationsProps = { notifications?: CardNotification[] };

export function NotificationsScreen({ notifications = mockCardNotifications }: NotificationsProps) {
  const unreadCount = notifications.filter((notification) => notification.unread).length;

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-start justify-between gap-4"><div><Text variant="muted">Stay informed</Text><Heading level={1} className="mt-1">Notifications</Heading><Text variant="muted" className="mt-2">Important updates for your cards, wallets, and account.</Text></div><Button variant="outline" asChild><Link to="/notifications/preferences"><Settings2 aria-hidden="true" /> Preferences</Link></Button></div>
        <Tabs defaultValue="all" className="mt-8">
          <TabsList><TabsTrigger value="all">All</TabsTrigger><TabsTrigger value="unread">Unread <Badge className="ml-1 size-4 justify-center rounded-full p-0 text-[10px]">{unreadCount}</Badge></TabsTrigger></TabsList>
          <TabsContent value="all" className="mt-5"><NotificationList notifications={notifications} /></TabsContent>
          <TabsContent value="unread" className="mt-5"><NotificationList notifications={notifications.filter((notification) => notification.unread)} emptyMessage="You’re all caught up." /></TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}

type NotificationListProps = { notifications: CardNotification[]; emptyMessage?: string };

function NotificationList({ notifications, emptyMessage }: NotificationListProps) {
  if (notifications.length === 0) {
    return <Card><CardContent className="p-8 text-center"><Check className="mx-auto size-6" aria-hidden="true" /><Heading level={3} className="mt-3">{emptyMessage ?? "No notifications"}</Heading><Text variant="muted" className="mt-1">New updates will appear here.</Text></CardContent></Card>;
  }

  return (
    <Card><CardContent className="divide-y p-0">{notifications.map((notification) => <div key={notification.id} className="flex gap-4 p-5"><span className={notification.unread ? "mt-2 size-2 shrink-0 rounded-full bg-primary" : "mt-2 size-2 shrink-0 rounded-full bg-border"} aria-label={notification.unread ? "Unread" : "Read"} /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-start justify-between gap-x-4 gap-y-1"><Text className="font-medium">{notification.title}</Text><Text variant="small">{notification.date}</Text></div><Text variant="muted" className="mt-1">{notification.description}</Text>{notification.cardId ? <Button variant="link" size="sm" className="mt-2 h-auto px-0" asChild><Link to="/cards/$id" params={{ id: notification.cardId }}>View card <ChevronRight aria-hidden="true" /></Link></Button> : null}</div></div>)}</CardContent></Card>
  );
}

type NotificationPreferencesProps = { preferences?: NotificationPreference[] };

export function NotificationPreferencesScreen({ preferences = mockNotificationPreferences }: NotificationPreferencesProps) {
  const [settings, setSettings] = useState(preferences);
  const enabledCount = settings.filter((setting) => setting.enabled).length;

  const togglePreference = (id: string, enabled: boolean) => {
    setSettings((current) => current.map((setting) => (setting.id === id ? { ...setting, enabled } : setting)));
  };

  return (
    <AppShell>
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
        <Button variant="ghost" size="sm" className="-ml-2" asChild><Link to="/notifications"><ArrowLeft aria-hidden="true" /> Notifications</Link></Button>
        <div className="mt-5"><Text variant="muted">Notification settings</Text><Heading level={1} className="mt-1">What should we alert you about?</Heading><Text variant="muted" className="mt-2">Choose the card and wallet updates that matter to you.</Text></div>
        <Card className="mt-8"><CardHeader className="flex-row items-start justify-between gap-4 space-y-0"><div><CardTitle>Alert preferences</CardTitle><CardDescription>{enabledCount} of {settings.length} alerts enabled</CardDescription></div><Badge variant="secondary"><Bell aria-hidden="true" /> Push</Badge></CardHeader><CardContent className="divide-y">{settings.map((setting, index) => <div key={setting.id} className={index === 0 ? "flex items-center justify-between gap-5 pb-5" : "flex items-center justify-between gap-5 py-5"}><div><Text className="font-medium">{setting.title}</Text><Text variant="small" className="mt-1">{setting.description}</Text></div><Switch checked={setting.enabled} onCheckedChange={(checked) => togglePreference(setting.id, checked)} aria-label={setting.title} /></div>)}</CardContent></Card>
        <section className="mt-7 grid gap-4 sm:grid-cols-2" aria-label="Notification help"><Card><CardContent className="flex gap-3 p-4"><CreditCard className="mt-0.5 size-5 shrink-0" aria-hidden="true" /><div><Text className="font-medium">Purchase controls</Text><Text variant="small">Freeze a card any time from its detail page.</Text><Button variant="link" size="sm" className="mt-2 h-auto px-0" asChild><Link to="/cards">Manage cards <ChevronRight aria-hidden="true" /></Link></Button></div></CardContent></Card><Card><CardContent className="flex gap-3 p-4"><ShieldCheck className="mt-0.5 size-5 shrink-0" aria-hidden="true" /><div><Text className="font-medium">Security first</Text><Text variant="small">We’ll always send essential security alerts.</Text><Button variant="link" size="sm" className="mt-2 h-auto px-0" asChild><Link to="/security">Review security <ChevronRight aria-hidden="true" /></Link></Button></div></CardContent></Card></section>
      </div>
    </AppShell>
  );
}
