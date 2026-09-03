import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Braces,
  Check,
  Cloud,
  CloudCog,
  Code2,
  LockKeyhole,
  Smartphone,
  Rocket,
  ShieldCheck,
  TestTube2,
  Workflow,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import technologyImage from "@/images/technology.jpg";

export const metadata: Metadata = {
  title: "IT Services | AS Services",
  description:
    "Web development, cloud, mobile application, and software testing services for modern businesses.",
};

const webServices = [
  {
    icon: Code2,
    title: "Web application development",
    description:
      "Fast, accessible web applications built around your customers, workflows, and growth plans.",
  },
  {
    icon: Braces,
    title: "Websites and digital platforms",
    description:
      "Thoughtful websites and portals that make your brand clear, useful, and easy to manage.",
  },
  {
    icon: Workflow,
    title: "Integrations and automation",
    description:
      "Connect the tools you already use and remove repetitive work from the day-to-day.",
  },
];

const cloudServices = [
  {
    icon: CloudCog,
    title: "AWS services",
    description:
      "Scalable AWS architecture, deployment, migration, and managed infrastructure for growing products.",
  },
  {
    icon: CloudCog,
    title: "Microsoft Azure services",
    description:
      "Secure Azure environments, application hosting, DevOps automation, and reliable cloud operations.",
  },
  {
    icon: Cloud,
    title: "Google Cloud services",
    description:
      "Flexible GCP solutions for modern applications, data platforms, APIs, and high-performance workloads.",
  },
  {
    icon: Smartphone,
    title: "Mobile application development",
    description:
      "Mobile experiences that feel natural to use, connect to your systems, and support your next stage of growth.",
  },
  {
    icon: TestTube2,
    title: "Software testing and QA",
    description:
      "Structured functional, performance, and release testing that helps teams ship with confidence.",
  },
];

const deliverySteps = [
  ["01", "Understand", "We map the business goal, users, constraints, and the outcomes that matter."],
  ["02", "Build", "We turn the plan into a clean, working product with clear ownership and milestones."],
  ["03", "Improve", "We monitor, support, and keep refining the system as your business changes."],
];

const technologyStack = ["Next.js", "React", "Node.js", "TypeScript", "AWS", "Azure", "Google Cloud", "Mobile apps", "Automation testing", "REST APIs"];

