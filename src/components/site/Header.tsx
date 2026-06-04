import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone, MessageCircle, LogIn } from "lucide-react";
import { NAV_LINKS } from "@/lib/site-data";
import { useSiteSettings, telHref, waHref } from "@/hooks/useSiteSettings";

export function Header({ onEnquire }: { onEnquire: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { settings } = useSiteSettings();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-light shadow-card py-2" : "py-4"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#home" className="flex items-center gap-3">
      <img
  src="/logo.png"
  alt="PNK Builders"
  className="h-14 w-auto -mt-2"
/>
          <span className={`font-display text-lg font-bold leading-tight ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            PNK Builders
            <span className="block text-[10px] font-medium uppercase tracking-[0.25em] text-gold">& Developers</span>
          </span>
        </a>

        <ul className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-gold ${
                  scrolled ? "text-foreground" : "text-primary-foreground/90"
                }`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={waHref(settings.whatsapp)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="grid size-9 place-items-center rounded-full bg-[oklch(0.7_0.17_150)] text-white transition-transform hover:scale-105"
          >
            <MessageCircle className="size-4" />
          </a>
          <a
            href={telHref(settings.phone)}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-4 py-2 text-sm font-semibold text-gold-foreground transition-transform hover:scale-105"
          >
            <Phone className="size-4" /> Call Now
          </a>
          <Link
            to="/login"
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
              scrolled
                ? "border-border text-foreground hover:bg-accent"
                : "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            }`}
          >
            <LogIn className="size-4" /> Login
          </Link>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className={`lg:hidden ${scrolled ? "text-foreground" : "text-primary-foreground"}`}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden glass-light lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex gap-2">
                <a href={telHref(settings.phone)} className="flex-1 rounded-full bg-gradient-gold px-4 py-2 text-center text-sm font-semibold text-gold-foreground">
                  Call Now
                </a>
                <Link to="/login" className="flex-1 rounded-full border border-border px-4 py-2 text-center text-sm font-medium text-foreground">
                  Login
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
