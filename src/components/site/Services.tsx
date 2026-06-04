import { motion } from "framer-motion";
import { SERVICES } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";
import { DynamicIcon } from "./DynamicIcon";
import { staggerContainer, staggerItem } from "./Reveal";

export function Services() {
  return (
    <section id="services" className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="What We Do"
          title="Our Construction Services"
          subtitle="From concept to keys — comprehensive construction and development solutions under one roof."
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >
          {SERVICES.map((s) => (
            <motion.div
              key={s.title}
              variants={staggerItem}
              className="group rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-elegant"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-gradient-hero text-primary-foreground transition-colors group-hover:bg-gradient-gold group-hover:text-gold-foreground">
                <DynamicIcon name={s.icon} className="size-6" />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
