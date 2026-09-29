import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { readEnv } from "@/lib/env";

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = readEnv("SUPABASE_URL");
  const key = readEnv("SUPABASE_SERVICE_ROLE_KEY");

  if (!url || !key) {
    return null;
  }

  if (!client) {
    client = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return client;
}
