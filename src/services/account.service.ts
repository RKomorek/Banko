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

export async function updateAccountBalance(accountId: string, delta: number) {
  const { data, error } = await supabase
    .rpc("update_account_balance", {
      account_id: accountId,
      delta: delta,
    });
  return { data, error };
}
