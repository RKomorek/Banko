// npm install @supabase/supabase-js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Verificação mais robusta das variáveis de ambiente
if (!supabaseUrl) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_URL não está definida')
  console.error('💡 Verifique se você criou o arquivo .env.local com:')
  console.error('   NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase')
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is required. Check .env.local file.')
}

if (!supabaseAnonKey) {
  console.error('❌ NEXT_PUBLIC_SUPABASE_ANON_KEY não está definida')
  console.error('💡 Verifique se você criou o arquivo .env.local com:')
  console.error('   NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima')
  throw new Error('NEXT_PUBLIC_SUPABASE_ANON_KEY is required. Check .env.local file.')
}

// Log para debug (apenas em desenvolvimento)
if (process.env.NODE_ENV === 'development') {
  console.log('✅ Supabase configurado com sucesso')
  console.log('🔗 URL:', supabaseUrl)
  console.log('🔑 Key:', supabaseAnonKey.substring(0, 20) + '...')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
