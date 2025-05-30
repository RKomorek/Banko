import { supabase } from "@/config/supabaseClient";

export async function getAccountByUserId(userId: string) {
  const { data, error } = await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", userId)
    .single(); // assume que cada usuário tem só uma conta

  if (error) {
    return { error };
  }

  return { data };
}
