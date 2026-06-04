import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ArrowUpRight } from "lucide-react";
import { PROJECTS, PROJECT_FILTERS } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";

export function Projects() {
  const [filter, setFilter] = useState<(typeof PROJECT_FILTERS)[number]>("All");

  const filtered = PROJECTS.filter((p) =>
    filter === "All" ? true : p.type === filter || p.status === filter,
  );

  return (
    <section id="projects" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Our Work"
          title="Featured Projects"
          subtitle="A glimpse of the homes and spaces we have proudly delivered across Telangana."
        />

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {PROJECT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                filter === f
                  ? "bg-gradient-hero text-primary-foreground shadow-card"
                  : "bg-secondary text-foreground hover:bg-accent"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative break-inside-avoid overflow-hidden rounded-2xl shadow-card"
              >
<div className="aspect-[3/4] overflow-hidden">
  <img
    src={p.image}
    alt={`${p.title} in ${p.location}`}
    loading="lazy"
    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
  />
</div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800/60 via-slate-800/10 to-transparent" />
                <span
                  className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
                    p.status === "Completed" ? "bg-gradient-gold text-gold-foreground" : "glass text-primary-foreground"
                  }`}
                >
                  {p.status}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <span className="text-xs font-semibold uppercase tracking-wider text-gold">{p.type}</span>
                  <h3 className="mt-1 font-display text-lg font-bold text-primary-foreground">{p.title}</h3>
                  <div className="mt-1 flex items-center justify-between">
                    <span className="flex items-center gap-1 text-sm text-primary-foreground/80">
                      <MapPin className="size-3.5" /> {p.location}
                    </span>
                   {p.link && (
  <a
    href={p.link}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-1 text-sm font-semibold text-gold"
  >
    View Details <ArrowUpRight className="size-3.5" />
  </a>
)}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
