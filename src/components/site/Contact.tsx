import { MapPin, Phone, MessageCircle, Mail, Navigation, ExternalLink } from "lucide-react";
import { useSiteSettings, telHref, waHref } from "@/hooks/useSiteSettings";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Contact() {
  const { settings } = useSiteSettings();
const directions =
  "https://www.google.com/maps/dir/?api=1&destination=17.6844063,77.6219366";

const openMaps =
  "https://www.google.com/maps/search/?api=1&query=17.6844063,77.6219366";
  const items = [
    { icon: MapPin, label: "Office Address", value: settings.address },
    { icon: Phone, label: "Phone", value: settings.phone, href: telHref(settings.phone) },
    { icon: MessageCircle, label: "WhatsApp", value: settings.whatsapp, href: waHref(settings.whatsapp) },
    { icon: Mail, label: "Email", value: settings.email, href: `mailto:${settings.email}` },
  ];

  return (
    <section id="contact" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Get In Touch" title="Contact Us" subtitle="We'd love to hear about your next project. Reach out anytime." />

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Reveal direction="left" className="space-y-4">
            {items.map((it) => (
              <a
                key={it.label}
                href={it.href}
                target={it.href?.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition hover:border-gold/40"
              >
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-hero text-primary-foreground">
                  <it.icon className="size-5" />
                </span>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{it.label}</div>
                  <div className="mt-0.5 font-medium text-foreground">{it.value}</div>
                </div>
              </a>
            ))}
            <div className="flex flex-wrap gap-3 pt-1">
              <a href={telHref(settings.phone)} className="inline-flex items-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition hover:scale-105">
                <Phone className="size-4" /> Call Now
              </a>
              <a href={waHref(settings.whatsapp)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[oklch(0.7_0.17_150)] px-6 py-3 text-sm font-semibold text-white transition hover:scale-105">
                <MessageCircle className="size-4" /> WhatsApp Now
              </a>
            </div>
          </Reveal>

          <Reveal direction="right" className="overflow-hidden rounded-2xl border border-border shadow-card">
            <iframe
              title="PNK Builders office location"
              src={settings.map_embed_url}
              className="h-72 w-full sm:h-80"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="flex gap-3 bg-card p-4">
              <a href={directions} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-hero px-4 py-2.5 text-sm font-semibold text-primary-foreground">
                <Navigation className="size-4" /> Get Directions
              </a>
              <a href={openMaps} target="_blank" rel="noopener noreferrer" className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent">
                <ExternalLink className="size-4" /> Open in Maps
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
