import type { Metadata } from "next"
import { getSettings } from "@/lib/actions/settings-action"

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSettings();

  return {
    title: settings?.siteName || "As services",

    description:
      settings?.metaDescription ||
      "Welcome to As services. Explore our services and solutions.",

    keywords: settings?.metaKeywords
      ? settings.metaKeywords.split(",").map((keyword) => keyword.trim())
      : [
        "Services",
        "Solutions",
        "Technology",
        "Business",
      ],

    icons: {
      icon: settings?.faviconPath
        ? `/api${settings.faviconPath}`
        : "/favicon.ico",
    },
  };
}

export default async function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {

  return (
    <>
      {children}
    </>
  )
}
