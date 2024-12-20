export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
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
        Relationships: [
          {
            foreignKeyName: "documents_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: "prayer_requests_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: "prayer_responses_prayer_request_id_fkey";
            columns: ["prayer_request_id"];
            isOneToOne: false;
            referencedRelation: "prayer_requests";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "prayer_responses_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
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
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            isOneToOne: true;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
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
};