export default function ItServicesPage() {
  return (
    <div className="bg-white text-slate-900">
      <section className="relative isolate overflow-hidden bg-[#062B36] pt-32 text-white sm:pt-36">
        <div className="absolute inset-0">
          <Image
            src={technologyImage}
            alt="Developer working with a modern technology platform"
            fill
            priority
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-slate-950/75" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.2),transparent_35%),linear-gradient(90deg,rgba(2,6,23,0.95)_0%,rgba(2,6,23,0.7)_55%,rgba(2,6,23,0.9)_100%)]" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-cyan-200/30 bg-cyan-200/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
              <Rocket className="size-4" />
              IT Services
            </p>
            <h1 className="mt-7 max-w-3xl text-4xl font-semibold leading-tight text-orange-500 text-balance sm:text-5xl lg:text-6xl">
              Digital products built for the way your business grows.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              Build powerful web and mobile applications, run them on the cloud,
              and release them with the quality your customers expect.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-12 rounded-full bg-orange-500 px-6 text-white hover:bg-orange-600">
                <Link href="/contact" className="inline-flex items-center gap-2">
                  Start a conversation
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Link href="#capabilities" className="inline-flex h-12 items-center justify-center rounded-full border border-white/25 px-6 text-sm font-semibold text-white transition hover:bg-white/10">
                Explore capabilities
              </Link>
            </div>
          </div>

          <div className="relative min-h-[330px] lg:min-h-[410px]">
            <div className="absolute inset-5 rounded-lg border border-cyan-200/20 bg-[#0b3a46]/85 p-5 shadow-[0_28px_90px_rgba(0,0,0,0.3)] backdrop-blur sm:inset-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex gap-2" aria-hidden="true">
                  <span className="size-2.5 rounded-full bg-orange-400" />
                  <span className="size-2.5 rounded-full bg-cyan-300" />
                  <span className="size-2.5 rounded-full bg-emerald-300" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-[0.15em] text-cyan-100">Technology, in motion</span>
              </div>
              <div className="mt-8 grid gap-4">
                <div className="rounded-lg border border-white/10 bg-slate-950/30 p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-white">Web development</span>
                    <span className="text-emerald-300">Live</span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><span className="block h-full w-[88%] rounded-full bg-cyan-300" /></div>
                </div>
                <div className="rounded-lg border border-white/10 bg-slate-950/30 p-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-semibold text-white">AWS · Azure · GCP</span>
                    <span className="text-orange-300">Scaling</span>
                  </div>
                  <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10"><span className="block h-full w-[72%] rounded-full bg-orange-400" /></div>
                </div>
              </div>
              <div className="mt-7 flex items-center gap-3 text-sm text-slate-300">
                <ShieldCheck className="size-5 text-cyan-300" />
                Secure by design, ready for what is next.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white ">
        <div className="mx-auto grid max-w-7xl divide-y border-x border-slate-200 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          {[
            ["01", "One accountable team", "Strategy, engineering, and support aligned around the same outcome."],
            ["02", "Built for change", "Flexible foundations that can grow with your users and operations."],
            ["03", "Clear from day one", "Straightforward communication, milestones, and technical decisions."],
          ].map(([number, title, description]) => (
            <div key={number} className="px-2 py-8 sm:px-6 lg:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-orange-500">{number}</p>
              <h2 className="mt-2 text-lg font-semibold text-slate-900">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="capabilities" className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#185980]">What we deliver</p>
            <h2 className="mt-3 text-3xl font-semibold text-orange-500 sm:text-4xl">From first commit to confident release.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">Bring us a new idea, an existing application, or a platform ready for scale. We bring the engineering clarity to move it forward.</p>
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><Code2 className="size-6 text-[#185980]" /><h3 className="text-2xl font-semibold text-slate-900">Web development</h3></div>
              <div className="mt-6 grid gap-6">
                {webServices.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-orange-600"><Icon className="size-5" /></span>
                    <div><h4 className="font-semibold text-slate-900">{title}</h4><p className="mt-1 text-sm leading-6 text-slate-600">{description}</p></div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3 border-b border-slate-200 pb-5"><Cloud className="size-6 text-[#185980]" /><h3 className="text-2xl font-semibold text-slate-900">Cloud, mobile & quality</h3></div>
              <div className="mt-6 grid gap-6">
                {cloudServices.map(({ icon: Icon, title, description }) => (
                  <div key={title} className="flex gap-4">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-[#185980]"><Icon className="size-5" /></span>
                    <div><h4 className="font-semibold text-slate-900">{title}</h4><p className="mt-1 text-sm leading-6 text-slate-600">{description}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7fbfb] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#185980]">The stack behind the work</p>
            <h2 className="mt-3 text-3xl font-semibold text-orange-500 sm:text-4xl">Modern tools. Practical decisions.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">We choose technology for its fit, not its fashion. The result is a stack your team can operate and your business can rely on.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {technologyStack.map((technology) => (
              <div key={technology} className="flex min-h-20 items-center justify-center gap-2 border border-slate-200 bg-white px-3 text-center text-sm font-semibold text-[#185980] shadow-sm transition hover:-translate-y-1 hover:border-orange-300">
                <Check className="size-4 text-orange-500" />
                {technology}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-[#185980]">How we work</p>
            <h2 className="mt-3 text-3xl font-semibold text-orange-500 sm:text-4xl">Technology that stays useful after launch.</h2>
            <p className="mt-4 text-base leading-7 text-slate-600">Good delivery is more than shipping code. It is creating a foundation your team can understand, operate, and build on.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {deliverySteps.map(([number, title, description]) => (
              <div key={number} className="border-t-2 border-orange-400 pt-5">
                <p className="text-sm font-semibold text-orange-500">{number}</p>
                <h3 className="mt-3 text-xl font-semibold text-slate-900">{title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#062B36] py-16 text-white sm:py-20">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="max-w-2xl"><p className="text-sm font-semibold uppercase tracking-[0.14em] text-cyan-200">Ready when you are</p><h2 className="mt-3 text-3xl font-semibold text-orange-500 sm:text-4xl">Let us make your next technology decision easier.</h2><p className="mt-4 leading-7 text-slate-300">Tell us where you are today and where you need to go. We will help you find the most practical next step.</p><div className="mt-5 flex items-center gap-2 text-sm text-cyan-100"><LockKeyhole className="size-4" />Thoughtful security throughout the journey.</div></div>
          <Button asChild size="lg" className="h-12 shrink-0 rounded-full bg-orange-500 px-6 text-white hover:bg-orange-600"><Link href="/contact" className="inline-flex items-center gap-2">Talk to our team <ArrowRight className="size-4" /></Link></Button>
        </div>
      </section>
    </div>
  );
}