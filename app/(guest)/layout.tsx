import type { Metadata } from "next"
import { GuestFooter } from "@/components/guest-footer"
import { GuestNavbar } from "@/components/guest-navbar"
import { getSettings } from "@/lib/actions/settings-action"
import { getServices } from "@/lib/actions/service-action"

export const metadata: Metadata = {
  title: "Amit Website - Guest",
  description: "Guest-facing frontend pages",
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
