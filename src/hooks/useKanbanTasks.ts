import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Task, NewTask, TaskFromDB } from "@/types/kanban";
import { transformDBTaskToTask } from "@/utils/taskUtils";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@supabase/auth-helpers-react";

export const useKanbanTasks = (user: User | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error fetching tasks",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data) {
        const validTasks = data
          .map((task: TaskFromDB) => transformDBTaskToTask(task))
          .filter((task): task is Task => task !== null);
        setTasks(validTasks);
      }
    };

    fetchTasks();
  }, [user, toast]);

  const addTask = async (newTask: NewTask, status: Task['status'] = 'todo') => {
    if (!user) return;

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: user.id,
        title: newTask.title,
        description: newTask.description,
        status
      })
      .select()
      .single();

    if (error) {
      toast({
        title: "Error adding task",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    if (data) {
      const newTask = transformDBTaskToTask(data as TaskFromDB);
      if (newTask) {
        setTasks(prev => [newTask, ...prev]);
      }
    }
  };

  const updateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
    if (!user) return;

    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId)
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return {
    tasks,
    addTask,
    updateTaskStatus
  };
};