import { useState, useEffect } from "react";
import { Task, TaskStatus } from "@/types/kanban";
import { TaskColumn } from "./TaskColumn";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useToast } from "../ui/use-toast";
import { useUser } from "@supabase/auth-helpers-react";
import { useKanbanTasks } from "@/hooks/useKanbanTasks";

export const KanbanBoard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const { toast } = useToast();
  const user = useUser();
  const { fetchTasks, createTask, updateTask, deleteTask } = useKanbanTasks();

  useEffect(() => {
    if (user) {
      loadTasks();
    }
  }, [user]);

  const loadTasks = async () => {
    try {
      const tasks = await fetchTasks();
      setTasks(tasks);
    } catch (error: any) {
      toast({
        title: "Error loading tasks",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      const newTask = await createTask(newTaskTitle, newTaskDescription);
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskDescription("");
      toast({
        title: "Scripture study task created",
        description: "Your new study task has been added",
      });
    } catch (error: any) {
      toast({
        title: "Error creating task",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: TaskStatus) => {
    try {
      await updateTask(taskId, { status: newStatus });
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      ));
      toast({
        title: "Status updated",
        description: "Scripture study status has been updated",
      });
    } catch (error: any) {
      toast({
        title: "Error updating status",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter(task => task.id !== taskId));
      toast({
        title: "Task deleted",
        description: "Scripture study task has been removed",
      });
    } catch (error: any) {
      toast({
        title: "Error deleting task",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const statuses: TaskStatus[] = ['todo', 'in-progress', 'done', 'saved'];

  return (
    <Card className="p-6 bg-white/90 backdrop-blur-sm shadow-lg">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
            Bible Study Planner
          </h2>
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <Input
                placeholder="Enter scripture reference or study topic..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <Textarea
                placeholder="Add study notes or questions..."
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Add Study Task
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {statuses.map(status => (
            <TaskColumn
              key={status}
              status={status}
              tasks={tasks.filter(task => task.status === status)}
              onUpdateStatus={updateTaskStatus}
              onDeleteTask={handleDeleteTask}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};