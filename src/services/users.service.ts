// Exemplo de uso
import { IUser } from '@/interfaces/users.interfaces'
import { supabase } from '../config/supabaseClient'

export async function fetchUsers() {
  const { data, error } = await supabase
    .from('users')
    .select('*')

  if (error) {
    console.error('Erro ao buscar usuários:', error)
    return { error }
  }

  console.log('Usuários:', data)
  return { data }
}


// Exemplo de uso para adicionar um novo usuário
export async function addUser(user: IUser) {
  const { data, error } = await supabase
    .from('users')
    .insert(user)

  if (error) {
    console.error('Erro ao adicionar usuário:', error)
    return { error }
  }

  console.log('Usuário adicionado:', data)
  return { data }
}
// Exemplo de uso para adicionar um novo usuário pelo chat gpt
// const { error } = await supabase
//   .from('users')
//   .insert([{ name: 'João', email: 'joao@email.com' }])
