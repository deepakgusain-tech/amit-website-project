--
-- PostgreSQL database dump
--

\restrict SGTGVLt0rBklHCMY8dJuGa28sneGT9ZeceXOb6cv9mMxKcycl44b211zctOyQIR

-- Dumped from database version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.14 (Ubuntu 16.14-0ubuntu0.24.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: amit
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO amit;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: amit
--

COMMENT ON SCHEMA public IS '';


--
-- Name: ApplicationStatus; Type: TYPE; Schema: public; Owner: amit
--

CREATE TYPE public."ApplicationStatus" AS ENUM (
    'PENDING',
    'REVIEWING',
    'SHORTLISTED',
    'REJECTED',
    'HIRED'
);


ALTER TYPE public."ApplicationStatus" OWNER TO amit;

--
-- Name: EmploymentType; Type: TYPE; Schema: public; Owner: amit
--

CREATE TYPE public."EmploymentType" AS ENUM (
    'FULL_TIME',
    'PART_TIME',
    'CONTRACT',
    'FREELANCE',
    'INTERNSHIP'
);


ALTER TYPE public."EmploymentType" OWNER TO amit;

--
-- Name: Status; Type: TYPE; Schema: public; Owner: amit
--

CREATE TYPE public."Status" AS ENUM (
    'ACTIVE',
    'INACTIVE'
);


ALTER TYPE public."Status" OWNER TO amit;

--
-- Name: WorkMode; Type: TYPE; Schema: public; Owner: amit
--

CREATE TYPE public."WorkMode" AS ENUM (
    'REMOTE',
    'HYBRID',
    'ONSITE'
);


ALTER TYPE public."WorkMode" OWNER TO amit;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Account; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."Account" (
    "userId" uuid NOT NULL,
    type text NOT NULL,
    provider text NOT NULL,
    "providerAccountId" text NOT NULL,
    refresh_token text,
    access_token text,
    expires_at integer,
    token_type text,
    scope text,
    id_token text,
    session_state text,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) without time zone NOT NULL
);


ALTER TABLE public."Account" OWNER TO amit;

--
-- Name: Banner; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."Banner" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    tagline text NOT NULL,
    image text,
    title text NOT NULL,
    description text NOT NULL,
    status public."Status" DEFAULT 'ACTIVE'::public."Status" NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) without time zone NOT NULL
);


ALTER TABLE public."Banner" OWNER TO amit;

--
-- Name: Capabilities; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."Capabilities" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    items text[],
    description text,
    "serviceId" uuid NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) without time zone NOT NULL
);


ALTER TABLE public."Capabilities" OWNER TO amit;

--
-- Name: CareerApplication; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."CareerApplication" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    phone text NOT NULL,
    role text NOT NULL,
    experience text NOT NULL,
    location text NOT NULL,
    resume text NOT NULL,
    message text NOT NULL,
    "jobId" uuid NOT NULL,
    status public."ApplicationStatus" DEFAULT 'PENDING'::public."ApplicationStatus" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."CareerApplication" OWNER TO amit;

--
-- Name: ContactSection; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."ContactSection" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    description text,
    status public."Status" DEFAULT 'ACTIVE'::public."Status" NOT NULL,
    "serviceId" uuid NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) without time zone NOT NULL
);


ALTER TABLE public."ContactSection" OWNER TO amit;

--
-- Name: DeliveryProcess; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."DeliveryProcess" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    items text[],
    description text,
    "serviceId" uuid NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) without time zone NOT NULL
);


ALTER TABLE public."DeliveryProcess" OWNER TO amit;

--
-- Name: Job; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."Job" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    "shortDescription" text NOT NULL,
    description text,
    "employmentType" public."EmploymentType" NOT NULL,
    "workMode" public."WorkMode" NOT NULL,
    experience text,
    location text,
    vacancies integer,
    status public."Status" DEFAULT 'ACTIVE'::public."Status" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Job" OWNER TO amit;

--
-- Name: NewsletterSubscription; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."NewsletterSubscription" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    email text NOT NULL,
    status public."Status" DEFAULT 'ACTIVE'::public."Status" NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) without time zone NOT NULL
);


ALTER TABLE public."NewsletterSubscription" OWNER TO amit;

--
-- Name: OutcomeFocus; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."OutcomeFocus" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    items text[],
    description text,
    "serviceId" uuid NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) without time zone NOT NULL
);


ALTER TABLE public."OutcomeFocus" OWNER TO amit;

--
-- Name: ServiceBenefits; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."ServiceBenefits" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    items text[],
    description text,
    "serviceId" uuid NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) without time zone NOT NULL
);


ALTER TABLE public."ServiceBenefits" OWNER TO amit;

--
-- Name: ServiceCategory; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."ServiceCategory" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    status public."Status" DEFAULT 'ACTIVE'::public."Status" NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) without time zone NOT NULL
);


ALTER TABLE public."ServiceCategory" OWNER TO amit;

--
-- Name: Services; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."Services" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    title text NOT NULL,
    "shortDescription" text NOT NULL,
    description text NOT NULL,
    image text,
    status public."Status" DEFAULT 'ACTIVE'::public."Status" NOT NULL,
    "categoryId" uuid NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) without time zone NOT NULL
);


ALTER TABLE public."Services" OWNER TO amit;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."Session" (
    "sessionToken" text NOT NULL,
    "userId" uuid NOT NULL,
    expires timestamp(3) without time zone NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) without time zone NOT NULL
);


ALTER TABLE public."Session" OWNER TO amit;

