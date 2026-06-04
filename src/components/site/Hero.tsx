import { motion } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import heroImg from "@/assets/hero.jpg";
import { STATS } from "@/lib/site-data";
import { CountUp } from "./CountUp";

export function Hero({ onConsult }: { onConsult: () => void }) {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden">
      <motion.img
        src={heroImg}
        alt="Premium residential construction project at golden hour"
        width={1920}
        height={1080}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-deep-2/90 via-deep-2/70 to-deep-2/30" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pt-28 pb-16 sm:px-6">
        <div className="max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-gold"
          >
            15+ Years of Excellence
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 font-display text-4xl font-bold leading-[1.05] text-primary-foreground text-balance sm:text-6xl"
          >
            Building Trust. <span className="text-gold font-bold">Delivering Quality.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/80"
          >
            15+ Years of Excellence in Construction and Property Development across Telangana.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <button
              onClick={onConsult}
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-gold px-7 py-3.5 text-sm font-semibold text-gold-foreground shadow-elegant transition-transform hover:scale-105"
            >
              Get Free Consultation
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full glass px-7 py-3.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary-foreground/10"
            >
              <PlayCircle className="size-4" /> View Projects
            </a>
          </motion.div>
        </div>

        <motion.dl
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.85, duration: 0.7 }}
          className="mt-16 grid grid-cols-2 gap-4 sm:max-w-3xl md:grid-cols-4"
        >
          {STATS.map((s) => (
           <div
  key={s.label}
  className="rounded-xl border border-white/20 bg-slate-900/35 backdrop-blur-lg px-4 py-5 text-center"
>
              <dd className="font-display text-3xl font-bold text-gold sm:text-4xl">
                <CountUp to={s.value} decimals={s.decimals ?? 0} suffix={s.suffix} />
              </dd>
              <dt className="mt-1 text-xs font-medium leading-snug text-primary-foreground/80">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
