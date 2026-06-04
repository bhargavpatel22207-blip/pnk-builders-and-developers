import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import aboutImg from "@/assets/about.jpg";
import { VALUES } from "@/lib/site-data";
import { Reveal } from "./Reveal";
import { CountUp } from "./CountUp";

export function About() {
  return (
    <section id="about" className="bg-background py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal direction="left">
          <div className="relative">
            <img
              src={aboutImg}
              alt="PNK Builders engineering and architecture team reviewing blueprints"
              width={1200}
              height={900}
              loading="lazy"
              className="rounded-2xl shadow-elegant"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="absolute -bottom-6 -right-2 rounded-2xl bg-gradient-hero px-6 py-5 text-center shadow-elegant sm:right-6"
            >
              <div className="font-display text-4xl font-bold text-gold">
                <CountUp to={30} suffix="+" />
              </div>
              <div className="text-xs font-medium text-primary-foreground/80">Homes Built</div>
            </motion.div>
          </div>
        </Reveal>

        <Reveal direction="right">
          <span className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            <span className="h-px w-8 bg-gold" /> About Us
          </span>
          <h2 className="font-display text-3xl font-bold text-foreground sm:text-4xl">
            About PNK Builders & Developers
          </h2>
          <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
            <p>
              PNK Builders and Developers is a well-established civil contracting and property
              development firm located in Dattagiri Colony, Zaheerabad. With over 15 years of
              experience, we have successfully completed residential and commercial construction
              projects across Zaheerabad, Narayankhed, Sangareddy and Rudraram.
            </p>
            <p>
              Known for quality workmanship, premium construction materials, timely project
              completion and customer satisfaction, PNK Builders has become one of the fastest-growing
              construction firms in the region — with 30+ individual homes built and an expanding
              footprint toward Hyderabad.
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">
            {VALUES.map((v) => (
              <div key={v} className="flex items-center gap-2 rounded-lg bg-secondary px-4 py-3">
                <CheckCircle2 className="size-5 shrink-0 text-gold" />
                <span className="text-sm font-semibold text-foreground">{v}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
