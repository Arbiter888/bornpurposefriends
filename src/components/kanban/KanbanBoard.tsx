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
import { BookOpen, CalendarDays } from "lucide-react";

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
  const statusLabels = {
    'todo': 'To Study',
    'in-progress': 'Currently Studying',
    'done': 'Studied',
    'saved': 'Saved Scriptures'
  };

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
      <form onSubmit={handleAddTask} className="mb-6 space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-bold text-gray-800">Scripture Study Planner</h2>
        </div>
        <div className="space-y-2">
          <Label htmlFor="title" className="text-gray-700">Scripture Reference</Label>
          <Input
            id="title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Enter scripture reference (e.g. Proverbs 5:11)"
            className="border-primary/20 focus:border-primary"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description" className="text-gray-700">Study Notes</Label>
          <Textarea
            id="description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Enter any notes or reflections about this scripture"
            className="border-primary/20 focus:border-primary"
          />
        </div>
        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
          <CalendarDays className="w-4 h-4 mr-2" />
          Add to Study Plan
        </Button>
      </form>

      <div className="grid grid-cols-4 gap-4">
        {statuses.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            label={statusLabels[status]}
            tasks={tasks}
            onUpdateStatus={updateTaskStatus}
            onDeleteTask={deleteTask}
          />
        ))}
      </div>
    </Card>
  );
};