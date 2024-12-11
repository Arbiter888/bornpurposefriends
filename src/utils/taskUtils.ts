import { Task, TaskFromDB, TaskStatus } from "@/types/kanban";

export const isValidTaskStatus = (status: string): status is TaskStatus => {
  return ['todo', 'in-progress', 'done', 'saved'].includes(status);
};

export const transformDBTaskToTask = (dbTask: TaskFromDB): Task | null => {
  if (!isValidTaskStatus(dbTask.status)) {
    console.error(`Invalid task status: ${dbTask.status}`);
    return null;
  }

  return {
    id: dbTask.id,
    title: dbTask.title,
    description: dbTask.description || '',
    status: dbTask.status,
  };
};