--
-- Name: SiteSettings; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."SiteSettings" (
    id text DEFAULT 'site-settings'::text NOT NULL,
    "siteName" text NOT NULL,
    "legalName" text,
    "primaryEmail" text,
    "primaryPhone" text,
    "websiteUrl" text,
    timezone text,
    "officeAddress" text,
    "officeHours" text,
    "logoPath" text,
    "faviconPath" text,
    "mapUrl" text,
    "teamMembers" text,
    "happyCustomers" text,
    "operationalSupport" text,
    "heroTrustTags" text,
    "aboutTagline" text,
    "aboutTitle" text,
    "aboutDescription" text,
    "aboutButtons" text,
    "deliveryModelTitle" text,
    "deliveryModelItems" text,
    "whyClientsTagline" text,
    "whyClientsTitle" text,
    "whyClientsDescription" text,
    "whyClientsCards" text,
    "globalDeliveryTagline" text,
    "globalDeliveryTitle" text,
    "globalDeliveryDescription" text,
    "globalDeliveryImagePath" text,
    "serviceHeroTitle" text,
    "serviceHeroDescription" text,
    "serviceDeliveryTagline" text,
    "serviceDeliveryTitle" text,
    "serviceDeliveryDescription" text,
    "serviceDeliveryCards" text,
    "showPhone" boolean DEFAULT true NOT NULL,
    "showEmail" boolean DEFAULT true NOT NULL,
    "smtpHost" text,
    "smtpPort" text,
    "smtpUsername" text,
    "smtpPassword" text,
    "fromName" text,
    "fromEmail" text,
    "replyToEmail" text,
    "supportInbox" text,
    "emailSignature" text,
    "enableNotifications" boolean DEFAULT true NOT NULL,
    "storeDrafts" boolean DEFAULT false NOT NULL,
    "facebookUrl" text,
    "instagramUrl" text,
    "linkedinUrl" text,
    "youtubeUrl" text,
    "whatsappUrl" text,
    "messengerUrl" text,
    "socialBio" text,
    "showSocialIcons" boolean DEFAULT true NOT NULL,
    "openLinksNewTab" boolean DEFAULT true NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) without time zone NOT NULL,
    "cinNumber" text,
    "gstNumber" text,
    "metaDescription" text,
    "metaKeywords" text,
    "metaTitle" text,
    "heroDescription" text,
    "heroTagline" text,
    "heroTitle" text,
    "heroBackgroundImagePath" text
);


ALTER TABLE public."SiteSettings" OWNER TO amit;

--
-- Name: Testimonial; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."Testimonial" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL,
    designation text NOT NULL,
    company text NOT NULL,
    tag text NOT NULL,
    content text NOT NULL,
    image text,
    status public."Status" DEFAULT 'ACTIVE'::public."Status" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Testimonial" OWNER TO amit;

