import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Toaster, toast } from "sonner";
import { Loader2, Building2, ArrowLeft } from "lucide-react";
import { supabase } from "@/supabase/client";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Admin Login | PNK Builders & Developers" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const handlePasskeyLogin = async () => {
  try {
    setLoading(true);

    const { error } = await supabase.auth.signInWithPasskey();

    if (error) throw error;

    navigate({ to: "/admin" });
  } catch (err) {
    toast.error(
      err instanceof Error ? err.message : "Passkey login failed"
    );
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const handle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin + "/admin" },
        });
        if (error) throw error;
        toast.success("Account created! Signing you in...");
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
      navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

  return (
    <div className="grid min-h-screen place-items-center bg-gradient-hero px-4">
      <Toaster position="top-center" richColors />
      <div className="w-full max-w-md">
        <Link to="/" className="mb-4 inline-flex items-center gap-2 text-sm text-primary-foreground/80 hover:text-gold">
          <ArrowLeft className="size-4" /> Back to website
        </Link>
        <div className="rounded-2xl bg-card p-8 shadow-elegant">
          <div className="text-center">
            <span className="mx-auto mb-3 grid size-12 place-items-center rounded-full bg-gradient-gold">
              <Building2 className="size-6 text-gold-foreground" />
            </span>
            <h1 className="font-display text-2xl font-bold text-foreground">Admin {mode === "signin" ? "Login" : "Sign Up"}</h1>
            <p className="mt-1 text-sm text-muted-foreground">Manage enquiries and site settings</p>
          </div>

          <form onSubmit={handle} className="mt-6 space-y-3">
            <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
            <input type="password" required minLength={6} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} />
            <button type="submit" disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition hover:scale-[1.02] disabled:opacity-70">
              {loading && <Loader2 className="size-4 animate-spin" />}
              {mode === "signin" ? "Sign In" : "Create Account"}
            </button>
            <button
  type="button"
  onClick={handlePasskeyLogin}
  disabled={loading}
  className="flex w-full items-center justify-center gap-2 rounded-full border border-input px-6 py-3 text-sm font-semibold transition hover:scale-[1.02] disabled:opacity-70"
>
  Sign in with Passkey
</button>
          </form>

          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-gold"
          >
            {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
}
