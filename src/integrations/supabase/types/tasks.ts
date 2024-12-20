import { BaseTable } from './base';

export interface TaskRow extends BaseTable {
  title: string;
  description: string | null;
  status: string;
}

export interface TasksTable {
  Row: TaskRow;
  Insert: Omit<TaskRow, 'created_at'>;
  Update: Partial<TaskRow>;
}