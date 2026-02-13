import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Check, ChevronRight, Sparkles } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { PRICING_TIERS, BRAND_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

const faqs = [
  {
    question: "What counts as a mission?",
    answer: "A mission is a complete end-to-end workflow execution. Each mission can contain multiple tasks, tool calls, and validation steps. You're billed per mission, not per individual operation.",
  },
  {
    question: "Can I change plans mid-cycle?",
    answer: "Yes, you can upgrade at any time and we'll prorate your charges. Downgrades take effect at the next billing cycle.",
  },
  {
    question: "What happens if I exceed my mission limit?",
    answer: "We'll notify you when you reach 80% of your limit. You can upgrade your plan or purchase additional missions at $0.02 each.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes, all plans include a 14-day free trial with full access to features. No credit card required to start.",
  },
  {
    question: "What's included in priority support?",
    answer: "Priority support includes <4 hour response times during business hours, a dedicated Slack channel, and monthly architecture reviews.",
  },
  {
    question: "Do you offer custom contracts?",
    answer: "Yes, Enterprise customers can negotiate custom terms including SLAs, pricing, and compliance requirements. Contact sales to discuss.",
  },
];

function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-glow" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      
      <div className="section-container section-padding relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
            Simple, <span className="gradient-text">transparent</span> pricing
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Start free, scale as you grow. No hidden fees, no per-seat pricing. 
            Pay for what you use.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 lg:gap-8"
        >
          {PRICING_TIERS.map((tier) => (
            <motion.div
              key={tier.name}
              variants={item}
              className={cn(
                "glass-card p-6 lg:p-8 relative",
                tier.popular && "border-primary/50 glow"
              )}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    <Sparkles className="w-3 h-3" />
                    Most popular
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="font-display font-semibold text-xl mb-2">{tier.name}</h3>
                <p className="text-sm text-muted-foreground">{tier.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-display font-bold">{tier.price}</span>
                <span className="text-muted-foreground">{tier.period}</span>
              </div>

              <Button
                className={cn(
                  "w-full mb-6",
                  tier.popular ? "glow" : ""
                )}
                variant={tier.popular ? "default" : "outline"}
                asChild
              >
                <Link to="/contact">
                  {tier.cta}
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>

              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ComparisonSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            What's included
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-4 px-4 font-display font-semibold">Feature</th>
                <th className="text-center py-4 px-4 font-display font-semibold">Starter</th>
                <th className="text-center py-4 px-4 font-display font-semibold text-primary">Team</th>
                <th className="text-center py-4 px-4 font-display font-semibold">Enterprise</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Missions per month", "1,000", "25,000", "Unlimited"],
                ["Concurrent agents", "5", "25", "Unlimited"],
                ["Custom validators", "❌", "✓", "✓"],
                ["API access", "❌", "✓", "✓"],
                ["SSO / SAML", "❌", "❌", "✓"],
                ["Log retention", "7 days", "90 days", "Unlimited"],
                ["Support SLA", "Community", "<4 hours", "Custom"],
                ["Approval workflows", "❌", "❌", "✓"],
              ].map(([feature, starter, team, enterprise]) => (
                <tr key={feature} className="border-b border-border/50">
                  <td className="py-4 px-4 font-medium">{feature}</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">{starter}</td>
                  <td className="text-center py-4 px-4">{team}</td>
                  <td className="text-center py-4 px-4 text-muted-foreground">{enterprise}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
}

function FAQSection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Frequently asked questions
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {faqs.map((faq) => (
            <motion.div key={faq.question} variants={item} className="glass-card p-6">
              <h3 className="font-display font-semibold mb-2">{faq.question}</h3>
              <p className="text-sm text-muted-foreground">{faq.answer}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Ready to get started?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/contact">
                Start free trial
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact sales</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function PricingPage() {
  return (
    <Layout>
      <HeroSection />
      <PricingSection />
      <ComparisonSection />
      <FAQSection />
      <CTASection />
    </Layout>
  );
}
