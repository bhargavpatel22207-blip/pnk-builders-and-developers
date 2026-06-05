import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { Toaster, toast } from "sonner";
import {
  Loader2,
  LogOut,
  Inbox,
  Settings as SettingsIcon,
  Trash2,
  Upload,
  ShieldCheck,
  ExternalLink,
  Menu,
  X
} from "lucide-react";
import { supabase } from "@/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Dashboard | PNK Builders" }] }),
  component: AdminPage,
});

interface Enquiry {
  id: string; name: string; mobile: string; email: string | null; location: string | null;
  project_type: string | null; budget: string | null; message: string | null; source: string; status: string; created_at: string;
}

function AdminPage() {
  const navigate = useNavigate();
  const { session, isAdmin, loading, refreshAdmin } = useAuth();
const [tab, setTab] =
useState<"enquiries" | "settings" | "gallery" | "passkeys">("enquiries");
const [hasPasskey, setHasPasskey] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !session) navigate({ to: "/login" });
  }, [loading, session, navigate]);
  useEffect(() => {
  const checkPasskeys = async () => {
    if (!session) return;

    const { data, error } =
      await supabase.auth.passkey.list();

    if (!error) {
      setHasPasskey((data?.length ?? 0) > 0);
    }
  };

  checkPasskeys();
}, [session]);

  if (loading) {
    return <div className="grid min-h-screen place-items-center"><Loader2 className="size-7 animate-spin text-primary" /></div>;
  }
  if (!session) return null;

  const signOut = async () => { await supabase.auth.signOut(); navigate({ to: "/login" }); };
  const registerPasskey = async () => {
  try {
    const { error } = await supabase.auth.registerPasskey({
      name: "PNK Admin Passkey",
    });

    if (error) throw error;

    toast.success("Passkey registered successfully");
  } catch (err) {
    toast.error(
      err instanceof Error ? err.message : "Passkey registration failed"
    );
  }
};

  if (!isAdmin) {
  return (
    <div className="grid min-h-screen place-items-center bg-secondary px-4">
      <div className="w-full max-w-md rounded-2xl bg-card p-8 text-center shadow-elegant">
        <ShieldCheck className="mx-auto size-12 text-gold" />

        <h1 className="mt-4 font-display text-xl font-bold text-foreground">
          Access Denied
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Your account is not authorized to access the admin dashboard.
          Please contact the site administrator.
        </p>

        <button
          onClick={signOut}
          className="mt-6 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
  return (
    <div className="min-h-screen bg-secondary">
      <Toaster position="top-center" richColors />
      <header className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="grid size-9 place-items-center rounded-lg bg-gradient-hero font-display font-bold text-primary-foreground">P</span>
            <h1 className="font-display font-bold text-foreground">Admin Dashboard</h1>
          </div>
         <>
  {/* Desktop buttons */}
  <div className="hidden md:flex items-center gap-2">
    <Link
      to="/"
      className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-sm text-foreground hover:bg-accent"
    >
      <ExternalLink className="size-4" />
      View Site
    </Link>

    {!hasPasskey && (
      <button
        onClick={registerPasskey}
        className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm"
      >
        Register Passkey
      </button>
    )}

    <button
      onClick={signOut}
      className="inline-flex items-center gap-1.5 rounded-full bg-gradient-hero px-4 py-2 text-sm font-semibold text-primary-foreground"
    >
      <LogOut className="size-4" />
      Sign out
    </button>
  </div>

  {/* Mobile menu button */}
  <button
    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    className="rounded-lg border border-border p-2 md:hidden"
  >
   {mobileMenuOpen ? "✕" : "☰"}
  </button>
</>
        </div>
        <header className="border-b border-border bg-card">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
  </div>

  {mobileMenuOpen && (
    <div className="border-t border-border bg-card md:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4">
        <Link
          to="/"
          className="rounded-lg border border-border px-4 py-3 text-sm"
        >
          View Site
        </Link>

        {!hasPasskey && (
          <button
            onClick={registerPasskey}
            className="rounded-lg border border-border px-4 py-3 text-left text-sm"
          >
            Register Passkey
          </button>
        )}

        <button
          onClick={signOut}
          className="rounded-lg bg-gradient-hero px-4 py-3 text-sm font-semibold text-primary-foreground"
        >
          Sign Out
        </button>
      </div>
    </div>
  )}

</header>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        <div className="mb-6 flex gap-2 overflow-x-auto whitespace-nowrap pb-2">
          <TabBtn active={tab === "enquiries"} onClick={() => setTab("enquiries")} icon={<Inbox className="size-4" />} label="Enquiries" />
          <TabBtn active={tab === "settings"} onClick={() => setTab("settings")} icon={<SettingsIcon className="size-4" />} label="Site Settings" />
          <TabBtn
  active={tab === "passkeys"}
  onClick={() => setTab("passkeys")}
  icon={<ShieldCheck className="size-4" />}
  label="Passkeys"
/>
            <TabBtn
    active={tab === "gallery"}
    onClick={() => setTab("gallery")}
    icon={<Inbox className="size-4" />}
    label="Gallery"
  />        
        </div>
        <div className="mb-6 flex gap-2 overflow-x-auto whitespace-nowrap pb-2">
</div>
        {tab === "enquiries" && <EnquiriesPanel />}
{tab === "settings" && <SettingsPanel />}
{tab === "gallery" && <GalleryPanel />}
{tab === "passkeys" && (
  <PasskeysPanel
    hasPasskey={hasPasskey}
    setHasPasskey={setHasPasskey}
  />
)}
      </div>
    </div>
  );
}

function TabBtn({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: React.ReactNode; label: string }) {
  return (
    <button onClick={onClick} className={`shrink-0 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${active ? "bg-gradient-hero text-primary-foreground" : "bg-card text-foreground hover:bg-accent"}`}>
      {icon} {label}
    </button>
  );
}

function EnquiriesPanel() {
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    if (error) toast.error(error.message);
    setRows((data as Enquiry[]) ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const setStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  };
  const remove = async (id: string) => {
    const { error } = await supabase.from("enquiries").delete().eq("id", id);
    if (error) return toast.error(error.message);
    setRows((r) => r.filter((x) => x.id !== id));
    toast.success("Enquiry deleted");
  };

  if (loading) return <Loader2 className="size-6 animate-spin text-primary" />;
  if (!rows.length) return <p className="rounded-2xl bg-card p-8 text-center text-muted-foreground">No enquiries yet.</p>;

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">{rows.length} total enquiries</p>
      {rows.map((r) => (
        <div key={r.id} className="rounded-2xl border border-border bg-card p-5 shadow-card">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display font-bold text-foreground">{r.name}</h3>
                <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground">{r.source}</span>
              </div>
              <a href={`tel:${r.mobile}`} className="text-sm font-medium text-gold">{r.mobile}</a>
              {r.email && <span className="ml-2 text-sm text-muted-foreground">{r.email}</span>}
            </div>
           <div className="flex flex-wrap items-center gap-2">
              <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value)} className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm">
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
              <button onClick={() => remove(r.id)} aria-label="Delete" className="grid size-9 place-items-center rounded-lg border border-border text-destructive hover:bg-destructive/10">
                <Trash2 className="size-4" />
              </button>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted-foreground">
            {r.location && <span>📍 {r.location}</span>}
            {r.project_type && <span>🏗 {r.project_type}</span>}
            {r.budget && <span>💰 {r.budget}</span>}
            <span>🕑 {new Date(r.created_at).toLocaleDateString()}</span>
          </div>
          {r.message && <p className="mt-2 rounded-lg bg-secondary p-3 text-sm text-foreground">{r.message}</p>}
        </div>
      ))}
    </div>
  );
}

