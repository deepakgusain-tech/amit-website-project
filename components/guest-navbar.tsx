"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import logo from "../images/AS-Services-Logo.jpg";
import { GuestEnquiryPopup } from "@/components/guest-enquiry-popup";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

const services = [
  {
    title: "Support Services",
    href: "/service#technical-support",
    description: "Help desk, incident response and technical support.",
  },
  {
    title: "Data Analytics & Dashboards",
    href: "/service#analytics",
    description: "Business intelligence and dashboard reporting.",
  },
  {
    title: "IT Consulting Services",
    href: "/service#consulting",
    description: "Strategy, planning, and technical advisory.",
  },
  {
    title: "Technical Support Services",
    href: "/service#technical-support",
    description: "Ongoing system maintenance and support.",
  },
  {
    title: "IT Managed Services",
    href: "/service#managed-services",
    description: "Managed infrastructure and cloud operations.",
  },
];

const navLinkBase =
  "relative pb-1 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-orange-500 after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 hover:text-orange-500";

const navTriggerBase =
  "relative pb-1 text-sm font-semibold transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-orange-500 after:transition-transform after:duration-300 after:content-[''] hover:after:scale-x-100 hover:text-orange-500 hover:!bg-transparent focus:!bg-transparent data-open:!bg-transparent data-popup-open:!bg-transparent";

const ctaPrimaryBase =
  "inline-flex items-center rounded-full border border-orange-300/70 bg-gradient-to-r from-orange-500 to-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(249,115,22,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:from-orange-500 hover:to-orange-500 hover:shadow-[0_16px_36px_rgba(249,115,22,0.28)]";

const ctaSecondaryBase =
  "inline-flex items-center gap-2 rounded-full border border-blue-300/70 bg-gradient-to-r from-blue-500 to-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(59,130,246,0.22)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:from-blue-500 hover:to-blue-500 hover:shadow-[0_16px_36px_rgba(59,130,246,0.28)]";

export function GuestNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={[
        "fixed inset-x-0 top-0 z-50 border-b-blue-500 transition-all duration-300",
        scrolled
          ? "border-slate-200 bg-white text-slate-900 shadow-sm shadow-slate-900/5 backdrop-blur"
          : "border-transparent bg-transparent text-white",
      ].join(" ")}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex h-20 shrink-0 items-center rounded-xl px-2"
          onClick={() => setMobileOpen(false)}
        >
          <Image
            src={logo}
            alt="AS Services logo"
            width={180}
            height={36}
            priority
            className="block h-15 w-auto object-contain sm:h-14 lg:h-16"
          />
        </Link>

        <nav className="flex items-center gap-6">
          <button
            type="button"
            className={[
              "inline-flex h-8 w-8 items-center justify-center rounded-xl border transition md:hidden",
              scrolled
                ? "border-slate-200 text-slate-700 hover:bg-slate-100"
                : "border-white/20 text-white hover:bg-white/10",
            ].join(" ")}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="guest-navbar-menu"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>

          <div className="hidden items-center gap-4 md:flex">
            <NavigationMenu viewport={false}>
              <NavigationMenuList className="gap-5">
                <NavigationMenuItem>
                  <Link
                    href="/"
                    className={[
                      navLinkBase,
                      scrolled ? "text-slate-700" : "text-white",
                    ].join(" ")}
                  >
                    Home
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/about"
                    className={[
                      navLinkBase,
                      scrolled ? "text-slate-700" : "text-white",
                    ].join(" ")}
                  >
                    About us
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link
                    href="/career"
                    className={[
                      navLinkBase,
                      scrolled ? "text-slate-700" : "text-white",
                    ].join(" ")}
                  >
                    Careers
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="ml-1">
                  <NavigationMenuTrigger
                    className={[
                      navTriggerBase,
                      scrolled ? "text-slate-700" : "text-white",
                    ].join(" ")}
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="overflow-hidden rounded-[14px] border border-slate-200 bg-white p-0 text-slate-950 shadow-xl shadow-slate-950/10 md:min-w-[260px] md:max-w-[280px]">
                    <div className="grid gap-0">
                      {services.map((service) => (
                        <Link
                          key={service.title}
                          href={service.href}
                          className="group block w-full px-4 py-3 text-black transition-colors duration-200 hover:bg-orange-500 hover:text-white"
                        >
                          <p className="text-sm font-semibold text-current transition-colors">
                            {service.title}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem className="ml-2">
                  <Link
                    href="/contact"
                    className={ctaPrimaryBase}
                  >
                    Get in Touch
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem className="ml-2">
                  <GuestEnquiryPopup
                    triggerClassName={ctaSecondaryBase}
                    triggerLabel="Enquiry Us"
                  />
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
        </nav>
      </div>

      {mobileOpen ? (
        <div
          id="guest-navbar-menu"
          className="border-t border-slate-200 bg-white md:hidden"
        >
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
            <div className="grid gap-2">
              <Link
                href="/"
                className="rounded-xl px-3 py-2 text-base font-medium text-slate-700 transition  "
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className="rounded-xl px-3 py-2 text-base font-medium text-slate-700 transition "
                onClick={() => setMobileOpen(false)}
              >
                About us
              </Link>
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-2">
                <p className="px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                  Services
                </p>
                <div className="grid gap-1">
                  {services.map((service) => (
                    <Link
                      key={service.title}
                      href={service.href}
                      className="rounded-xl px-3 py-2 text-base text-slate-700 transition hover:bg-white hover:text-slate-950"
                      onClick={() => setMobileOpen(false)}
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/career"
                className="rounded-xl px-3 py-2 text-base font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-950"
                onClick={() => setMobileOpen(false)}
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className={ctaPrimaryBase + " justify-center"}
                onClick={() => setMobileOpen(false)}
              >
                Contact us
              </Link>
              <GuestEnquiryPopup
                triggerClassName={ctaSecondaryBase + " w-full justify-center"}
                triggerLabel="Enquiry Us"
              />
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
