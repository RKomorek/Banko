// Exemplo de uso
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
