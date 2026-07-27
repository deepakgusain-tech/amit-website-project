import type { Metadata } from "next"
import { GuestFooter } from "@/components/guest-footer"
import { GuestNavbar } from "@/components/guest-navbar"
import { getSettings } from "@/lib/actions/settings-action"
import { getServices } from "@/lib/actions/service-action"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings?.siteName || "Amit Website - Guest",
    icons: {
      icon: settings?.faviconPath ? `/api${settings.faviconPath}` : "/favicon.ico",
    },
  };
}

export default async function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  const settings = await getSettings();
  const services = await getServices();

  return (
    <>
      <GuestNavbar settings={settings} />
      <main className="min-h-screen bg-transparent text-slate-900">
        {children}
      </main>
      <GuestFooter settings={settings} services={services} />
    </>
  )
}
