import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { TESTIMONIALS } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";

export function Testimonials() {
  const [i, setI] = useState(0);
  const next = useCallback(() => setI((p) => (p + 1) % TESTIMONIALS.length), []);
  const prev = () => setI((p) => (p - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  const t = TESTIMONIALS[i];

  return (
    <section id="testimonials" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <SectionHeading eyebrow="Testimonials" title="What Our Clients Say" />

        <div className="relative mt-12 rounded-3xl border border-border bg-card p-8 shadow-elegant sm:p-12">
          <Quote className="absolute -top-5 left-8 size-12 rounded-xl bg-gradient-gold p-2.5 text-gold-foreground" />
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.4 }}
            >
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className={`size-5 ${s < t.rating ? "fill-gold text-gold" : "text-muted"}`} />
                ))}
              </div>
              <p className="mt-5 text-lg leading-relaxed text-foreground">“{t.review}”</p>
              <div className="mt-6">
                <div className="font-display font-bold text-foreground">{t.name}</div>
                <div className="text-sm text-muted-foreground">{t.location}</div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, d) => (
                <button
                  key={d}
                  onClick={() => setI(d)}
                  aria-label={`Go to testimonial ${d + 1}`}
                  className={`h-2 rounded-full transition-all ${d === i ? "w-6 bg-gold" : "w-2 bg-border"}`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={prev} aria-label="Previous" className="grid size-10 place-items-center rounded-full border border-border text-foreground transition hover:bg-accent">
                <ChevronLeft className="size-5" />
              </button>
              <button onClick={next} aria-label="Next" className="grid size-10 place-items-center rounded-full bg-gradient-hero text-primary-foreground transition hover:scale-105">
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
