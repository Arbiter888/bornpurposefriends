import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Folder } from "lucide-react";

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
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<NewTask>({
    title: '',
    description: ''
  });

  useEffect(() => {
    const handleAddToKanban = (event: CustomEvent<NewTask>) => {
      const task: Task = {
        id: crypto.randomUUID(),
        title: event.detail.title,
        description: event.detail.description,
        status: 'todo'
      };
      setTasks(prev => [...prev, task]);
    };

    const handleSaveMessage = (event: CustomEvent<NewTask>) => {
      const task: Task = {
        id: crypto.randomUUID(),
        title: event.detail.title,
        description: event.detail.description,
        status: 'saved'
      };
      setTasks(prev => [...prev, task]);
    };

    window.addEventListener('addToKanban', handleAddToKanban as EventListener);
    window.addEventListener('saveMessage', handleSaveMessage as EventListener);
    
    return () => {
      window.removeEventListener('addToKanban', handleAddToKanban as EventListener);
      window.removeEventListener('saveMessage', handleSaveMessage as EventListener);
    };
  }, []);

  const handleAddTask = (event: React.FormEvent) => {
    event.preventDefault();
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: crypto.randomUUID(),
      title: newTask.title,
      description: newTask.description,
      status: 'todo'
    };

    setTasks(prev => [...prev, task]);
    setNewTask({ title: '', description: '' });
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
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