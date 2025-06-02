import { supabase } from "@/config/supabaseClient";
import { ITransaction } from "@/interfaces/transaction.interface";

export async function addTransaction(transaction: ITransaction) {
  const { data, error } = await supabase
    .from("transactions")
    .insert([transaction])
    .single();

  return { data, error };
}

export async function getTransactionsByAccountId(accountId: string) {
  const { data, error } = await supabase
    .from("transactions")
    .select("*")
    .eq("account_id", accountId)
    .order("data", { ascending: false }); // Ordenar pela data mais recente primeiro

  return { data, error };
}

export async function deleteTransactionById(transactionId: string) {
  const { error } = await supabase
    .from("transactions")
    .delete()
    .eq("id", transactionId);

  return { error };
}