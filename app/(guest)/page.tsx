import { GuestHeroSection } from "@/components/guest-hero-carousel"
import { GuestOperationalExcellenceSection } from "@/components/guest-operational-excellence-section"
import { GuestServicesSection } from "@/components/guest-services-section"

export default function GuestPage() {
  return (
    <>
      <GuestHeroSection />
      <GuestOperationalExcellenceSection />
      <GuestServicesSection />
    </>
  )
}
