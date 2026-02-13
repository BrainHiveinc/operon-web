import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { TEAM_MEMBERS, BRAND_NAME } from "@/lib/constants";

export default function AboutPage() {
  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="section-container section-padding relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-6">
              Building the future of <span className="gradient-text">governed AI</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're a team of engineers and operators who've seen AI fail at scale. {BRAND_NAME} is what we wish existed.
            </p>
          </motion.div>
        </div>
      </section>
      <section className="section-padding bg-secondary/30">
        <div className="section-container">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Our team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="glass-card p-6 text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-info flex items-center justify-center mx-auto mb-4">
                  <span className="font-display font-bold text-lg text-primary-foreground">{member.avatar}</span>
                </div>
                <h3 className="font-display font-semibold">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-xs text-muted-foreground">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="section-padding">
        <div className="section-container text-center">
          <h2 className="text-3xl font-display font-bold mb-6">Join us</h2>
          <p className="text-muted-foreground mb-8">We're hiring engineers who want to solve hard problems.</p>
          <Button size="lg" asChild><Link to="/careers">View open roles <ChevronRight className="w-4 h-4 ml-2" /></Link></Button>
        </div>
      </section>
    </Layout>
  );
}
