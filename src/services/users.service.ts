import { IRegisterUser } from "@/interfaces/users.interfaces";
import { supabase } from "../config/supabaseClient";

export async function getUserByAuthId(authUserId: string) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("auth_user_id", authUserId)
    .single(); // ← garante que retorna só uma conta (por usuário)

  return { data, error };
}


function gerarNumeroConta() {
  return Math.floor(1000000000 + Math.random() * 9000000000).toString();
}

export async function registerUser(user: IRegisterUser) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
    options: {
      data: {
        name: user.name,
      },
    },
  });

  if (authError) return { error: authError };

  const authUserId = authData.user?.id;

  if (!authUserId) return { error: { message: "Erro ao obter ID do usuário" } };

  const { data: insertedUsers, error: userError } = await supabase
    .from("users")
    .insert({
      email: user.email,
      nome: user.name,
      auth_user_id: authUserId,
    })
    .select("id") // importante: pegamos o ID retornado
    .single();

  if (userError || !insertedUsers) {
    return {
      error: userError || { message: "Erro ao criar usuário na tabela users" },
    };
  }

  const numeroConta = gerarNumeroConta();

  const { error: accountError } = await supabase.from("accounts").insert({
    user_id: insertedUsers.id,
    numero_conta: numeroConta,
    saldo: 10000,
  });

  if (accountError) {
    return { error: accountError };
  }

  return { data: { userId: insertedUsers.id, numeroConta } };
}
