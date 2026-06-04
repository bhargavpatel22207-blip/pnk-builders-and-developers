import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/supabase/client";

export interface SiteSettings {
  id: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  map_embed_url: string;
  facebook: string | null;
  instagram: string | null;
  youtube: string | null;
}

const FALLBACK: SiteSettings = {
  id: "",
  phone: "+91 9666444659",
  whatsapp: "+91 9666444659",
  email: "basava.naveen2298@gmaiil.com",
  address: "Dattagiri Colony, Zaheerabad, Telangana",
  map_embed_url: "https://www.google.com/maps?q=Zaheerabad,Telangana&output=embed",
  facebook: "",
  instagram: "",
  youtube: "",
};

export function useSiteSettings() {
  const query = useQuery({
    queryKey: ["site_settings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("site_settings").select("*").limit(1).maybeSingle();
      if (error) throw error;
      return (data as SiteSettings) ?? FALLBACK;
    },
  });
  return { settings: query.data ?? FALLBACK, isLoading: query.isLoading };
}

export function telHref(phone: string) {
  return `tel:${phone.replace(/[^+\d]/g, "")}`;
}

export function waHref(whatsapp: string, text = "Hi PNK Builders, I would like to enquire about construction services.") {
  const num = whatsapp.replace(/[^\d]/g, "");
  return `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
}
