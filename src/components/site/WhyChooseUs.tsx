import { motion } from "framer-motion";
import { WHY_CHOOSE } from "@/lib/site-data";
import { SectionHeading } from "./SectionHeading";
import { DynamicIcon } from "./DynamicIcon";
import { staggerContainer, staggerItem } from "./Reveal";

export function WhyChooseUs() {
  return (
    <section className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why PNK"
          title="Why Choose Us"
          subtitle="We combine craftsmanship, transparency and reliability to build with confidence."
        />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {WHY_CHOOSE.map((w) => (
            <motion.div
              key={w.title}
              variants={staggerItem}
              className="group flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-card transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-gold text-gold-foreground">
                <DynamicIcon name={w.icon} className="size-6" />
              </span>
              <div>
                <h3 className="font-display text-base font-bold text-foreground">{w.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{w.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
