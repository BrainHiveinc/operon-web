import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { FileText, BookOpen, Code, Rocket, Bell, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogoWithHeartbeat } from "@/components/LogoWithHeartbeat";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function DocsPageMVP() {
  const [email, setEmail] = useState("");

  return (
    <Layout>
      {/* Hero Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent" />
        <div className="absolute inset-0 grid-bg opacity-30" />

        <div className="section-container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Logo with Heartbeat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.05 }}
              className="mb-8"
            >
              <LogoWithHeartbeat size="md" clickable={true} showBadge={false} />
            </motion.div>

            {/* Coming Soon Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary/10 border-2 border-primary/30 mb-8"
            >
              <Rocket className="w-5 h-5 text-primary" />
              <span className="font-semibold text-primary">
                Documentation Coming Soon
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-display font-bold tracking-tight mb-6"
            >
              <span className="gradient-text">Comprehensive guides</span>
              <br />
              <span className="text-foreground">launching soon.</span>
            </motion.h1>

            {/* Subhead */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
            >
              We're crafting detailed documentation, tutorials, and API references to help you build with Operon OS. Get notified when we launch.
            </motion.p>

            {/* Email Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-md mx-auto mb-10"
            >
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your.email@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12"
                />
                <Button size="lg" className="gap-2">
                  <Bell className="w-4 h-4" />
                  Notify Me
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Join 2,400+ developers waiting for launch
              </p>
            </motion.div>

            {/* What's Coming */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid md:grid-cols-3 gap-6"
            >
              {[
                {
                  icon: BookOpen,
                  title: "Getting Started",
                  description: "Quick-start guides and tutorials to deploy your first autonomous agent in minutes.",
                },
                {
                  icon: Code,
                  title: "API Reference",
                  description: "Complete API documentation with code examples in multiple languages.",
                },
                {
                  icon: FileText,
                  title: "Best Practices",
                  description: "Enterprise patterns, security guidelines, and production deployment strategies.",
                },
              ].map((item, idx) => {
                const Icon = item.icon;
                return (
                  <Card
                    key={idx}
                    className="p-6 glass-card text-center hover:shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="font-display font-semibold mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </Card>
                );
              })}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Meanwhile Section */}
      <section className="section-padding bg-secondary/30">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              In the meantime...
            </h2>
            <p className="text-lg text-muted-foreground">
              Explore these resources to learn more about Operon OS
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 glass-card-hover h-full">
                <h3 className="font-display font-semibold text-lg mb-2">
                  Explore Use Cases
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  See how enterprises and entrepreneurs are using autonomous agents to scale their operations.
                </p>
                <Button variant="outline" className="gap-2" asChild>
                  <Link to="/use-cases">
                    View Use Cases
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 glass-card-hover h-full">
                <h3 className="font-display font-semibold text-lg mb-2">
                  Talk to Our Team
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get personalized guidance on building your autonomous agent workforce.
                </p>
                <Button className="gap-2" asChild>
                  <Link to="/contact">
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
