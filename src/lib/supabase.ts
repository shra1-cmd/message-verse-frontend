
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://eqwkbafoxpkzockkypfu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVxd2tiYWZveHBrem9ja2t5cGZ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAwNjM0MjcsImV4cCI6MjA2NTYzOTQyN30.LcjF6TzNtr-fBuoLYEq7ty1_TXB0zZ_L2a8_0uNoKuQ'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Message {
  id: string;
  text: string;
  timestamp: string;
}
