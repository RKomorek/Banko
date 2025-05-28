// Exemplo de uso
import { IRegisterUser } from "@/interfaces/users.interfaces";
import { supabase } from "../config/supabaseClient";

export async function GetUsers() {
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Erro ao buscar usuários:", error);
    return { error };
  }
  return { data };
}

// Exemplo de uso para adicionar um novo usuário
// export async function AddUser(user: IRegisterUser) {
//   const { data, error } = await supabase
//     .from('users')
//     .insert(user)

//   if (error) {
//     console.error('Erro ao adicionar usuário:', error)
//     return { error }
//   }

//   console.log('Usuário adicionado:', data)
//   return { data }
// }
// Exemplo de uso para adicionar um novo usuário pelo chat gpt
// const { error } = await supabase
//   .from('users')
//   .insert([{ name: 'João', email: 'joao@email.com' }])

export async function registerUser(user: IRegisterUser) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: user.email,
    password: user.password,
  });

  if (authError) return { error: authError };

  const authUserId = authData.user?.id;

  if (!authUserId) return { error: { message: "Erro ao obter ID do usuário" } };

  const { data, error: userError } = await supabase.from("users").insert({
    email: user.email,
    nome: user.name,
    auth_user_id: authUserId,
  });

  return { data, error: userError };
}
