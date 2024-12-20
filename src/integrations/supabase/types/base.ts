export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface BaseTable {
  created_at: string;
  id: string;
  user_id: string;
}