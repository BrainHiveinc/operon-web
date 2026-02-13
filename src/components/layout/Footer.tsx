import { Link } from "react-router-dom";
import { BRAND_NAME } from "@/lib/constants";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="section-container py-12 md:py-16">
        <div className="flex flex-col items-center text-center gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <Logo className="w-10 h-10" animated={false} />
            <span className="font-display font-bold text-xl bg-gradient-to-r from-primary to-info bg-clip-text text-transparent">
              {BRAND_NAME}
            </span>
          </Link>

          {/* Tagline */}
          <p className="text-sm text-muted-foreground max-w-md">
            Enterprise-grade autonomous AI agents. Build your intelligent workforce with governance and control.
          </p>

          {/* Copyright */}
          <p className="text-xs text-muted-foreground pt-4 border-t border-border/50">
            © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
