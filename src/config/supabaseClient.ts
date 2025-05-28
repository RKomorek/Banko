// npm install @supabase/supabase-js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.API_URL as string
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
