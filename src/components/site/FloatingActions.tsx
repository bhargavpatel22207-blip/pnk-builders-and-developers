import { Phone, MessageCircle } from "lucide-react";
import { useSiteSettings, telHref, waHref } from "@/hooks/useSiteSettings";

export function FloatingActions() {
  const { settings } = useSiteSettings();
  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={waHref(settings.whatsapp)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="grid size-12 place-items-center rounded-full bg-[oklch(0.7_0.17_150)] text-white shadow-elegant transition-transform hover:scale-110"
      >
        <MessageCircle className="size-6" />
      </a>
      <a
        href={telHref(settings.phone)}
        aria-label="Call now"
        className="grid size-12 place-items-center rounded-full bg-gradient-gold text-gold-foreground shadow-elegant transition-transform hover:scale-110"
      >
        <Phone className="size-6" />
      </a>
    </div>
  );
}
