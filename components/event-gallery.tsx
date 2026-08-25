"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

import type { UpcommingEvent } from "@/lib/types"

type GalleryItem = {
  image: string
  alt: string
  eventTitle: string
  label: string
  className: string
}

export function EventGallery({ events }: { events: UpcommingEvent[] }) {
  const [activeCategory, setActiveCategory] = useState("All")
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const galleryItems: GalleryItem[] = events.flatMap((event) =>
    event.images.map((image, index) => ({
      image,
      alt: `${event.title} image ${index + 1}`,
      eventTitle: event.title,
      label: event.title,
      className: "",
    }))
  )
  const categories = ["All", ...Array.from(new Set(events.map((event) => event.title)))]
  const visibleItems = activeCategory === "All"
    ? galleryItems
    : galleryItems.filter((item) => item.eventTitle === activeCategory)

  const selectedItem = selectedIndex === null ? null : visibleItems[selectedIndex]

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null)
      if (event.key === "ArrowRight") {
        setSelectedIndex((index) => index === null ? 0 : (index + 1) % visibleItems.length)
      }
      if (event.key === "ArrowLeft") {
        setSelectedIndex((index) => index === null ? 0 : (index - 1 + visibleItems.length) % visibleItems.length)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [selectedIndex, visibleItems.length])

  return (
    <section className="bg-[#eef3f8] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.34em] text-orange-500">Event showcase</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#185980] sm:text-4xl">A closer look at the conversations.</h2>
          <p className="mt-4 text-base leading-7 text-slate-600">Browse moments from our workshops, meetings, and industry gatherings.</p>
        </div>

        <div className="mt-8 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => { setActiveCategory(category); setSelectedIndex(null) }}
                className={`h-12 whitespace-nowrap rounded-xl border px-5 text-sm font-semibold transition ${activeCategory === category ? "border-[#185980] bg-[#185980] text-white shadow-[0_10px_24px_rgba(24,89,128,0.2)]" : "border-slate-200 bg-white text-slate-600 hover:border-orange-300 hover:text-orange-600"}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {visibleItems.map((item) => (
              <figure key={`${item.eventTitle}-${item.image}`} className={`group relative h-64 overflow-hidden rounded-xl bg-slate-100 md:h-72 ${item.className}`}>
              <button type="button" onClick={() => setSelectedIndex(visibleItems.indexOf(item))} className="absolute inset-0 z-10 cursor-zoom-in" aria-label={`Open ${item.label} image`}>
                <Image src={item.image} alt={item.alt} fill sizes="(min-width: 768px) 25vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <figcaption className="absolute inset-x-0 bottom-0 p-4 text-sm font-semibold text-white">{item.label}</figcaption>
            </figure>
          ))}
        </div>

        {visibleItems.length === 0 && <p className="mt-8 rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">More event moments are coming soon.</p>}
      </div>

      {selectedItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedItem.label} image preview`}
          onClick={() => setSelectedIndex(null)}
        >
          <button type="button" onClick={() => setSelectedIndex(null)} className="absolute right-4 top-4 z-20 inline-flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Close image preview">
            <X className="size-6" />
          </button>
          <button type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex - 1 + visibleItems.length) % visibleItems.length) }} className="absolute left-3 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-6" aria-label="Previous image">
            <ChevronLeft className="size-6" />
          </button>
          <div className="relative h-[80vh] w-full max-w-6xl" onClick={(event) => event.stopPropagation()}>
            <Image src={selectedItem.image} alt={selectedItem.alt} fill sizes="100vw" className="object-contain" priority />
            <p className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full bg-slate-950/70 px-4 py-2 text-center text-sm font-semibold text-white">{selectedItem.label}</p>
          </div>
          <button type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + 1) % visibleItems.length) }} className="absolute right-3 top-1/2 z-20 inline-flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-6" aria-label="Next image">
            <ChevronRight className="size-6" />
          </button>
        </div>
      )}
    </section>
  )
}