import { Facebook, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { NAV_LINKS, SERVICES } from "@/lib/site-data";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export function Footer() {
  const { settings } = useSiteSettings();
  const year = new Date().getFullYear();

  const socials = [
    { icon: Facebook, href: settings.facebook },
    { icon: Instagram, href: settings.instagram },
    { icon: Youtube, href: settings.youtube },
  ].filter((s) => s.href);

  return (
    <footer className="bg-deep-2 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-lg bg-gradient-gold font-display text-lg font-bold text-gold-foreground">P</span>
            <span className="font-display text-lg font-bold">PNK Builders <span className="block text-[10px] uppercase tracking-[0.25em] text-gold">& Developers</span></span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-primary-foreground/70">
            Building trust and delivering quality construction across Telangana for over 15 years.
          </p>
          {socials.length > 0 && (
            <div className="mt-5 flex gap-3">
              {socials.map((s, i) => (
                <a key={i} href={s.href!} target="_blank" rel="noopener noreferrer" className="grid size-9 place-items-center rounded-full bg-primary-foreground/10 transition hover:bg-gradient-gold hover:text-gold-foreground">
                  <s.icon className="size-4" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div>
          <h4 className="font-display font-bold text-gold">Quick Links</h4>
          <ul className="mt-4 space-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-sm text-primary-foreground/70 transition hover:text-gold">{l.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-gold">Services</h4>
          <ul className="mt-4 space-y-2">
            {SERVICES.slice(0, 6).map((s) => (
              <li key={s.title} className="text-sm text-primary-foreground/70">{s.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-display font-bold text-gold">Contact</h4>
          <ul className="mt-4 space-y-3 text-sm text-primary-foreground/70">
            <li className="flex items-start gap-2"><MapPin className="mt-0.5 size-4 shrink-0 text-gold" /> {settings.address}</li>
            <li className="flex items-center gap-2"><Phone className="size-4 shrink-0 text-gold" /> {settings.phone}</li>
            <li className="flex items-center gap-2"><Mail className="size-4 shrink-0 text-gold" /> {settings.email}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 py-5 text-center text-xs text-primary-foreground/60">
        © {year} PNK Builders & Developers. All rights reserved.
      </div>
    </footer>
  );
}
