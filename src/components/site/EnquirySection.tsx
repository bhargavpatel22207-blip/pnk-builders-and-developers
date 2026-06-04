import { useState } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { submitEnquiry } from "@/lib/enquiries";
import { PROJECT_TYPES, BUDGET_RANGES } from "@/lib/site-data";
import { Reveal } from "./Reveal";

const initial = { name: "", mobile: "", email: "", location: "", project_type: "", budget: "", message: "" };

export function EnquirySection() {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);

  const set = (k: keyof typeof initial) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^[0-9+\s-]{8,15}$/.test(form.mobile.trim())) {
      toast.error("Please enter a valid name and mobile number.");
      return;
    }
    setLoading(true);
    try {
      await submitEnquiry({ ...form, source: "enquiry_section" });
      toast.success("Request received! Our team will reach out soon.");
      setForm(initial);
    } catch (err: any) {
  console.error("ENQUIRY ERROR:", err);
  toast.error(err?.message || "Unknown error");
}finally {
      setLoading(false);
    }
  };

  const inputCls =
    "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

  return (
    <section id="enquiry" className="bg-secondary py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal className="rounded-3xl bg-gradient-hero p-1.5 shadow-elegant">
          <div className="rounded-[1.35rem] bg-card p-8 sm:p-10">
            <div className="text-center">
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">Free Consultation</span>
              <h2 className="mt-2 font-display text-3xl font-bold text-foreground sm:text-4xl">Request a Consultation</h2>
              <p className="mt-3 text-muted-foreground">Tell us about your project and our experts will get in touch.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-4 sm:grid-cols-2">
              <input className={inputCls} placeholder="Full Name *" value={form.name} onChange={set("name")} />
              <input className={inputCls} type="tel" placeholder="Mobile Number *" value={form.mobile} onChange={set("mobile")} />
              <input className={inputCls} type="email" placeholder="Email" value={form.email} onChange={set("email")} />
              <input className={inputCls} placeholder="Location" value={form.location} onChange={set("location")} />
              <select className={inputCls} value={form.project_type} onChange={set("project_type")}>
                <option value="">Project Type</option>
                {PROJECT_TYPES.map((t) => <option key={t}>{t}</option>)}
              </select>
              <select className={inputCls} value={form.budget} onChange={set("budget")}>
                <option value="">Budget Range</option>
                {BUDGET_RANGES.map((b) => <option key={b}>{b}</option>)}
              </select>
              <textarea className={`${inputCls} sm:col-span-2`} rows={4} maxLength={1000} placeholder="Your Message" value={form.message} onChange={set("message")} />
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-8 py-3.5 text-sm font-semibold text-gold-foreground transition hover:scale-[1.02] disabled:opacity-70 sm:col-span-2"
              >
                {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
                Request Consultation
              </button>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
