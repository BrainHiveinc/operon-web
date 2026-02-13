import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { JOB_OPENINGS, BRAND_NAME } from "@/lib/constants";
import { MapPin, Briefcase, ChevronRight } from "lucide-react";

export default function CareersPage() {
  return (
    <Layout>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow" />
        <div className="section-container section-padding relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center mb-10">
            <h1 className="text-4xl sm:text-5xl font-display font-bold tracking-tight mb-6">
              Join the <span className="gradient-text">{BRAND_NAME}</span> team
            </h1>
            <p className="text-lg text-muted-foreground">Help us build the infrastructure for governed AI at scale.</p>
          </motion.div>
          <div className="max-w-2xl mx-auto space-y-4">
            {JOB_OPENINGS.map((job, index) => (
              <motion.div key={job.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="glass-card-hover p-6 flex items-center justify-between">
                <div>
                  <h3 className="font-display font-semibold mb-1">{job.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" />{job.team}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{job.location}</span>
                  </div>
                </div>
                <Button variant="ghost" size="sm"><ChevronRight className="w-4 h-4" /></Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
