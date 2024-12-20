import { Json } from './base';
import { MessagesTable } from './messages';
import { TasksTable } from './tasks';

export interface Database {
  public: {
    Tables: {
      messages: MessagesTable;
      tasks: TasksTable;
      documents: {
        Row: {
          content: string | null;
          content_type: string;
          created_at: string;
          file_path: string;
          id: string;
          title: string;
          user_id: string;
        };
        Insert: {
          content?: string | null;
          content_type: string;
          created_at?: string;
          file_path: string;
          id?: string;
          title: string;
          user_id: string;
        };
        Update: {
          content?: string | null;
          content_type?: string;
          created_at?: string;
          file_path?: string;
          id?: string;
          title?: string;
          user_id?: string;
        };
      };
      prayer_requests: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          is_anonymous: boolean | null;
          title: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          is_anonymous?: boolean | null;
          title: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          is_anonymous?: boolean | null;
          title?: string;
          user_id?: string;
        };
      };
      prayer_responses: {
        Row: {
          content: string;
          created_at: string;
          id: string;
          prayer_request_id: string;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          id?: string;
          prayer_request_id: string;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          id?: string;
          prayer_request_id?: string;
          user_id?: string;
        };
      };
      profiles: {
        Row: {
          created_at: string;
          email: string | null;
          id: string;
          is_subscribed: boolean | null;
          updated_at: string;
        };
        Insert: {
          created_at?: string;
          email?: string | null;
          id: string;
          is_subscribed?: boolean | null;
          updated_at?: string;
        };
        Update: {
          created_at?: string;
          email?: string | null;
          id?: string;
          is_subscribed?: boolean | null;
          updated_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}