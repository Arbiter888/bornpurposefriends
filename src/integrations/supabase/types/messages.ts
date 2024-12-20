import { BaseTable } from './base';

export interface MessageRow extends BaseTable {
  content: string;
  role: string;
  conversation_id: string;
  character_name: string | null;
  character_image: string | null;
}

export interface MessagesTable {
  Row: MessageRow;
  Insert: Omit<MessageRow, 'created_at'>;
  Update: Partial<MessageRow>;
}