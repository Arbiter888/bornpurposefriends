import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { useUser } from "@supabase/auth-helpers-react";
import { TaskColumn } from "./TaskColumn";
import { useKanbanTasks } from "@/hooks/useKanbanTasks";
import { NewTask, TaskStatus } from "@/types/kanban";

export const KanbanBoard = () => {
  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    description: ''
  });
  const user = useUser();
  const { tasks, addTask, updateTaskStatus, deleteTask } = useKanbanTasks(user);

  useEffect(() => {
    const handleAddToKanban = async (event: CustomEvent<NewTask>) => {
      await addTask(event.detail);
    };

    const handleSaveMessage = async (event: CustomEvent<NewTask>) => {
      await addTask(event.detail, 'saved');
    };

    window.addEventListener('addToKanban', handleAddToKanban as EventListener);
    window.addEventListener('saveMessage', handleSaveMessage as EventListener);
    
    return () => {
      window.removeEventListener('addToKanban', handleAddToKanban as EventListener);
      window.removeEventListener('saveMessage', handleSaveMessage as EventListener);
    };
  }, [addTask]);

  const handleAddTask = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTask.title.trim()) return;

    await addTask(newTask);
    setNewTask({ title: '', description: '' });
  };

  const statuses: TaskStatus[] = ['todo', 'in-progress', 'done', 'saved'];

  return (
    <Card className="p-6">
      <form onSubmit={handleAddTask} className="mb-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Scripture Reference</Label>
          <Input
            id="title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Enter scripture reference (e.g. Proverbs 5:11)"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Notes</Label>
          <Textarea
            id="description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Enter any notes or reflections about this scripture"
          />
        </div>
        <Button type="submit">Add Scripture</Button>
      </form>

      <div className="grid grid-cols-4 gap-4">
        {statuses.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks}
            onUpdateStatus={updateTaskStatus}
            onDeleteTask={deleteTask}
          />
        ))}
      </div>
    </Card>
  );
};