import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Folder } from "lucide-react";
import { useUser } from "@supabase/auth-helpers-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../ui/use-toast";

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done' | 'saved';
}

interface NewTask {
  title: string;
  description: string;
}

export const KanbanBoard = () => {
  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    description: ''
  });
  const user = useUser();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch tasks
  const { data: tasks = [] } = useQuery({
    queryKey: ['tasks', user?.id],
    queryFn: async () => {
      if (!user?.id) return [];

      const { data } = await supabase
        .from('kanban_items')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      return data?.map(item => ({
        id: item.id,
        title: item.title,
        description: item.description,
        status: item.status,
      })) || [];
    },
    enabled: !!user?.id,
  });

  // Add task mutation
  const addTaskMutation = useMutation({
    mutationFn: async (task: NewTask) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('kanban_items')
        .insert({
          user_id: user.id,
          title: task.title,
          description: task.description,
          status: 'todo',
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      setNewTask({ title: '', description: '' });
      toast({
        title: "Task added",
        description: "Your task has been added successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error adding task",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Update task status mutation
  const updateTaskMutation = useMutation({
    mutationFn: async ({ taskId, newStatus }: { taskId: string; newStatus: Task['status'] }) => {
      if (!user?.id) throw new Error('Not authenticated');

      const { data, error } = await supabase
        .from('kanban_items')
        .update({ status: newStatus })
        .eq('id', taskId)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      toast({
        title: "Error updating task",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  useEffect(() => {
    const handleAddToKanban = (event: CustomEvent<NewTask>) => {
      addTaskMutation.mutate(event.detail);
    };

    const handleSaveMessage = (event: CustomEvent<NewTask>) => {
      if (!user?.id) return;
      
      supabase
        .from('saved_messages')
        .insert({
          user_id: user.id,
          title: event.detail.title,
          description: event.detail.description,
        })
        .then(() => {
          toast({
            title: "Message saved",
            description: "Your message has been saved successfully",
          });
        })
        .catch((error) => {
          toast({
            title: "Error saving message",
            description: error.message,
            variant: "destructive",
          });
        });
    };

    window.addEventListener('addToKanban', handleAddToKanban as EventListener);
    window.addEventListener('saveMessage', handleSaveMessage as EventListener);
    
    return () => {
      window.removeEventListener('addToKanban', handleAddToKanban as EventListener);
      window.removeEventListener('saveMessage', handleSaveMessage as EventListener);
    };
  }, [user?.id, addTaskMutation, toast]);

  const handleAddTask = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTask.title.trim()) return;
    addTaskMutation.mutate(newTask);
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    updateTaskMutation.mutate({ taskId, newStatus });
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleAddTask} className="mb-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="title">Task Title</Label>
          <Input
            id="title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            placeholder="Enter task title"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            placeholder="Enter task description"
          />
        </div>
        <Button type="submit">Add Task</Button>
      </form>

      <div className="grid grid-cols-4 gap-4">
        {(['todo', 'in-progress', 'done', 'saved'] as const).map((status) => (
          <div key={status} className="space-y-4">
            <h3 className="font-semibold capitalize flex items-center gap-2">
              {status === 'saved' && <Folder className="w-4 h-4" />}
              {status.replace('-', ' ')}
            </h3>
            <div className="space-y-2">
              {tasks
                .filter((task) => task.status === status)
                .map((task) => (
                  <Card key={task.id} className="p-4">
                    <h4 className="font-medium">{task.title}</h4>
                    <p className="text-sm text-gray-500 mt-1">{task.description}</p>
                    {status !== 'saved' && (
                      <div className="flex gap-2 mt-4">
                        {status !== 'todo' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateTaskStatus(task.id, 'todo')}
                          >
                            Move to Todo
                          </Button>
                        )}
                        {status !== 'in-progress' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateTaskStatus(task.id, 'in-progress')}
                          >
                            Move to In Progress
                          </Button>
                        )}
                        {status !== 'done' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateTaskStatus(task.id, 'done')}
                          >
                            Move to Done
                          </Button>
                        )}
                      </div>
                    )}
                  </Card>
                ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
