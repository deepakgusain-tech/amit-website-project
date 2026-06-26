import type { LucideIcon } from "lucide-react"
import { BarChart3, Boxes, Headset, RefreshCcw } from "lucide-react"

export type ServiceContent = {
  slug: string
  title: string
  headline: string
  summary: string
  overview: string
  icon: LucideIcon
  accent: string
  cardPoints: string[]
  keyServices: string[]
  benefits: string[]
}

export const serviceContent: ServiceContent[] = [
  {
    slug: "back-office-operations",
    title: "Back Office Operations",
    headline: "Reliable process support for work that needs to stay organized.",
    summary:
      "We handle repeatable operational tasks with structure, consistency, and clear accountability.",
    overview:
      "Streamline your day-to-day business operations with efficient, reliable, and scalable back-office support.",
    icon: Boxes,
    accent: "from-cyan-400 to-sky-500",
    cardPoints: [
      "Administrative processing",
      "Workflow tracking",
      "Documentation management",
      "Quality checks",
    ],
    keyServices: [
      "Data Entry & Data Processing",
      "Document Management",
      "Order Processing",
      "CRM & ERP Data Management",
      "Invoice & Billing Support",
      "Email & Administrative Support",
      "Database Maintenance",
      "Quality Assurance & Validation",
      "Workflow Automation Support",
      "Process Documentation",
    ],
    benefits: [
      "Increased operational efficiency",
      "Reduced administrative costs",
      "Improved data accuracy",
      "Faster turnaround times",
      "Scalable support teams",
    ],
  },
  {
    slug: "reporting-analytics",
    title: "Reporting & Analytics",
    headline: "Simple reporting that gives leadership better visibility.",
    summary:
      "We build practical dashboards and reporting structures that turn activity into action.",
    overview:
      "Transform business data into meaningful insights that support informed decision-making.",
    icon: BarChart3,
    accent: "from-violet-400 to-fuchsia-500",
    cardPoints: [
      "Performance dashboards",
      "Data cleanup",
      "Trend reporting",
      "Management insights",
    ],
    keyServices: [
      "Business Intelligence Dashboards",
      "KPI Monitoring",
      "Sales & Performance Reports",
      "Data Visualization",
      "Custom Report Generation",
      "Excel & Power BI Reporting",
      "Trend & Forecast Analysis",
      "Financial Reporting",
      "Operational Analytics",
      "Automated Report Scheduling",
    ],
    benefits: [
      "Better business visibility",
      "Data-driven decisions",
      "Real-time reporting",
      "Improved productivity",
      "Enhanced forecasting accuracy",
    ],
  },
  {
    slug: "technical-support",
    title: "Technical Support",
    headline: "Practical support for users, systems, and service continuity.",
    summary:
      "We provide responsive technical assistance that keeps work moving without unnecessary complexity.",
    overview:
      "Deliver reliable technical assistance that ensures smooth business operations and minimizes downtime.",
    icon: Headset,
    accent: "from-emerald-400 to-teal-500",
    cardPoints: [
      "Help desk support",
      "Incident response",
      "User communication",
      "Escalation management",
    ],
    keyServices: [
      "Help Desk Support",
      "Desktop & Laptop Troubleshooting",
      "Software Installation & Configuration",
      "Remote Technical Assistance",
      "Network Support",
      "System Monitoring",
      "User Account Management",
      "IT Asset Support",
      "Application Support",
      "Issue Resolution & Escalation",
    ],
    benefits: [
      "Reduced downtime",
      "Faster issue resolution",
      "Improved user satisfaction",
      "Enhanced system reliability",
      "24/7 support availability",
    ],
  },
  {
    slug: "recovery-support-services",
    title: "Recovery Support Services",
    headline: "Specialized support built around recovery-focused workflows.",
    summary:
      "We support recovery processes with dependable coordination and consistent follow-through.",
    overview:
      "Ensure business continuity with secure recovery solutions and rapid operational restoration.",
    icon: RefreshCcw,
    accent: "from-amber-400 to-orange-500",
    cardPoints: [
      "Recovery coordination",
      "Business continuity",
      "Risk review",
      "Compliance support",
    ],
    keyServices: [
      "Disaster Recovery Support",
      "Business Continuity Planning",
      "Data Backup & Restoration",
      "Incident Recovery Management",
      "System Recovery Assistance",
      "Operational Recovery Support",
      "Recovery Documentation",
      "Risk Assessment",
      "Recovery Testing",
      "Compliance Support",
    ],
    benefits: [
      "Faster recovery times",
      "Minimized business disruption",
      "Enhanced data protection",
      "Improved compliance",
      "Greater operational resilience",
    ],
  },
]

export function getServiceBySlug(slug: string) {
  return serviceContent.find((service) => service.slug === slug)
}
