import { GuestHeroSection } from "@/components/guest-hero-carousel"
import { GuestGlobalDeliveryModelSection } from "@/components/guest-global-delivery-model-section"
import { GuestOperationalExcellenceSection } from "@/components/guest-operational-excellence-section"
import { GuestServicesSection } from "@/components/guest-services-section"
import { GuestTestimonialsSection } from "@/components/guest-testimonials-section"
import { GuestWhyClientsChooseUsSection } from "@/components/guest-why-clients-choose-us-section"

export default function GuestPage() {
  return (
    <>
      <GuestHeroSection />
      <GuestOperationalExcellenceSection />
      <GuestServicesSection />
      <GuestWhyClientsChooseUsSection />
      <GuestGlobalDeliveryModelSection />
      <GuestTestimonialsSection />
    </>
  )
}
