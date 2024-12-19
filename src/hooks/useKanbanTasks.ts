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
        console.error('Error fetching tasks:', error);
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

    // Set up real-time subscription
    const tasksSubscription = supabase
      .channel('tasks_channel')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'tasks',
          filter: `user_id=eq.${user.id}`,
        },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      tasksSubscription.unsubscribe();
    };
  }, [user, toast]);

  const addTask = async (newTask: NewTask) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to add tasks",
        variant: "destructive",
      });
      return;
    }

    const { data, error } = await supabase
      .from('tasks')
      .insert({
        user_id: user.id,
        title: newTask.title,
        description: newTask.description,
        status: 'todo'
      })
      .select()
      .single();

    if (error) {
      console.error('Error adding task:', error);
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
      console.error('Error updating task:', error);
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId)
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting task:', error);
      toast({
        title: "Error deleting task",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return {
    tasks,
    addTask,
    updateTaskStatus,
    deleteTask
  };
};