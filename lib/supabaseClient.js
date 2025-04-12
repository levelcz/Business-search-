import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bljkmdfhykdwrnzrrshc.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Tvůj public anon klíč
export const supabase = createClient(supabaseUrl, supabaseKey);