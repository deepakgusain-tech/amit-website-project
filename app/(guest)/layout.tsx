import type { Metadata } from "next"
import { GuestFooter } from "@/components/guest-footer"
import { GuestNavbar } from "@/components/guest-navbar"

export const metadata: Metadata = {
  title: "Amit Website - Guest",
  description: "Guest-facing frontend pages",
}

export default function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <GuestNavbar />
      <main className="min-h-screen bg-transparent text-slate-900">
        {children}
      </main>
      <GuestFooter />
    </>
  )
}
