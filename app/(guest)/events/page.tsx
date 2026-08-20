import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  Sparkles,
  UsersRound,
} from "lucide-react"

import eventImage from "@/images/technology.jpg"
import operationsImage from "@/images/outsourcing.jpg"
import analyticsImage from "@/images/analatics.jpg"

export const metadata: Metadata = {
  title: "Events | AS Services",
  description:
    "Meet AS Services at practical conversations, workshops, and business technology events.",
}

const events = [
  {
    date: "18",
    month: "SEP",
    title: "Operations That Scale",
    type: "Leadership roundtable",
    location: "New Delhi | Hybrid",
    time: "10:30 AM - 1:00 PM",
    description:
      "A focused conversation on building dependable processes while keeping teams agile and client-ready.",
    image: operationsImage,
    imageAlt: "Team collaborating on business operations",
    accent: "bg-orange-500",
  },
  {
    date: "04",
    month: "OCT",
    title: "Data Clarity Workshop",
    type: "Interactive workshop",
    location: "Online session",
    time: "3:00 PM - 4:30 PM",
    description:
      "Learn how clean reporting rhythms and useful dashboards can turn everyday operations into better decisions.",
    image: analyticsImage,
    imageAlt: "Analytics dashboard on a laptop",
    accent: "bg-[#185980]",
  },
  {
    date: "22",
    month: "NOV",
    title: "The Service Desk Exchange",
    type: "Industry meetup",
    location: "Gurugram | In person",
    time: "5:30 PM - 7:30 PM",
    description:
      "Connect with service leaders sharing practical lessons from support, delivery, and customer experience teams.",
    image: eventImage,
    imageAlt: "Technology leaders discussing a digital presentation",
    accent: "bg-cyan-600",
  },
]

const formats = [
  { icon: UsersRound, title: "Roundtables", text: "Small-group conversations with people solving similar operational challenges." },
  { icon: Sparkles, title: "Workshops", text: "Hands-on sessions built around useful tools, habits, and measurable outcomes." },
  { icon: CheckCircle2, title: "Meetups", text: "Informal industry gatherings for exchanging ideas and making useful connections." },
]

export default function EventsPage() {
  return (
    <div className="overflow-hidden bg-[#eef3f8] text-slate-900">
      <section className="relative isolate overflow-hidden bg-[#102f45] pt-32 text-white sm:pt-36">
        <Image src={eventImage} alt="People collaborating around technology" fill priority className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,47,69,0.98)_0%,rgba(16,47,69,0.84)_48%,rgba(16,47,69,0.55)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/40 bg-orange-500/15 px-4 py-2 text-sm font-medium text-orange-100">
              <CalendarDays className="size-4 text-orange-300" />
              Connect, learn, move forward
            </div>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-orange-400 sm:text-5xl lg:text-6xl">
              Ideas are better when they move through a room.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              Join AS Services for thoughtful conversations, practical workshops,
              and meetups built around the way modern teams actually work.
            </p>
            <Link href="#upcoming" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-orange-500 px-6 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(249,115,22,0.28)] transition hover:-translate-y-0.5 hover:bg-orange-600">
              Explore upcoming events <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="self-end rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-300">Featured event</p>
            <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">Operations That Scale</h2>
            <p className="mt-3 text-sm leading-7 text-slate-200">A candid roundtable for leaders building reliable, flexible delivery teams.</p>
            <div className="mt-6 grid gap-3 text-sm text-slate-200">
              <span className="inline-flex items-center gap-3"><CalendarDays className="size-4 text-orange-300" />18 September 2026</span>
              <span className="inline-flex items-center gap-3"><MapPin className="size-4 text-orange-300" />New Delhi and online</span>
            </div>
          </div>
        </div>
      </section>

      <section id="upcoming" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-orange-500">Upcoming events</p>
              <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#185980] sm:text-4xl">Make time for useful conversations.</h2>
              <p className="mt-4 text-base leading-7 text-slate-600">Small, focused gatherings for people who care about better delivery and better work.</p>
            </div>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#185980] hover:text-orange-600">Host a conversation <ArrowRight className="size-4" /></Link>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {events.map((event) => (
              <article key={event.title} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.1)]">
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <Image
                    src={event.image}
                    alt={event.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    <CalendarDays className="size-4 text-orange-300" />
                    Save the date
                  </span>
                </div>
                <div className={`${event.accent} flex items-center justify-between px-6 py-5 text-white`}>
                  <div><p className="text-4xl font-semibold leading-none">{event.date}</p><p className="mt-1 text-xs font-bold tracking-[0.25em]">{event.month}</p></div>
                  <span className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold">{event.type}</span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-[#185980]">{event.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{event.description}</p>
                  <div className="mt-auto grid gap-3 border-t border-slate-200 pt-5 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-orange-500" />{event.time}</span>
                    <span className="inline-flex items-center gap-2"><MapPin className="size-4 text-orange-500" />{event.location}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#eef3f8] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.34em] text-orange-500">What to expect</p><h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#185980] sm:text-4xl">A useful room, every time.</h2></div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {formats.map(({ icon: Icon, title, text }) => <div key={title} className="rounded-2xl border border-slate-200 bg-white p-6"><div className="flex size-11 items-center justify-center rounded-xl bg-[#185980] text-white"><Icon className="size-5" /></div><h3 className="mt-5 text-lg font-semibold text-slate-950">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{text}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-white px-4 py-16 sm:py-20"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-[#185980] p-8 text-white sm:flex-row sm:items-center sm:p-12"><div><p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">Stay in the loop</p><h2 className="mt-3 text-2xl font-semibold sm:text-3xl">Bring your questions. We’ll bring the conversation.</h2></div><Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">Get event details <ArrowRight className="size-4" /></Link></div></section>
    </div>
  )
}