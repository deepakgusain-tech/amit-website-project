import Link from "next/link"
import {
  ArrowRight,
  BadgeCheck,
  BellRing,
  BriefcaseBusiness,
  ChartColumnBig,
  CircleCheckBig,
  FileText,
  Globe2,
  Mail,
  PanelTop,
  Settings,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const stats = [
  { label: "New enquiries", value: "128", change: "+14%", icon: Mail },
  { label: "Career applications", value: "42", change: "+8%", icon: BriefcaseBusiness },
  { label: "Published pages", value: "18", change: "+3", icon: FileText },
  { label: "Active users", value: "9", change: "2 admins online", icon: Users },
]

const modules = [
  {
    title: "Lead management",
    description: "Track enquiry volume, assign follow-ups, and keep response times visible.",
    href: "/admin/enquiry",
    icon: Mail,
  },
  {
    title: "Career pipeline",
    description: "Review applications, shortlist candidates, and keep hiring organized.",
    href: "/admin/career",
    icon: BriefcaseBusiness,
  },
  {
    title: "Content controls",
    description: "Manage banners, service pages, and homepage content from one place.",
    href: "/admin/banner",
    icon: PanelTop,
  },
  {
    title: "User access",
    description: "Create roles, manage permissions, and keep the admin team tidy.",
    href: "/admin/user",
    icon: Users,
  },
]

const tasks = [
  { label: "Reply to new enquiries", status: "5 waiting", tone: "amber" },
  { label: "Review career applications", status: "12 pending", tone: "blue" },
  { label: "Publish homepage update", status: "Scheduled", tone: "emerald" },
  { label: "Check site configuration", status: "Needs review", tone: "slate" },
]

const activity = [
  "New contact form submission from Mumbai",
  "Career application received for Back Office Executive",
  "Banner updated for summer hiring campaign",
  "General settings saved by Admin",
]

const toneClasses: Record<string, string> = {
  amber: "border-amber-200 bg-amber-50 text-amber-700",
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  emerald: "border-emerald-200 bg-emerald-50 text-emerald-700",
  slate: "border-slate-200 bg-slate-50 text-slate-700",
}

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6 pb-6">
      <section className="relative overflow-hidden rounded-3xl border border-slate-200 bg-[linear-gradient(135deg,#0f172a_0%,#111827_45%,#1d4ed8_100%)] px-6 py-8 text-white shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:px-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.16),transparent_28%)]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <Badge className="mb-4 bg-white/10 text-white hover:bg-white/15">
              <Sparkles className="mr-1 size-3.5" />
              Admin command center
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Manage the website with a clean, focused control panel.
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-200 sm:text-base">
              Monitor leads, review careers, update content, and keep the site
              running smoothly without jumping between cluttered screens.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { label: "Uptime", value: "99.9%", icon: CircleCheckBig },
              { label: "Security", value: "Healthy", icon: ShieldCheck },
              { label: "Traffic", value: "Steady", icon: ChartColumnBig },
              { label: "Alerts", value: "2", icon: BellRing },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur"
              >
                <item.icon className="size-4 text-sky-200" />
                <p className="mt-3 text-xs text-slate-300">{item.label}</p>
                <p className="text-lg font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="border-slate-200/80 shadow-sm">
            <CardContent className="flex items-center justify-between p-5">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-emerald-600">{stat.change}</p>
              </div>
              <div className="flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <stat.icon className="size-5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="border-slate-200/80">
          <CardHeader className="pb-4">
            <CardTitle>Core modules</CardTitle>
            <CardDescription>
              The main areas your team will use every day.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {modules.map((module) => (
              <Link
                key={module.title}
                href={module.href}
                className="group rounded-2xl border border-slate-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
              >
                <module.icon className="size-5 text-blue-600" />
                <h3 className="mt-4 text-base font-semibold text-slate-900">
                  {module.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {module.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-blue-600">
                  Open module
                  <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200/80">
          <CardHeader className="pb-4">
            <CardTitle>Today&apos;s priorities</CardTitle>
            <CardDescription>
              A short list to keep the admin work moving.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.label}
                className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{task.label}</p>
                  <p className="mt-1 text-xs text-slate-500">{task.status}</p>
                </div>
                <Badge
                  variant="outline"
                  className={toneClasses[task.tone]}
                >
                  {task.status}
                </Badge>
              </div>
            ))}

            <Separator className="my-5" />

            <div className="rounded-2xl bg-slate-950 p-5 text-white">
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <Globe2 className="size-4" />
                Public site status
              </div>
              <p className="mt-3 text-lg font-semibold">All main pages are live</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Career, services, contact, and home sections are available for
                visitors.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="border-slate-200/80">
          <CardHeader className="pb-4">
            <CardTitle>Recent activity</CardTitle>
            <CardDescription>
              Lightweight audit trail for the latest updates.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {activity.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <BadgeCheck className="mt-0.5 size-4 text-emerald-500" />
                <p className="text-sm leading-6 text-slate-700">{item}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200/80">
          <CardHeader className="pb-4">
            <CardTitle>Quick actions</CardTitle>
            <CardDescription>
              Shortcuts for the most common admin tasks.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button asChild className="justify-between rounded-2xl px-4 py-6" size="lg">
              <Link href="/admin/enquiry">
                Review enquiries
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="justify-between rounded-2xl px-4 py-6"
              size="lg"
            >
              <Link href="/admin/banner">
                Update banners
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="justify-between rounded-2xl px-4 py-6"
              size="lg"
            >
              <Link href="/admin/configuration">
                Open settings
                <Settings className="size-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
