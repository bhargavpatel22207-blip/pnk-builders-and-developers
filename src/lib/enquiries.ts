import { supabase } from "@/supabase/client";

export interface EnquiryInput {
  name: string;
  mobile: string;
  email?: string;
  location?: string;
  project_type?: string;
  budget?: string;
  message?: string;
  source?: string;
}

export async function submitEnquiry(input: EnquiryInput) {
  const { error } = await supabase.from("enquiries").insert({
    name: input.name.trim(),
    mobile: input.mobile.trim(),
    email: input.email?.trim() || null,
    location: input.location?.trim() || null,
    project_type: input.project_type || null,
    budget: input.budget || null,
    message: input.message?.trim() || null,
    source: input.source || "website",
  });
  if (error) throw error;
}