function SettingsPanel() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [id, setId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

 useEffect(() => {
  supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle()
    .then(({ data, error }) => {
      //console.log("SITE SETTINGS DATA:", data);
      //console.log("SITE SETTINGS ERROR:", error);

      if (data) {
        setId(String(data.id));
        setForm(data as Record<string, string>);
      }

      setLoading(false);
    });
}, []);

  const save = async () => {
    setSaving(true);
    const { error } = await supabase.from("site_settings").update({
      phone: form.phone, whatsapp: form.whatsapp, email: form.email, address: form.address,
      map_embed_url: form.map_embed_url, facebook: form.facebook, instagram: form.instagram, youtube: form.youtube,
      updated_at: new Date().toISOString(),
    }).eq("id", id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Settings saved");
  };

  if (loading) return <Loader2 className="size-6 animate-spin text-primary" />;

  const fields: { key: string; label: string; ph?: string }[] = [
    { key: "phone", label: "Phone Number", ph: "+91XXXXXXXXXX" },
    { key: "whatsapp", label: "WhatsApp Number", ph: "+91XXXXXXXXXX" },
    { key: "email", label: "Email" },
    { key: "address", label: "Office Address" },
    { key: "map_embed_url", label: "Google Maps Embed URL" },
    { key: "facebook", label: "Facebook URL" },
    { key: "instagram", label: "Instagram URL" },
    { key: "youtube", label: "YouTube URL" },
  ];

  return (
    <div className="max-w-2xl rounded-2xl border border-border bg-card p-6 shadow-card">
      <h2 className="font-display text-lg font-bold text-foreground">Contact & Site Settings</h2>
      <div className="mt-5 grid gap-4">
        {fields.map((f) => (
          <label key={f.key} className="block">
            <span className="text-sm font-medium text-foreground">{f.label}</span>
            <input
              value={form[f.key] ?? ""}
              placeholder={f.ph}
              onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              className="mt-1 w-full rounded-lg border border-input bg-background px-4 py-2.5 text-sm outline-none focus:border-gold focus:ring-2 focus:ring-gold/30"
            />
          </label>
        ))}
        <button onClick={save} disabled={saving} className="mt-2 w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-gradient-gold px-6 py-3 text-sm font-semibold text-gold-foreground transition hover:scale-[1.02] disabled:opacity-70">
          {saving && <Loader2 className="size-4 animate-spin" />} Save Settings
        </button>
      </div>
    </div>
  );
}
function GalleryPanel() {
  const [images, setImages] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const loadImages = async () => {
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error(error.message);
      return;
    }

    setImages(data || []);
  };

  useEffect(() => {
    loadImages();
  }, []);

  const uploadImage = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setUploading(true);

    const fileName = `${Date.now()}-${file.name}`;

    const { error: uploadError } = await supabase.storage
      .from("gallery")
      .upload(fileName, file);

    if (uploadError) {
      toast.error(uploadError.message);
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage
      .from("gallery")
      .getPublicUrl(fileName);

    const { error: dbError } = await supabase
      .from("gallery_images")
      .insert({
        image_url: publicUrl,
        storage_path: fileName,
        title: file.name,
      });

    if (dbError) {
      toast.error(dbError.message);
      setUploading(false);
      return;
    }

    toast.success("Image uploaded");

    await loadImages();

    setUploading(false);
  };

  const deleteImage = async (
    id: number,
    storagePath: string
  ) => {
    const { error: storageError } = await supabase.storage
      .from("gallery")
      .remove([storagePath]);

    if (storageError) {
      toast.error(storageError.message);
      return;
    }

    const { error: dbError } = await supabase
      .from("gallery_images")
      .delete()
      .eq("id", id);

    if (dbError) {
      toast.error(dbError.message);
      return;
    }

    toast.success("Image deleted");

    await loadImages();
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-display text-lg font-bold text-foreground">
          Gallery Management
        </h2>

        <label className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold text-gold-foreground">
          <Upload className="size-4" />
          {uploading ? "Uploading..." : "Upload Image"}

          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={uploadImage}
          />
        </label>
      </div>

      {images.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No gallery images uploaded yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.id}
              className="overflow-hidden rounded-xl border border-border"
            >
              <img
                src={img.image_url}
                alt={img.title || "Gallery"}
                className="h-40 w-full object-cover"
              />

              <div className="p-3">
                <button
                  onClick={() =>
                    deleteImage(
                      img.id,
                      img.storage_path
                    )
                  }
                  className="flex w-full items-center justify-center gap-2 rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white"
                >
                  <Trash2 className="size-4" />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
function PasskeysPanel({
  hasPasskey,
  setHasPasskey,
}: {
  hasPasskey: boolean;
  setHasPasskey: (value: boolean) => void;
}) {
  const [passkeys, setPasskeys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPasskeys = async () => {
  setLoading(true);

  const { data, error } =
    await supabase.auth.passkey.list();

  if (error) {
    toast.error(error.message);
    setLoading(false);
    return;
  }

  setPasskeys(data || []);

  setHasPasskey(
    (data?.length ?? 0) > 0
  );

  setLoading(false);
};

  useEffect(() => {
    loadPasskeys();
  }, []);

  const registerPasskey = async () => {
    try {
      const { error } =
        await supabase.auth.registerPasskey();

      if (error) throw error;

      toast.success("Passkey registered");

      await loadPasskeys();
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to register passkey"
      );
    }
  };

 const deletePasskey = async (id: string) => {
  const { error } =
    await supabase.auth.passkey.delete({
      passkeyId: id,
    });

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Passkey deleted");

    await loadPasskeys();
  };

  if (loading) {
    return (
      <Loader2 className="size-6 animate-spin text-primary" />
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-card">
      <div className="flex items-center justify-between">
  <h2 className="font-display text-lg font-bold">
    Passkey Management
  </h2>

  {!hasPasskey && (
    <button
      onClick={registerPasskey}
      className="rounded-full bg-gradient-gold px-5 py-2.5 text-sm font-semibold"
    >
      Register Passkey
    </button>
  )}
</div>
      <div className="mt-6 space-y-3">
        {passkeys.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No passkeys registered.
          </p>
        ) : (
          passkeys.map((passkey) => (
            <div
              key={passkey.id}
             className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-xl border border-border p-4"
            >
              <div>
                <p className="font-medium">
                  {passkey.name || "Passkey"}
                </p>
              </div>

              <button
              onClick={() => {
  console.log("DELETE PASSKEY", passkey);
  deletePasskey(passkey.id);
}}
                className="rounded-lg bg-red-500 px-3 py-2 text-sm text-white"
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}