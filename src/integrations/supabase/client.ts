import { createClient } from '@supabase/supabase-js';
import type { Database } from './types/database';

const SUPABASE_URL = "https://udzyrzbbgbmjksdowxnq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVkenlyemJiZ2JtamtzZG93eG5xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3NTUzNzUsImV4cCI6MjA0OTMzMTM3NX0.z1E3fR5L8dsV0kD777Sbwcn54z3Ni0beDzXXxB5j9_w";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);