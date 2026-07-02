import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

import { serviceContent } from "./service-data"

export const metadata = {
  title: "Services | AS Services",
  description:
    "Explore the core services offered by AS Services across operations, analytics, technical support, and recovery support.",
}

export default function ServicesPage() {
  return (
    <div className="relative overflow-hidden bg-[#eef3f8] text-slate-900">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.05),transparent_34%),linear-gradient(180deg,rgba(248,250,252,0.92)_0%,rgba(236,242,248,1)_100%)]" />

      <section className="relative pt-28 sm:pt-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.34em] text-slate-500">
              Services
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-balance text-slate-950 sm:text-5xl">
              The services we deliver with clarity and consistency.
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600 sm:text-xl">
              Each service page gives you a focused view of what we do, how we
              support clients, and the outcomes we aim to create.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {serviceContent.map((service) => {
              const Icon = service.icon

              return (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group block h-full overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_18px_50px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,23,42,0.12)]"
                >
                  <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${service.accent}`} />
                  <div className="relative flex h-full flex-col p-6">
                    <div className="flex size-12 items-center justify-center rounded-2xl border border-sky-200 bg-sky-50 text-cyan-700 shadow-[0_8px_20px_rgba(14,165,233,0.08)]">
                      <Icon className="size-5" />
                    </div>
                    <h2 className="mt-5 text-[1.05rem] font-semibold tracking-tight text-slate-950 sm:text-[1.15rem]">
                      {service.title}
                    </h2>
                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {service.summary}
                    </p>

                    <div className="mt-5 space-y-3">
                      {service.cardPoints.map((point) => (
                        <div key={point} className="flex items-center gap-2 text-sm text-slate-600">
                          <span className="h-2.5 w-2.5 rounded-full border border-emerald-500 text-emerald-500" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-auto pt-6 inline-flex items-center gap-2 text-sm font-semibold text-cyan-700 transition group-hover:gap-3">
                      View service details
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-12">
            <Button asChild size="lg" className="rounded-full px-6">
              <Link href="/contact" className="inline-flex items-center gap-2">
                Talk to us
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
