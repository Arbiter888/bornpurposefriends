export type TaskStatus = 'todo' | 'in-progress' | 'done' | 'saved';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface NewTask {
  title: string;
  description: string;
}

export interface TaskFromDB {
  id: string;
  title: string;
  description: string | null;
  status: string;
  user_id: string;
  created_at: string;
}