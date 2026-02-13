import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ChevronRight, Shield, Lock, FileCheck, Award, 
  CheckCircle2, Server, Eye, Key, AlertTriangle
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { SECURITY_CERTIFICATIONS, BRAND_NAME } from "@/lib/constants";

const iconMap: Record<string, React.ElementType> = {
  Shield, Lock, FileCheck, Award,
};

const securityFeatures = [
  {
    title: "Data Encryption",
    description: "All data is encrypted at rest using AES-256 and in transit using TLS 1.3.",
    icon: Lock,
  },
  {
    title: "Access Control",
    description: "Role-based access control with granular permissions and audit logging.",
    icon: Key,
  },
  {
    title: "Network Security",
    description: "Private VPC deployment, IP allowlisting, and DDoS protection.",
    icon: Server,
  },
  {
    title: "Monitoring",
    description: "24/7 security monitoring with real-time threat detection and response.",
    icon: Eye,
  },
  {
    title: "Incident Response",
    description: "Documented incident response procedures with <1 hour initial response SLA.",
    icon: AlertTriangle,
  },
  {
    title: "Compliance",
    description: "Regular third-party audits and penetration testing.",
    icon: FileCheck,
  },
];

const practices = [
  "All employees undergo background checks and security training",
  "Production access requires MFA and is logged",
  "Secrets management using HashiCorp Vault",
  "Regular vulnerability scanning and patching",
  "Bug bounty program for responsible disclosure",
  "Annual SOC 2 Type II audit",
];

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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-8">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              Enterprise-grade security
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6">
            Security you can <span className="gradient-text">trust</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {BRAND_NAME} is built with security-first principles. Your data and missions 
            are protected by industry-leading security practices.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function CertificationsSection() {
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
            Certifications & Compliance
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SECURITY_CERTIFICATIONS.map((cert) => {
            const Icon = iconMap[cert.icon];
            return (
              <motion.div
                key={cert.name}
                variants={item}
                className="glass-card p-6 text-center"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold mb-1">{cert.name}</h3>
                <span className={`text-sm ${
                  cert.status === "Certified" ? "text-success" :
                  cert.status === "Compliant" ? "text-success" :
                  cert.status === "Available" ? "text-info" : "text-warning"
                }`}>
                  {cert.status}
                </span>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturesSection() {
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
            Security features
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {securityFeatures.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="glass-card p-6"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function PracticesSection() {
  return (
    <section className="section-padding bg-secondary/30">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Security best practices
            </h2>
            <p className="text-muted-foreground mb-6">
              We follow industry best practices and continuously improve our security posture.
            </p>
            <ul className="space-y-3">
              {practices.map((practice) => (
                <li key={practice} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{practice}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8"
          >
            <Shield className="w-12 h-12 text-primary mb-6" />
            <h3 className="text-xl font-display font-semibold mb-4">
              Report a vulnerability
            </h3>
            <p className="text-muted-foreground mb-6">
              We appreciate the work of security researchers. If you discover a vulnerability, 
              please report it responsibly.
            </p>
            <Button asChild>
              <a href="mailto:security@nexus.dev">
                security@nexus.dev
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="section-padding">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Need more details?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Request our security documentation package or schedule a call with our security team.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="gap-2" asChild>
              <Link to="/contact">
                Request security docs
                <ChevronRight className="w-4 h-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/contact">Contact security team</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function SecurityPage() {
  return (
    <Layout>
      <HeroSection />
      <CertificationsSection />
      <FeaturesSection />
      <PracticesSection />
      <CTASection />
    </Layout>
  );
}
