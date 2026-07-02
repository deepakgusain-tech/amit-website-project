"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BarChart3,
  BriefcaseBusiness,
  Command,
  LayoutDashboardIcon,
  Mail,
  Settings,
  UsersIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Admin",
    email: "admin@asservices.in",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/admin/dashboard",
      icon: <LayoutDashboardIcon />,
    },
    {
      title: "Leads",
      url: "/admin/enquiry",
      icon: <Mail />,
    },
    {
      title: "Career Applications",
      url: "/admin/career",
      icon: <BriefcaseBusiness />,
    },
    {
      title: "Users",
      url: "/admin/user",
      icon: <UsersIcon />,
    },
    {
      title: "Content",
      url: "/admin/banner",
      icon: <BarChart3 />,
    },
    {
      title: "Configuration",
      url: "/admin/configuration",
      icon: <Settings />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  className="data-[slot=sidebar-menu-button]:p-1.5!"
                >
                  <a href="/admin/dashboard">
                    <Command className="size-5!" />
                    <span className="text-base font-semibold">AS Services</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
