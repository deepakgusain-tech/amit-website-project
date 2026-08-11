import type { Metadata } from "next"
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { redirect } from "next/navigation";
import { getSettings } from "@/lib/actions/settings-action"

export const dynamic = "force-dynamic"


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

export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const session = await getServerSession(authOptions);

    if(!session?.user) {
        redirect("/login")
    }

    return (
        <SidebarProvider
            style={
                {
                    "--sidebar-width": "calc(var(--spacing) * 72)",
                    "--header-height": "calc(var(--spacing) * 12)",
                } as React.CSSProperties
            }
        >
            <AppSidebar variant="inset" user={session.user} />
            <SidebarInset>
                <SiteHeader />
                <div className="flex flex-1 flex-col">
                    <div className="@container/main flex flex-1 flex-col gap-2 p-4">
                        {children}
                    </div>
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}
