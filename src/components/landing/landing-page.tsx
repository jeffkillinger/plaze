import { ButtonLink } from "@/src/components/landing/button-link";
import { Container } from "@/src/components/ui/container";
import { SectionHeading } from "@/src/components/ui/section-heading";

const features = [
  {
    title: "Unified workspace",
    description:
      "Bring tasks, notes, and project decisions into one calm interface that stays easy to scan as your team grows.",
  },
  {
    title: "Fast automation",
    description:
      "Reduce repetitive coordination with lightweight workflows that move work forward without adding process overhead.",
  },
  {
    title: "Clear visibility",
    description:
      "Track progress, blockers, and priorities in real time so your team can act quickly with shared context.",
  },
];

const steps = [
  {
    title: "Connect your work",
    description:
      "Set up your team space, define shared goals, and bring ongoing work into one structured view.",
  },
  {
    title: "Organize the flow",
    description:
      "Create simple routines for intake, execution, and review so important work never gets lost in the shuffle.",
  },
  {
    title: "Scale with confidence",
    description:
      "Use built-in insights to refine your process and keep execution predictable as projects multiply.",
  },
];

const pricingTiers = [
  {
    name: "Starter",
    price: "Coming soon",
    description: "For individuals and small teams getting organized.",
  },
  {
    name: "Growth",
    price: "Custom pricing",
    description: "For teams that need deeper workflows and reporting.",
  },
  {
    name: "Enterprise",
    price: "Talk to sales",
    description: "For larger organizations with advanced governance needs.",
  },
];

function HeroSection() {
  return (
    <header className="relative overflow-hidden pb-20 pt-6 sm:pb-24 sm:pt-8">
      <Container as="nav" className="flex items-center justify-between">
        <a
          href="#top"
          className="text-lg font-semibold tracking-tight text-slate-950"
          aria-label="Plaze home"
        >
          Plaze
        </a>
        <div className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <a href="#features" className="transition-colors hover:text-slate-950">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-slate-950">
            How it works
          </a>
          <a href="#pricing" className="transition-colors hover:text-slate-950">
            Pricing
          </a>
        </div>
      </Container>

      <Container className="relative mt-16">
        <div
          aria-hidden="true"
          className="absolute inset-x-10 top-0 -z-10 h-64 rounded-full bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),_transparent_60%)] blur-3xl"
        />
        <div className="mx-auto max-w-3xl text-center">
          <p className="inline-flex rounded-full border border-sky-100 bg-white/80 px-4 py-1 text-sm font-medium text-sky-800 shadow-sm backdrop-blur">
            Work coordination for focused teams
          </p>
          <h1 className="mt-8 text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
            Run projects with less friction and more clarity.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            Plaze helps teams plan, align, and execute work in one clean space
            designed for fast-moving operations.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <ButtonLink href="#pricing">Join the waitlist</ButtonLink>
            <ButtonLink href="#features" variant="secondary">
              Explore features
            </ButtonLink>
          </div>
        </div>

        <div className="mt-16 rounded-[2rem] border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.08)] backdrop-blur sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <section
              aria-labelledby="overview-title"
              className="rounded-[1.5rem] border border-slate-100 bg-slate-50 p-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">Overview</p>
                  <h2
                    id="overview-title"
                    className="mt-1 text-xl font-semibold text-slate-950"
                  >
                    Weekly operations pulse
                  </h2>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
                  92% on track
                </span>
              </div>
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Active projects</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">18</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Automations run</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">346</p>
                </div>
                <div className="rounded-2xl bg-white p-4 shadow-sm">
                  <p className="text-sm text-slate-500">Time saved</p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">11 hrs</p>
                </div>
              </div>
            </section>

            <aside className="rounded-[1.5rem] border border-slate-100 bg-slate-950 p-6 text-white">
              <p className="text-sm font-medium text-slate-300">Today</p>
              <h2 className="mt-2 text-xl font-semibold">Team focus</h2>
              <ul className="mt-6 space-y-4 text-sm text-slate-300">
                <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Launch prep review at 11:00 AM
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Resolve two blocked approvals
                </li>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  Publish customer rollout update
                </li>
              </ul>
            </aside>
          </div>
        </div>
      </Container>
    </header>
  );
}

function FeaturesSection() {
  return (
    <section id="features" className="py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Features"
          title="Everything your team needs to stay aligned"
          description="Plaze keeps planning, execution, and communication close together so momentum does not depend on constant follow-up."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-100 text-sm font-semibold text-sky-800">
                {feature.title.slice(0, 1)}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-slate-950">
                {feature.title}
              </h3>
              <p className="mt-3 text-base leading-7 text-slate-600">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-20 sm:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <SectionHeading
            eyebrow="How It Works"
            title="A simple system that scales with your team"
            description="Start with structure, automate the repetitive parts, and keep every stakeholder working from the same source of truth."
          />
          <ol className="space-y-5">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="rounded-[1.5rem] border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-950 text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xl font-semibold text-slate-950">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-base leading-7 text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-20 sm:py-24">
      <Container>
        <div className="rounded-[2rem] border border-slate-200 bg-slate-950 px-6 py-12 text-white shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:px-10">
          <SectionHeading
            eyebrow="Pricing"
            title="Flexible plans are on the way"
            description="Pricing is still being finalized. For now, use this placeholder section to signal upcoming plans and collect early interest."
            tone="inverse"
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pricingTiers.map((tier) => (
              <article
                key={tier.name}
                className="rounded-[1.5rem] border border-white/10 bg-white/5 p-6"
              >
                <h3 className="text-xl font-semibold">{tier.name}</h3>
                <p className="mt-4 text-2xl font-semibold">{tier.price}</p>
                <p className="mt-3 text-sm leading-6 text-slate-300">
                  {tier.description}
                </p>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="mailto:hello@plaze.app" variant="secondary">
              Contact sales
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 py-10">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-600">
          © 2026 Plaze. Built for teams that value clarity.
        </p>
        <nav aria-label="Footer" className="flex gap-6 text-sm text-slate-600">
          <a href="#features" className="transition-colors hover:text-slate-950">
            Features
          </a>
          <a
            href="#how-it-works"
            className="transition-colors hover:text-slate-950"
          >
            How it works
          </a>
          <a href="#pricing" className="transition-colors hover:text-slate-950">
            Pricing
          </a>
        </nav>
      </Container>
    </footer>
  );
}

export function LandingPage() {
  return (
    <main id="top" className="min-h-screen bg-transparent">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <PricingSection />
      <Footer />
    </main>
  );
}
