import Image, { type StaticImageData } from "next/image"
import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import outsourcingImage from "../images/outsourcing.jpg"
import analyticsImage from "../images/analatics.jpg"
import technologyImage from "../images/technology.jpg"

type ServiceFeatureProps = {
  index: string
  eyebrow: string
  title: string
  summary: string
  imageSrc: StaticImageData | string
  imageAlt: string
  bullets: string[]
  reverse?: boolean
}

function ServiceFeature({
  index,
  eyebrow,
  title,
  summary,
  imageSrc,
  imageAlt,
  bullets,
  reverse = false,
}: ServiceFeatureProps) {
  return (
    <div
      className={[
        "grid gap-6 lg:items-center",
        reverse ? "lg:grid-cols-[1.05fr_0.95fr]" : "lg:grid-cols-[0.95fr_1.05fr]",
      ].join(" ")}
    >
      <div className={reverse ? "lg:order-2" : ""}>
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
          <div className="absolute left-4 top-4 z-10 rounded-full bg-slate-950/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-white">
            {index}
          </div>
          <div className="relative aspect-[4/3]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
          </div>
        </div>
      </div>

      <div className={reverse ? "lg:order-1" : ""}>
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
          {eyebrow}
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
          {title}
        </h3>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
          {summary}
        </p>

        <div className="mt-6 grid gap-3">
          {bullets.map((bullet) => (
            <div
              key={bullet}
              className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
              <span className="text-sm font-medium leading-6 text-slate-700">{bullet}</span>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link href="/contact" className="inline-flex items-center gap-2">
              Talk to us
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

export function GuestServicesSection() {
  return (
    <section id="services" className="bg-white py-14 text-slate-900 sm:py-18">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-slate-500">
            Our Services
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl lg:text-6xl">
            What we do best
          </h2>
          <div className="mt-4 h-px w-40 overflow-hidden rounded-full bg-slate-200">
            <div className="h-full w-1/3 rounded-full bg-orange-500 animate-[underline-sweep_2.8s_ease-in-out_infinite]" />
          </div>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
            Compact service blocks that are easy to scan now and easy to extend later.
          </p>
        </div>

        <div className="grid gap-12">
          <ServiceFeature
            index="01"
            eyebrow="Service Spotlight"
            title="Business Process Outsourcing"
            summary="We streamline repeatable operations so your team can focus on growth and customer experience."
            imageSrc={outsourcingImage}
            imageAlt="Business process outsourcing office work"
            bullets={[
              "Reduce overhead without losing quality.",
              "Flexible coverage across time zones.",
              "Standardized delivery with accountability.",
            ]}
          />

          <ServiceFeature
            index="02"
            eyebrow=""
            title="Data Analytics & Dashboards"
            summary="We turn data into clear reporting, so leaders can track performance and act faster."
            imageSrc={analyticsImage}
            imageAlt="Dashboard analytics and reporting interface"
            bullets={[
              "Track KPIs in one place.",
              "Real-time reporting across sources.",
              "Cleaner decisions with visual clarity.",
            ]}
            reverse
          />

          <ServiceFeature
            index="03"
            eyebrow=""
            title="Technical Support & Services"
            summary="We provide dependable technical support to keep systems running smoothly and teams productive."
            imageSrc={technologyImage}
            imageAlt="Technical support team collaborating on technology services"
            bullets={[
              "Fast help for everyday issues.",
              "Support across tools and devices.",
              "Reliable coverage with clear guidance.",
            ]}
          />
        </div>
      </div>
    </section>
  )
}

export { ServiceFeature }
