import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";

const highlights = [
  "Founded in 2024",
  "Supporting global clients",
  "Backoffice Operations with IT Consulting & Support",
  "Specialized Transition team",
  "Specialized operational support teams",
  "Specialized Training & Development team",
  "Trained agents available as factory model",
  "Focus on quality and scalability",
];

const pillars = ["Transition", "Operations", "Training", "Scalability"];

export function GuestOperationalExcellenceSection() {
  return (
    <section className="relative isolate overflow-hidden bg-white py-14 text-slate-900 sm:py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.10),transparent_32%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.08),transparent_28%),radial-gradient(circle_at_bottom_right,rgba(16,185,129,0.08),transparent_24%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className=" mt-5 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-start lg:gap-16 xl:gap-20">
          <div className="max-w-2xl">
            <div className="inline-block">
              <h2 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
                About AS Services
              </h2>

              <div className="relative mt-4 h-[5px] w-44 overflow-hidden rounded-full bg-slate-200">
                <div className="absolute inset-0 animated-gradient-line" />
                <div className="absolute inset-y-0 shine-effect" />
              </div>

              <style>{`
                .animated-gradient-line {
                  background: linear-gradient(
                    90deg,
                    #06b6d4 0%,
                    #3b82f6 25%,
                    #8b5cf6 50%,
                    #3b82f6 75%,
                    #06b6d4 100%
                  );
                  background-size: 300% 100%;
                  animation: gradientMove 3s linear infinite;
                  filter: drop-shadow(0 0 6px rgba(59, 130, 246, 0.45));
                }

                .shine-effect {
                  left: -35%;
                  width: 35%;
                  background: linear-gradient(
                    90deg,
                    transparent,
                    rgba(255, 255, 255, 0.95),
                    transparent
                  );
                  animation: shineMove 2s ease-in-out infinite;
                }

                @keyframes gradientMove {
                  0% {
                    background-position: 0% 50%;
                  }
                  100% {
                    background-position: 300% 50%;
                  }
                }

                @keyframes shineMove {
                  0% {
                    transform: translateX(-100%);
                  }
                  100% {
                    transform: translateX(450%);
                  }
                }
              `}</style>
            </div>
            <h2 className="mt-8 text-2xl font-semibold tracking-tight text-balance text-slate-950 sm:text-3xl lg:text-4xl">
              A focused operating model built for scale, quality, and steady
              delivery.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              We combine back-office operations, IT consulting, and support
              services into a lean delivery model designed to help global
              clients move faster without sacrificing quality.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {pillars.map((pillar) => (
                <span
                  key={pillar}
                  className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 shadow-[0_8px_24px_rgba(15,23,42,0.04)]"
                >
                  {pillar}
                </span>
              ))}
            </div>

            <div className="mt-8">
              <Button asChild size="lg" className="rounded-full px-6 shadow-sm">
                <Link href="/about" className="inline-flex items-center gap-2">
                  Learn More About Us
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -left-4 top-8 h-24 w-24 rounded-full bg-sky-200/40 blur-3xl" />
            <div className="absolute -right-8 bottom-4 h-28 w-28 rounded-full bg-violet-200/35 blur-3xl" />

            <div className="relative rounded-[2.25rem] border border-slate-200 bg-white/80 p-4 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-5">
              <div className="rounded-[1.75rem] border border-slate-200 bg-slate-50/80 p-4 sm:p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.34em] text-slate-500">
                  Delivery model
                </p>
                <div className="mt-4 grid gap-3">
                  {highlights.map((item) => (
                    <div
                      key={item}
                      className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                      <span className="text-sm leading-6 text-slate-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-sky-100 bg-sky-50 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-600">
                    Factory model
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Trained agents ready to support scalable delivery.
                  </p>
                </div>
                <div className="rounded-2xl border border-violet-100 bg-violet-50 px-4 py-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-600">
                    Quality first
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Operational rigor without adding unnecessary complexity.
                  </p>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