--
-- Name: User; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public."User" (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text,
    email text NOT NULL,
    image text,
    password text NOT NULL,
    status public."Status" DEFAULT 'ACTIVE'::public."Status" NOT NULL,
    "createdAt" timestamp(6) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(6) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO amit;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO amit;

--
-- Name: enquiries; Type: TABLE; Schema: public; Owner: amit
--

CREATE TABLE public.enquiries (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    "fullName" text NOT NULL,
    email text NOT NULL,
    "phoneNumber" text NOT NULL,
    "companyName" text,
    subject text NOT NULL,
    message text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public.enquiries OWNER TO amit;

--
-- Data for Name: Account; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."Account" ("userId", type, provider, "providerAccountId", refresh_token, access_token, expires_at, token_type, scope, id_token, session_state, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Banner; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."Banner" (id, tagline, image, title, description, status, "createdAt", "updatedAt") FROM stdin;
736cc190-ee80-4568-9cda-208ba17168b1	Driven by Expertise. Powered by Excellence. 	/uploads/94989577-7305-4eb8-851e-72d3286081cb.png	Global support from central pool of experts 	Flexible delivery designed to help teams handle change, close gaps quickly, and stay steady under pressure.	ACTIVE	2026-07-27 11:49:00.041	2026-08-02 06:29:12.424
6ac028e6-4bf1-4663-a761-451e3f1df195	Reporting with clarity	/uploads/d84cf722-1220-4727-8d44-635105b4f43e.png	Decision-ready analytics	Practical reporting and analysis that turns day-to-day work into useful visibility for teams and leadership.	ACTIVE	2026-07-27 11:49:00.038	2026-08-02 12:41:55.568
6389f643-feb3-4de2-814d-2fc3d3f298e2	Operational consistency	/uploads/2a8ba923-546c-4bf6-be70-38071d131735.png	Reliable back-office delivery	Structured support for documentation, process execution, and business operations that need to stay accurate and on time.	ACTIVE	2026-07-27 11:49:00.034	2026-08-03 14:07:47.446
\.


--
-- Data for Name: Capabilities; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."Capabilities" (id, title, items, description, "serviceId", "createdAt", "updatedAt") FROM stdin;
def2f228-52b8-4ba7-9916-53aa0e07259d	Our Security & Compliance Capabilities	{"Security Risk Assessments","Security Awareness & Training","Compliance Gap Analysis","Third-Party Security Assessments"}	Our comprehensive Security Compliance & Advisory capabilities help organizations establish robust security governance, strengthen risk management, and achieve compliance with industry standards. We combine best practices, structured methodologies, and expert guidance to build secure, resilient, and compliant business environments.	81fbcff3-1a1f-4fa4-9910-df1cafc3f0a4	2026-07-28 14:39:32.046	2026-07-28 14:39:32.046
b845cddb-3c30-410f-be3f-670bb5325cd8	How We Deliver	{"Skilled & Dedicated Workforce","Technology-Driven Execution","Quality & Process Governance","Global Delivery Excellence","Enterprise-Ready Workplace","Secure & Compliant Operations"}	Delivering comprehensive business operations support that keeps your business running through skilled professionals, standardized workflows, and technology-enabled solutions.	50da0c26-8437-4edd-9fc7-48ac314b078b	2026-07-29 14:20:52.72	2026-07-29 14:20:52.72
6800d3b0-f4a3-46ce-affa-1246454bcad2	Capabilities	{"Workflow automation","Tool integration support","Implementation guidance"}	Small, useful improvements that add up over time.	031b1cad-1d37-4cd2-a08e-250f7a8893f9	2026-07-29 14:37:49.824	2026-07-29 14:37:49.824
6504aaf1-08ad-4901-8d20-9757d2838250	Technology Expertise Across Enterprise IT Ecosystems	{"Cloud Platforms - AWS, GCP & Azure",Cybersecurity,"Compute Infrastructure- Windows, Linux & Unix","Network - Datacenter and Branch Networks","Infrastructure, Virtualization",Databases,"Data Protection - Backup & Storage","Monitoring & Observability"}	Our consultants bring deep expertise across today's leading enterprise technologies, enabling organizations to successfully execute implementations, migrations, upgrades, integrations, and transformation initiatives. Through our flexible shared resource model, you gain access to specialized skills across multiple technology domains without the need to build or maintain dedicated in-house teams.	0bd30b5e-3504-4983-b85d-a5156121201f	2026-08-02 16:08:24.795	2026-08-02 16:08:24.795
\.


--
-- Data for Name: CareerApplication; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."CareerApplication" (id, "fullName", email, phone, role, experience, location, resume, message, "jobId", status, "createdAt", "updatedAt") FROM stdin;
f6db6dae-acb9-4dbc-8f5a-f30e2ba5e2e5	Deepak Gusain	deepak.gusain@technosyslabs.com	+919220437682	Technical Support Specialist	2	Corporate Office	/uploads/4ea40a58-e311-4b87-818f-e97fdbd28e0f.docx	asfads	c0eb7fad-f749-4c76-a519-dc29cd763f64	HIRED	2026-07-27 12:15:29.031	2026-07-27 12:16:29.529
eae08266-ceec-4e10-80b2-323f5ce2e4a5	Amit RANGAN	amitrangan1977@gmail.com	+919818857179	Technical Support Specialist	15	Delhi	/uploads/494f4b2d-040c-4e95-83a8-f2213f0807ff.pdf		c0eb7fad-f749-4c76-a519-dc29cd763f64	PENDING	2026-07-29 16:26:57.971	2026-07-29 16:26:57.971
7bfa15ae-61f7-4bce-941e-44de105f8ac9	Amit RANGAN	amitrangan1977@gmail.com	+919818857179	Voice Associate	2	Delhi	/uploads/edbd2b0b-b7da-410c-9f46-548007798f44.docx		37f0a962-8403-4e6e-9056-bf8a868e2bab	REVIEWING	2026-08-03 19:11:17.666	2026-08-03 19:12:39.007
\.


--
-- Data for Name: ContactSection; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."ContactSection" (id, title, description, status, "serviceId", "createdAt", "updatedAt") FROM stdin;
fcc4a705-77e9-4dec-aa3a-7fab03cf5dc1	Secure Your Business with Confidence	Whether you're looking to strengthen your security posture, achieve regulatory compliance, or build a resilient governance framework, our experts are ready to help. Connect with AS Services to discuss your security and compliance goals and discover tailored solutions for your business.	ACTIVE	81fbcff3-1a1f-4fa4-9910-df1cafc3f0a4	2026-07-28 14:39:32.052	2026-07-28 14:39:32.052
dd95f789-bd52-4b3e-8d0e-eec92638d264	Need back-office support?	Tell us what needs to be handled and we will shape the workflow around your team.	ACTIVE	50da0c26-8437-4edd-9fc7-48ac314b078b	2026-07-29 14:20:52.726	2026-07-29 14:20:52.726
b473a27f-0ca2-404a-a85c-305cce55fece	Thinking about automation?	We can help identify the first practical step and keep the scope grounded.	ACTIVE	031b1cad-1d37-4cd2-a08e-250f7a8893f9	2026-07-29 14:37:49.828	2026-07-29 14:37:49.828
88a4fe9d-af17-42d9-8142-27d0e5ea1bf9	Need technical support?	We can step in with practical support that fits your systems and process flow.	ACTIVE	0bd30b5e-3504-4983-b85d-a5156121201f	2026-08-02 16:08:24.805	2026-08-02 16:08:24.805
\.


--
-- Data for Name: DeliveryProcess; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."DeliveryProcess" (id, title, items, description, "serviceId", "createdAt", "updatedAt") FROM stdin;
c0ec5df6-a2a1-45df-ad43-5d3c94fe3e01	A simple 5-step framework	{"Assess - Understand the current security landscape through comprehensive assessments, stakeholder discussions, and compliance reviews to identify risks and improvement opportunities.","Analyze- Evaluate existing security controls, identify compliance gaps, assess business risks, and define a roadmap aligned with organizational objectives and industry standards.","Design- Develop tailored security governance frameworks, policies, procedures, and compliance strategies that address business needs and regulatory requirements.","Implement- Support the implementation of recommended security controls, governance practices, awareness initiatives, and compliance improvements to strengthen organizational resilience.","Review & Improve- Continuously monitor effectiveness, conduct periodic reviews, and recommend ongoing improvements to maintain compliance and adapt to evolving security threats."}		81fbcff3-1a1f-4fa4-9910-df1cafc3f0a4	2026-07-28 14:39:32.048	2026-07-28 14:39:32.048
14dc2993-3391-40e6-a1a9-6a9b97d19e3b	Delivery process	{"Discovery & Consultation - We understand your business objectives, operational challenges, and process requirements to define the right outsourcing strategy.","Solution Design - Our team designs a customized delivery model, establishes workflows, defines KPIs, and prepares a transition plan aligned with your business goals.","Team Onboarding - We build and train a dedicated team with the required skills, tools, and process knowledge to ensure seamless execution.","Process Transition - Operations are transitioned through structured knowledge transfer, documentation, pilot execution, and quality validation to minimize business disruption.","Service Delivery - Our experienced professionals deliver day-to-day business operations using standardized workflows, technology-enabled processes, and continuous performance monitoring.","Quality & Governance - Our experienced professionals deliver day-to-day business operations using standardized workflows, technology-enabled processes, and continuous performance monitoring.","Continuous Service Improvement - We regularly review operational performance, optimize processes, implement improvements, and scale services to support your evolving business needs."}	A straightforward operating cadence that scales.	50da0c26-8437-4edd-9fc7-48ac314b078b	2026-07-29 14:20:52.722	2026-07-29 14:20:52.722
5089634a-9f15-48a8-89f7-2fbf9f0cae04	Delivery process	{"Find repetitive work worth automating","Design the simplest workable solution","Test, document, and hand over"}	Start small, prove value, and expand carefully.	031b1cad-1d37-4cd2-a08e-250f7a8893f9	2026-07-29 14:37:49.825	2026-07-29 14:37:49.825
9fa89c35-1112-4759-9904-56c863a55255	Flexible Delivery Models Designed Around Your Business Needs	{"Understand Your Requirements - We assess your business objectives, project scope, technology landscape, timelines, and required skill sets to recommend the most suitable engagement model.","Choose Your Delivery Model - Select the engagement model that best aligns with your business needs - Shared Delivery Model or Dedicated Delivery Model","Resource Selection & Onboarding - Our experts are carefully matched based on technical skills, project experience, and business requirements before seamlessly integrating with your internal teams.","Project Execution - Our consultants collaborate with your stakeholders to deliver implementations, migrations, upgrades, integrations, and technical initiatives using industry best practices.","Governance & Collaboration - Regular status reviews, knowledge sharing, documentation, and transparent communication ensure complete visibility throughout the engagement.","Knowledge Transfer & Ongoing Support - Upon successful completion, we provide comprehensive documentation, knowledge transfer sessions, and optional post-implementation support based on your business requirements."}	Simple support loops that keep momentum intact.	0bd30b5e-3504-4983-b85d-a5156121201f	2026-08-02 16:08:24.798	2026-08-02 16:08:24.798
\.


--
-- Data for Name: Job; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."Job" (id, title, "shortDescription", description, "employmentType", "workMode", experience, location, vacancies, status, "createdAt", "updatedAt") FROM stdin;
64650432-d951-4c5d-860e-18667920176c	Operations Associate	Support daily business operations, track work queues, and help keep documentation current.	This role is a good fit for someone who likes process, accuracy, and keeping teams organized. You will work with recurring operations and help ensure nothing falls through the cracks.	FULL_TIME	HYBRID	1-3 years	Kolkata, India	2	ACTIVE	2026-07-27 11:49:00.186	2026-07-27 11:49:00.186
cb40702f-6047-4634-b213-c02407f8f9a8	Reporting Analyst	Build recurring reports, analyze trends, and help transform operational data into insight.	You will own reporting routines, improve data visibility, and work with internal teams to make metrics easier to understand and act on.	FULL_TIME	REMOTE	2-4 years	Remote	1	ACTIVE	2026-07-27 11:49:00.19	2026-07-27 11:49:00.19
c0eb7fad-f749-4c76-a519-dc29cd763f64	Technical Support Specialist	Handle support requests, coordinate implementations, and keep service delivery moving.	This position is ideal for someone who can troubleshoot calmly, document clearly, and work with teams to resolve issues quickly and professionally.	CONTRACT	ONSITE	2+ years	India	1	ACTIVE	2026-07-27 11:49:00.193	2026-07-27 11:49:00.193
37f0a962-8403-4e6e-9056-bf8a868e2bab	Voice Associate	Voice process support for global business operations		FULL_TIME	HYBRID	2	Noida	2	ACTIVE	2026-08-03 19:09:31.727	2026-08-03 19:09:31.727
\.


--
-- Data for Name: NewsletterSubscription; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."NewsletterSubscription" (id, email, status, "createdAt", "updatedAt") FROM stdin;
31e4ec55-9d19-4066-a508-57f1c58846d7	hello@northstarlogistics.example	ACTIVE	2026-07-27 11:49:00.199	2026-07-27 11:49:00.199
2d11d575-7b4e-4381-bf34-cdd4e2c5e1ca	updates@helixretail.example	ACTIVE	2026-07-27 11:49:00.203	2026-07-27 11:49:00.203
59c05f64-d529-4216-9751-814513f1028e	ops@bridgewaytech.example	ACTIVE	2026-07-27 11:49:00.205	2026-07-27 11:49:00.205
6fa5ceef-6c4f-4a63-9b02-0c06c15dbcfb	hannah.melotto@melottogroup.com	ACTIVE	2026-08-01 04:40:45.817	2026-08-01 04:40:45.817
8c971990-ddd3-420b-9eb1-e213e16568ec	amitrangan1977@gmail.com	ACTIVE	2026-08-03 19:07:25.941	2026-08-03 19:07:25.941
\.


--
-- Data for Name: OutcomeFocus; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."OutcomeFocus" (id, title, items, description, "serviceId", "createdAt", "updatedAt") FROM stdin;
b7c7f57d-dbba-42b5-b9e0-528f598ae677	Achieve a Secure, Compliant & Resilient Business	{"Strengthened Security Posture- Establish robust security controls and governance frameworks that protect critical business assets, reduce vulnerabilities, and enhance organizational resilience against evolving threats.","Regulatory Compliance -  Meet industry standards and regulatory requirements with confidence through structured compliance and governance.","Reduced Business Risk - Identify and mitigate security risks before they impact operations, reputation, or customer trust.","Audit Readiness - Maintain documentation, controls, and processes that support successful internal and external audits.","Customer Trust & Confidence - Demonstrate a strong commitment to information security, strengthening credibility with customers, partners, and stakeholders.","Operational Resilience -  Improve business continuity and the ability to respond effectively to evolving security challenges."}	Our Security Compliance & Advisory services empower organizations to strengthen information security, reduce operational risks, achieve regulatory compliance, and build long-term business resilience. By aligning security with business objectives, we help create a trusted, secure, and sustainable operating environment.	81fbcff3-1a1f-4fa4-9910-df1cafc3f0a4	2026-07-28 14:39:32.051	2026-07-28 14:39:32.051
0a2af6c0-553b-4623-b0de-3617bc36382b	Business Outcomes	{"⚙️Increased Operational Efficiency","💰Reduced Operating Cost","⚡Improved Business Agility","🤝Enhanced Customer Experience","📊Better Business Visibility","🚀Sustainable Business Growth"}	Less friction, better traceability, and consistent delivery.	50da0c26-8437-4edd-9fc7-48ac314b078b	2026-07-29 14:20:52.725	2026-07-29 14:20:52.725
0bc87e28-2eb3-4334-a182-1850f77ae19c	Outcomes	{"Time saved on repetitive tasks","Cleaner process handoffs","Better delivery reliability"}	Less repetitive effort and better operational consistency.	031b1cad-1d37-4cd2-a08e-250f7a8893f9	2026-07-29 14:37:49.826	2026-07-29 14:37:49.826
f5b973aa-9157-42a4-84ea-aed5d3f57956	Business Outcomes You Can Expect	{"🚀 Faster Project Delivery - Accelerate project delivery with experienced specialists who can contribute immediately, reducing implementation timelines and helping achieve business objectives sooner.","🧠 Specialized Expertise On Demand - Leverage certified professionals across multiple technology domains without the challenges of recruiting, training, or maintaining permanent in-house teams.","💰 Optimized Technology Investments - Engage resources only when needed, enabling better utilization of budgets while maximizing the value of your technology initiatives.","📈 Greater Delivery Flexibility - Scale technical expertise up or down based on project demands through shared or dedicated engagement models, ensuring the right level of support at every stage.","🛡️ Reduced Project Risk - Benefit from proven implementation methodologies and experienced consultants who help minimize technical risks, avoid common pitfalls, and improve project success rates.","⚡ Business Agility - Quickly respond to changing business priorities by accessing the right technology expertise on demand, enabling faster innovation and seamless execution of strategic initiatives."}	Our flexible technical engagement model enables organizations to accelerate technology initiatives, optimize resource utilization, and access specialized expertise exactly when required. The result is faster execution, reduced costs, and successful delivery of critical business and technology projects.	0bd30b5e-3504-4983-b85d-a5156121201f	2026-08-02 16:08:24.802	2026-08-02 16:08:24.802
\.


--
-- Data for Name: ServiceBenefits; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."ServiceBenefits" (id, title, items, description, "serviceId", "createdAt", "updatedAt") FROM stdin;
07c2c72a-5c87-4dc3-a8e5-75064887536e	Strengthen Your Security Posture	{"Enhanced Information Security","Risk Reduction","Audit Readiness","Regulatory Compliance","Business Continuity"}	Our Security Compliance & Advisory services help organizations strengthen information security, minimize operational risks, meet regulatory requirements, and build trust with customers through robust governance and industry best practices.	81fbcff3-1a1f-4fa4-9910-df1cafc3f0a4	2026-07-28 14:39:32.043	2026-07-28 14:39:32.043
79059522-6374-453e-9a8b-efd66aea88a4	Business Value We Deliver	{"💰 Cost Optimization","⚙️ Operational Efficiency","📈 Scalable Workforce","🛡️ Quality & Compliance","🔄 Business Continuity","🔒 Data Security & Confidentiality"}	Reduce operational costs, improve efficiency, and scale your business with reliable, technology-enabled process support	50da0c26-8437-4edd-9fc7-48ac314b078b	2026-07-29 14:20:52.719	2026-07-29 14:20:52.719
d11249a6-a868-44b5-838c-7cea0fa53f06	What you get	{"Lower manual effort","Cleaner handoffs between tools","More consistent task execution"}	A more efficient way to run repetitive work.	031b1cad-1d37-4cd2-a08e-250f7a8893f9	2026-07-29 14:37:49.822	2026-07-29 14:37:49.822
8b37c698-964f-4aca-82d0-34bab315318d	Why Choose Our Technical Support & Managed Services?	{"On-Demand Technical Expertise - Access experienced professionals across diverse technologies whenever your projects require specialized implementation and consulting skills.","Flexible Shared Resource Model - Leverage highly skilled consultants on a shared engagement model, allowing you to scale technical expertise based on project requirements while optimizing costs.","Multi-Technology Capability - Benefit from expertise across cloud platforms, infrastructure, enterprise applications, databases, networking, cybersecurity, collaboration tools, and emerging technologies through a single delivery partner.","Accelerated Project Delivery - Reduce implementation timelines by engaging experienced professionals who can quickly integrate with your teams and contribute from day one.","Cost-Effective Engagement - Avoid long-term hiring and training costs by accessing specialized technical resources only when required, ensuring greater operational and financial efficiency.","Scalable Technology Support - Whether you need a single specialist or a multidisciplinary team, our flexible engagement model scales effortlessly to support projects of any size and complexity."}	Accelerate your technology initiatives with on-demand access to experienced professionals across infrastructure, cloud, enterprise applications, and emerging technologies. Our flexible shared resource model enables organizations to engage the right expertise for implementations, migrations, upgrades, integrations, and specialized technical projects, without the cost and complexity of maintaining dedicated teams.	0bd30b5e-3504-4983-b85d-a5156121201f	2026-08-02 16:08:24.789	2026-08-02 16:08:24.789
\.


--
-- Data for Name: ServiceCategory; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."ServiceCategory" (id, name, status, "createdAt", "updatedAt") FROM stdin;
4b017d7d-29f2-4c07-a11e-2f83737d9e8b	Business Operations	ACTIVE	2026-07-27 11:49:00.044	2026-07-27 11:49:00.044
96aba8de-17a9-4cc5-bd17-0a38e58b3beb	Reporting & Analytics	ACTIVE	2026-07-27 11:49:00.047	2026-07-27 11:49:00.047
11469284-5ea0-431d-8f59-956d94732638	Technical Support	ACTIVE	2026-07-27 11:49:00.049	2026-07-27 11:49:00.049
1cf79bbf-952f-4bd6-b4ab-6a9194f01f0a	Process Excellence	ACTIVE	2026-07-27 11:49:00.05	2026-07-27 11:49:00.05
bf8ff0ea-984e-440f-92d5-29ac0aee4764	Automation	ACTIVE	2026-07-27 11:49:00.052	2026-08-02 15:27:30.965
\.


--
-- Data for Name: Services; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."Services" (id, title, "shortDescription", description, image, status, "categoryId", "createdAt", "updatedAt") FROM stdin;
031b1cad-1d37-4cd2-a08e-250f7a8893f9	IT Consulting & Automation	Practical implementation support, lightweight automation, and workflow improvement.	We help teams simplify recurring tasks, connect the right tools, and make technical work easier to maintain over time.	/uploads/e379fec5-1172-4204-9681-e0b374d32b1c.png	ACTIVE	11469284-5ea0-431d-8f59-956d94732638	2026-07-27 11:49:00.155	2026-07-29 14:37:49.78
0bd30b5e-3504-4983-b85d-a5156121201f	Technical Support & Managed Services	Implementation, Support and Managed Services across all IT verticals	Our Technical Support & Managed Services provide organizations with on-demand access to skilled technology professionals across a broad range of platforms and enterprise technologies. Whether it's a one-time implementation, migration, upgrade, integration, deployment, or specialized technical engagement, our shared resource model enables businesses to leverage the right expertise without the need for long-term hiring or dedicated support teams. We deliver flexible, scalable, and cost-effective technical services tailored to your project and operational requirements.	/uploads/b96e2ecc-0dac-4435-9098-0fbff875233c.png	ACTIVE	11469284-5ea0-431d-8f59-956d94732638	2026-07-27 11:49:00.105	2026-08-02 16:08:24.767
81fbcff3-1a1f-4fa4-9910-df1cafc3f0a4	Security Compliance & Advisory	Helping organizations strengthen security, ensure regulatory compliance, and manage risks through governance, assessments, and advisory services.	Our Security Compliance & Advisory services help organizations strengthen their information security posture, identify and mitigate risks, and achieve compliance with industry standards and regulatory requirements. We provide security assessments, policy development, governance frameworks, risk management, audit readiness, and expert advisory to build resilient and secure business operations.	/uploads/923c8f92-f1ac-467c-9ba7-d8587d125dca.jpeg	ACTIVE	11469284-5ea0-431d-8f59-956d94732638	2026-07-28 14:11:56.08	2026-07-28 14:39:32.036
50da0c26-8437-4edd-9fc7-48ac314b078b	Business Process Operations	Administrative processing, documentation management, and reliable workflow support.	We deliver reliable and scalable Business Process Operations that enable organizations to streamline workflows, improve operational efficiency, and focus on their core business objectives. Our dedicated teams combine domain expertise, standardized processes, and technology-driven execution to provide consistent, high-quality business support.	/uploads/f1cf9acd-ba36-4570-9daa-dc233bdbceb7.png	ACTIVE	4b017d7d-29f2-4c07-a11e-2f83737d9e8b	2026-07-27 11:49:00.057	2026-07-29 14:20:52.711
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."Session" ("sessionToken", "userId", expires, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: SiteSettings; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."SiteSettings" (id, "siteName", "legalName", "primaryEmail", "primaryPhone", "websiteUrl", timezone, "officeAddress", "officeHours", "logoPath", "faviconPath", "mapUrl", "teamMembers", "happyCustomers", "operationalSupport", "heroTrustTags", "aboutTagline", "aboutTitle", "aboutDescription", "aboutButtons", "deliveryModelTitle", "deliveryModelItems", "whyClientsTagline", "whyClientsTitle", "whyClientsDescription", "whyClientsCards", "globalDeliveryTagline", "globalDeliveryTitle", "globalDeliveryDescription", "globalDeliveryImagePath", "serviceHeroTitle", "serviceHeroDescription", "serviceDeliveryTagline", "serviceDeliveryTitle", "serviceDeliveryDescription", "serviceDeliveryCards", "showPhone", "showEmail", "smtpHost", "smtpPort", "smtpUsername", "smtpPassword", "fromName", "fromEmail", "replyToEmail", "supportInbox", "emailSignature", "enableNotifications", "storeDrafts", "facebookUrl", "instagramUrl", "linkedinUrl", "youtubeUrl", "whatsappUrl", "messengerUrl", "socialBio", "showSocialIcons", "openLinksNewTab", "createdAt", "updatedAt", "cinNumber", "gstNumber", "metaDescription", "metaKeywords", "metaTitle", "heroDescription", "heroTagline", "heroTitle", "heroBackgroundImagePath") FROM stdin;
site-settings	As services	Global Business Support Services Delivered from India	sales@advancesupportservices.com	+91 9212174507	https://www.advancesupportservices.com	Asia/Kolkata	AS Services, India	Mon-Fri, 9:00 AM - 6:00 PM IST	/uploads/23a9daac-99da-4369-9334-fb21a672b56c.png	/uploads/19ff61d3-a38d-4535-adc5-012fa9bd9c8f.png	\N	48	120	24/7	[{"key":"Team Members","value":"100 +"},{"key":"Happy Customers","value":"20 +"},{"key":"Projects Delivered","value":"25 +"},{"key":"Certified Professionals","value":"50 +"},{"key":"Global Time Zone Coverage","value":"24X7"},{"key":"C-SAT","value":"99.9%"}]	About AS Services	Building Operational Excellence	AS Services is a global business support and IT enablement company delivering offshore operational excellence through scalable teams, structured processes, and technology-driven solutions.\r\nWe combine business process operations, IT consulting, and support services into a lean delivery model designed to move faster without sacrificing quality.	["Transition","Operations","Quality","Continuous Improvement","Up-skillings","Scalability"]	AT A GLANCE	["Founded in 2020","Supporting global clients","Backoffice Operations with IT Consulting & Support","Specialized Transition team","Specialized operational support teams","Specialized Training & Development team","Trained agents available as factory model","Focus on Quality, Scalability & Security","ISO/IEC 27001:2022 Certified Company"]	Why Clients Choose Us	Built on Expertise. Driven by Outcomes	We combine specialized expertise, flexible delivery models, and a client-first approach to help organizations achieve their business and technology goals. From optimizing business operations to delivering complex technology initiatives, we provide scalable, secure, and cost-effective solutions designed around each client's unique requirements.	[{"title":"Scalable Teams","summary":"Flexible delivery capacity that grows with your needs."},{"title":"Cost Effective Delivery","summary":"Lean operations with a clear focus on value and efficiency."},{"title":"Structured Processes","summary":"Consistent execution built around repeatable workflows."},{"title":"Flexible Engagement Models","summary":"Choose between shared or dedicated resource models to access the right skills, at the right time, while optimizing cost and maximizing business value."},{"title":"Security & Compliance Focus","summary":"Information security is embedded into our delivery approach. Our ISO/IEC 27001:2022 certification reflects our commitment to protecting client information and maintaining trusted delivery practices."}]	OUR GLOBAL DELIVERY MODEL	A simple, visual journey from intake to continuous improvement.	This flowchart maps the exact delivery handoff we use to move from client requirements through transition, training, delivery, governance, and ongoing service improvement.	/uploads/994160fb-8288-4c9c-8813-398c4f1f994b.png	\N	\N	\N	\N	\N	\N	t	t	\N	\N	\N	\N	AS Services	info@asservices.com	support@asservices.com	sales@advancesupportservices.com	Thanks,\nAS Services Team	t	f	https://facebook.com	https://instagram.com	https://linkedin.com	https://youtube.com	https://wa.me/919876543210	https://m.me	Operational support, analytics, and technical services.	t	t	2026-07-27 11:48:59.865	2026-08-03 16:21:48.437	fasdfadsf	09ATGPK6613G1ZN	Advance Support Services delivers Business Operations, IT Consulting, Technical Support, Managed Services, Cloud Solutions and Digital Transformation services to global enterprises.	Business Operations,\r\nBack office support\r\nIT Consulting,\r\nTechnical Support,\r\nManaged Services,\r\nCloud Services,\r\nDigital Transformation,\r\nBusiness Process Outsourcing,\r\nMicrosoft 365,\r\nInfrastructure Services,\r\nEnterprise Support	Advance Support Services | Business Operations & IT Consulting	We help organizations transform their operations through Intelligent Analytics based Business Operations	Delivering Efficiency. Enabling Growth.	Empowering Global Enterprises with Business Operations and IT Consulting	/uploads/d62c2e29-d214-4beb-a2cf-f38b87ba5388.mp4
\.


--
-- Data for Name: Testimonial; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."Testimonial" (id, name, designation, company, tag, content, image, status, "createdAt", "updatedAt") FROM stdin;
c911fcaf-a749-4914-9618-2f4cefa02bca	Rahul Mehta	Service Delivery Manager	Bridgeway Tech	Technical support	Support requests were handled with real follow-through, which kept our team moving during busy periods.	/uploads/f04daeeb-05dd-41db-8e62-dee7c9f09467.jfif	ACTIVE	2026-07-27 11:49:00.179	2026-07-27 12:02:23.063
99063cd4-0cba-44c0-9c27-ab22b80b354c	Priya Nair	Reporting Manager	Helix Retail	Analytics and reporting	We finally had reporting that leadership could trust without spending hours cleaning it up first. Very professional team	/uploads/908b02a1-5ee2-4b0f-9d65-6d27f5dcd92c.png	ACTIVE	2026-07-27 11:49:00.178	2026-07-30 06:51:20.372
19cfc3a0-9c68-431d-a3b3-7aee876703ff	Aman Verma	Operations Lead	Northstar Logistics	Back office support	The team brought structure to a messy workflow and made daily handoffs far easier to manage. Excellent team	/uploads/user/04318dce-0dde-45f7-8fa9-6e15b7f4add6.jpg	ACTIVE	2026-07-27 11:49:00.175	2026-07-30 06:51:47.217
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public."User" (id, name, email, image, password, status, "createdAt", "updatedAt") FROM stdin;
fce9e7dd-cb85-457a-a2d3-4169e353cbcd	Admin	admin@asservices.in	/uploads/user/04318dce-0dde-45f7-8fa9-6e15b7f4add6.jpg	$2b$10$m/3BSlp6hEohAXaQg.4HmesELBTLxObmvIUom3rmsqaAS34fx98/O	ACTIVE	2026-07-27 11:49:00.03	2026-07-27 11:49:00.03
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
36d2bb3a-2ace-4ce6-8243-3e29c441277c	13925501c5ea6e65f70f2d6e159f25a7dc4dce066dbcc94b563cef74bb3e6010	2026-07-27 11:48:54.407373+00	20260722060306_init	\N	\N	2026-07-27 11:48:54.351571+00	1
0a2b26b6-fe20-4999-b030-95af7bddec6d	2eb63131600e491098b17e85990840c763764afd11d5b5614e3f9972befb99ff	2026-07-27 11:48:54.410012+00	20260723052700_configuration_alter	\N	\N	2026-07-27 11:48:54.408171+00	1
743c4047-9472-4ef9-96f6-32c745189245	16adde99db484c506e9eb0a04d0bca16b9cd8814a0339afa4fdf135eef22c84e	2026-07-28 05:45:06.482708+00	20260728052528_alter_configuration	\N	\N	2026-07-28 05:45:06.478887+00	1
051d5d55-7592-4cc9-b24d-7c571e92ac7f	77fb7e8e3e1ad9ff1b3f67e559cb3035a0416620a594f3c838dbf026f8bb737b	2026-07-28 06:26:22.346407+00	20260728061908_alter_configuration_2	\N	\N	2026-07-28 06:26:22.343759+00	1
a023e402-edd2-4e6b-96ea-46f3f6c819a0	0817c58f69cf2b2d818084ced5798008c9fb2e77e160995ee1eae79d3786c5f8	2026-07-29 10:00:43.067963+00	20260729100043_service_category_alter	\N	\N	2026-07-29 10:00:43.063726+00	1
\.


--
-- Data for Name: enquiries; Type: TABLE DATA; Schema: public; Owner: amit
--

COPY public.enquiries (id, "fullName", email, "phoneNumber", "companyName", subject, message, "createdAt", "updatedAt") FROM stdin;
059ca9fc-0b9f-45d5-ad20-03295692b22b	Deepak Gusain	deepak.gusain@technosyslabs.com	+919220437682	technosys	hgjkl	jkl	2026-07-27 12:08:09.319	2026-07-27 12:08:09.319
00e1f459-4ec1-46ba-935a-399925188aa0	Deepak Gusain	deepak.gusain@technosyslabs.com	+919220437682	technosyslabs	fasfdsaff	asfdasf	2026-07-27 12:16:49.11	2026-07-27 12:16:49.11
\.


--
-- Name: Account Account_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_pkey" PRIMARY KEY (provider, "providerAccountId");


--
-- Name: Banner Banner_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."Banner"
    ADD CONSTRAINT "Banner_pkey" PRIMARY KEY (id);


--
-- Name: Capabilities Capabilities_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."Capabilities"
    ADD CONSTRAINT "Capabilities_pkey" PRIMARY KEY (id);


--
-- Name: CareerApplication CareerApplication_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."CareerApplication"
    ADD CONSTRAINT "CareerApplication_pkey" PRIMARY KEY (id);


--
-- Name: ContactSection ContactSection_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."ContactSection"
    ADD CONSTRAINT "ContactSection_pkey" PRIMARY KEY (id);


--
-- Name: DeliveryProcess DeliveryProcess_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."DeliveryProcess"
    ADD CONSTRAINT "DeliveryProcess_pkey" PRIMARY KEY (id);


--
-- Name: Job Job_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."Job"
    ADD CONSTRAINT "Job_pkey" PRIMARY KEY (id);


--
-- Name: NewsletterSubscription NewsletterSubscription_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."NewsletterSubscription"
    ADD CONSTRAINT "NewsletterSubscription_pkey" PRIMARY KEY (id);


--
-- Name: OutcomeFocus OutcomeFocus_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."OutcomeFocus"
    ADD CONSTRAINT "OutcomeFocus_pkey" PRIMARY KEY (id);


--
-- Name: ServiceBenefits ServiceBenefits_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."ServiceBenefits"
    ADD CONSTRAINT "ServiceBenefits_pkey" PRIMARY KEY (id);


--
-- Name: ServiceCategory ServiceCategory_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."ServiceCategory"
    ADD CONSTRAINT "ServiceCategory_pkey" PRIMARY KEY (id);


--
-- Name: Services Services_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."Services"
    ADD CONSTRAINT "Services_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("sessionToken");


--
-- Name: SiteSettings SiteSettings_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."SiteSettings"
    ADD CONSTRAINT "SiteSettings_pkey" PRIMARY KEY (id);


--
-- Name: Testimonial Testimonial_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."Testimonial"
    ADD CONSTRAINT "Testimonial_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: enquiries enquiries_pkey; Type: CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public.enquiries
    ADD CONSTRAINT enquiries_pkey PRIMARY KEY (id);


--
-- Name: Capabilities_serviceId_key; Type: INDEX; Schema: public; Owner: amit
--

CREATE UNIQUE INDEX "Capabilities_serviceId_key" ON public."Capabilities" USING btree ("serviceId");


--
-- Name: ContactSection_serviceId_key; Type: INDEX; Schema: public; Owner: amit
--

CREATE UNIQUE INDEX "ContactSection_serviceId_key" ON public."ContactSection" USING btree ("serviceId");


--
-- Name: DeliveryProcess_serviceId_key; Type: INDEX; Schema: public; Owner: amit
--

CREATE UNIQUE INDEX "DeliveryProcess_serviceId_key" ON public."DeliveryProcess" USING btree ("serviceId");


--
-- Name: NewsletterSubscription_email_key; Type: INDEX; Schema: public; Owner: amit
--

CREATE UNIQUE INDEX "NewsletterSubscription_email_key" ON public."NewsletterSubscription" USING btree (email);


--
-- Name: OutcomeFocus_serviceId_key; Type: INDEX; Schema: public; Owner: amit
--

CREATE UNIQUE INDEX "OutcomeFocus_serviceId_key" ON public."OutcomeFocus" USING btree ("serviceId");


--
-- Name: ServiceBenefits_serviceId_key; Type: INDEX; Schema: public; Owner: amit
--

CREATE UNIQUE INDEX "ServiceBenefits_serviceId_key" ON public."ServiceBenefits" USING btree ("serviceId");


--
-- Name: user_email_idx; Type: INDEX; Schema: public; Owner: amit
--

CREATE UNIQUE INDEX user_email_idx ON public."User" USING btree (email);


--
-- Name: Account Account_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."Account"
    ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Capabilities Capabilities_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."Capabilities"
    ADD CONSTRAINT "Capabilities_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Services"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: CareerApplication CareerApplication_jobId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."CareerApplication"
    ADD CONSTRAINT "CareerApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES public."Job"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ContactSection ContactSection_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."ContactSection"
    ADD CONSTRAINT "ContactSection_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Services"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: DeliveryProcess DeliveryProcess_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."DeliveryProcess"
    ADD CONSTRAINT "DeliveryProcess_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Services"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: OutcomeFocus OutcomeFocus_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."OutcomeFocus"
    ADD CONSTRAINT "OutcomeFocus_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Services"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: ServiceBenefits ServiceBenefits_serviceId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."ServiceBenefits"
    ADD CONSTRAINT "ServiceBenefits_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES public."Services"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Services Services_categoryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."Services"
    ADD CONSTRAINT "Services_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES public."ServiceCategory"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: amit
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: amit
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

\unrestrict SGTGVLt0rBklHCMY8dJuGa28sneGT9ZeceXOb6cv9mMxKcycl44b211zctOyQIR

