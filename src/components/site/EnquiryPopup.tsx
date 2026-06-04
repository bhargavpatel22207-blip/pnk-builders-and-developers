import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Building2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { submitEnquiry } from "@/lib/enquiries";

export function EnquiryPopup() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", mobile: "", location: "", project_requirement: "" });

  useEffect(() => {
    if (sessionStorage.getItem("pnk_enquiry_shown")) return;
    const t = setTimeout(() => {
      setOpen(true);
      sessionStorage.setItem("pnk_enquiry_shown", "1");
    }, 2500);
    return () => clearTimeout(t);
  }, []);

  const close = () => setOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !/^[0-9+\s-]{8,15}$/.test(form.mobile.trim())) {
      toast.error("Please enter a valid name and mobile number.");
      return;
    }
    setLoading(true);
    try {
      await submitEnquiry({
        name: form.name,
        mobile: form.mobile,
        location: form.location,
        message: form.project_requirement,
        project_type: form.project_requirement,
        source: "popup",
      });
      toast.success("Thank you! Our team will contact you shortly.");
      setOpen(false);
    } catch (err: any) {
  console.error("ENQUIRY ERROR:", err);
  toast.error(err?.message || "Unknown error");
}finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-deep-2/70 backdrop-blur-sm" onClick={close} />
          <motion.div
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 24, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl bg-card shadow-elegant"
          >
            <div className="bg-gradient-hero px-6 py-7 text-center">
              <span className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-gradient-gold">
                <Building2 className="size-6 text-gold-foreground" />
              </span>
              <h3 className="font-display text-xl font-bold text-primary-foreground text-balance">
                Build Your Dream Home With PNK Builders & Developers
              </h3>
              <button onClick={close} aria-label="Close" className="absolute right-4 top-4 text-primary-foreground/80 hover:text-primary-foreground">
                <X className="size-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 p-6">
              <Field placeholder="Your Name *" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
              <Field placeholder="Mobile Number *" value={form.mobile} onChange={(v) => setForm({ ...form, mobile: v })} type="tel" />
              <Field placeholder="Location" value={form.location} onChange={(v) => setForm({ ...form, location: v })} />
              <textarea
                placeholder="Project Requirement"
                value={form.project_requirement}
                onChange={(e) => setForm({ ...form, project_requirement: e.target.value })}
                rows={3}
                maxLength={500}
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
              />
              <div className="flex gap-3 pt-1">
                <button type="button" onClick={close} className="flex-1 rounded-full border border-border px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-accent">
                  Close
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-gold px-4 py-2.5 text-sm font-semibold text-gold-foreground transition hover:scale-[1.02] disabled:opacity-70"
                >
                  {loading && <Loader2 className="size-4 animate-spin" />}
                  Submit Enquiry
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
    />
  );
}
