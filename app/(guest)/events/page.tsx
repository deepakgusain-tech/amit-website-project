import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import moment from "moment"
import {
  ArrowRight,
  CalendarDays,
  Clock3,
  MapPin,
} from "lucide-react"

import eventImage from "@/images/technology.jpg"
import { EventGallery } from "../../../components/event-gallery"
import { getUpcommingEvents, getUpcommingFeatureEvent } from "@/lib/actions/upcomming-events"
import { getSettings } from "@/lib/actions/settings-action"

export const metadata: Metadata = {
  title: "Events | AS Services",
  description:
    "Meet AS Services at practical conversations, workshops, and business technology events.",
}


const getDaysToGo = (eventDate: Date | string) => Math.max(
  0,
  moment(eventDate).startOf("day").diff(moment().startOf("day"), "days")
);

export default async function EventsPage() {

  const configuration = await getSettings();

  const events = await getUpcommingEvents();

  const featuredEvent = await getUpcommingFeatureEvent();

  return (
    <div className="overflow-hidden bg-[#eef3f8] text-slate-900">
      <section className="relative isolate overflow-hidden bg-[#102f45] pt-32 text-white sm:pt-36">
        <Image src={configuration?.eventHeroBackgroundImagePath ? "/api" + configuration.eventHeroBackgroundImagePath : eventImage} alt="People collaborating around technology" fill priority className="object-cover opacity-30" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,47,69,0.98)_0%,rgba(16,47,69,0.84)_48%,rgba(16,47,69,0.55)_100%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:pb-28">
          <div className="flex flex-col items-start justify-center gap-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-orange-300/40 bg-orange-500/15 px-4 py-2 text-sm font-medium text-orange-100">
              <CalendarDays className="size-4 text-orange-300" />
              {configuration?.eventHeroTagline && (
                <span className="ml-2">{configuration.eventHeroTagline}</span>
              )}
            </div>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-orange-400 sm:text-5xl lg:text-6xl">
              {
                configuration?.eventHeroTitle && (
                  <span className="block mt-4 text-3xl font-normal text-white sm:text-4xl lg:text-5xl">
                    {configuration.eventHeroTitle}
                  </span>
                )
              }
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200 sm:text-xl">
              { configuration?.eventHeroDescription && (
                  <span className="block mt-4 text-lg font-normal text-slate-200 sm:text-xl">
                    {configuration.eventHeroDescription}
                  </span>
                )}
            </p>
            <Link href="#upcoming" className="mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-orange-500 px-6 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(249,115,22,0.28)] transition hover:-translate-y-0.5 hover:bg-orange-600">
              Explore upcoming events <ArrowRight className="size-4" />
            </Link>
          </div>

          {
            featuredEvent && <div className=" rounded-[1.75rem] border border-white/15 bg-white/10 p-6 backdrop-blur-md sm:p-8">
              {featuredEvent.images[0] && (
                <div className="relative mb-6 aspect-video w-full overflow-hidden rounded-2xl bg-slate-900/30">
                  <Image
                    src={"/api" + featuredEvent.images[0].url}
                    alt={featuredEvent.title}
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover transition duration-500 hover:scale-105"
                  />
                </div>
              )}
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-orange-300">Featured event</p>
              <h2 className="mt-4 text-2xl font-semibold text-white sm:text-3xl">{featuredEvent?.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-200">{featuredEvent?.description}</p>
              <div className="mt-6 grid gap-3 text-sm text-slate-200">
                <span className="inline-flex items-center gap-3"><CalendarDays className="size-4 text-orange-300" />{moment(featuredEvent?.eventDate).format("D MMMM YYYY")}</span>
                <span className="inline-flex items-center gap-3"><MapPin className="size-4 text-orange-300" />{featuredEvent?.location}</span>
              </div>
            </div>
          }
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
            {events.length > 0 && events.map((event: any) => (
              event.status === "NEW" && <article key={event.title} className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-slate-200 bg-slate-50 shadow-[0_16px_40px_rgba(15,23,42,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(15,23,42,0.1)]">
                <div className="relative h-52 overflow-hidden bg-slate-200">
                  <Image
                    src={event.images[0]}
                    alt={event.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-transparent to-transparent" />
                  <span className="absolute bottom-4 left-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                    <CalendarDays className="size-4 text-white" />
                    Save the date
                  </span>
                </div>
                <div className={`bg-orange-500 flex items-center justify-between px-6 py-5 text-white`}>
                  <div><p className="text-4xl font-semibold leading-none">{moment(event.eventDate).format("D")}</p><p className="mt-1 text-xs font-bold tracking-[0.25em]">{moment(event.eventDate).format("MMMM")}</p></div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold">{event.category}</span>
                    <span className="text-xs font-semibold">
                      {getDaysToGo(event.eventDate)} {getDaysToGo(event.eventDate) === 1 ? "day" : "days"} to go
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-xl font-semibold text-[#185980]">{event.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{event.description}</p>
                  <div className="mt-auto grid gap-3 border-t border-slate-200 pt-5 text-sm text-slate-600">
                    <span className="inline-flex items-center gap-2"><Clock3 className="size-4 text-orange-500" />{moment(event.startTime, 'HH:mm').format('h:mm A')}</span>
                    <span className="inline-flex items-center gap-2"><MapPin className="size-4 text-orange-500" />{event.location}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <EventGallery events={events} />

      <section className="bg-white px-4 py-16 sm:py-20"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 rounded-[1.75rem] bg-[#185980] p-8 text-white sm:flex-row sm:items-center sm:p-12"><div><p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-300">{configuration?.eventContactTitle}</p><h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{configuration?.eventContactDescription}</h2></div><Link href="/contact" className="inline-flex shrink-0 items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-600">Get event details <ArrowRight className="size-4" /></Link></div></section>
    </div>
  )
}