import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { characters } from "@/lib/characters";
import { MessageSquare, Kanban } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
}

const Workspace = () => {
  const { characterId } = useParams();
  const character = characters.find((c) => c.id === characterId);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });

  if (!character) {
    return <div>Character not found</div>;
  }

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: newMessage,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setNewMessage("");

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Hello! I'm ${character.name}. Thanks for your message: "${newMessage}"`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    }, 1000);
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      status: 'todo',
    };

    setTasks([...tasks, task]);
    setNewTask({ title: "", description: "" });
  };

  const updateTaskStatus = (taskId: string, newStatus: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <img
            src={character.image}
            alt={character.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{character.name}</h1>
            <p className="text-gray-500">{character.role}</p>
          </div>
        </div>

        <Tabs defaultValue="chat" className="space-y-4">
          <TabsList>
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="kanban" className="flex items-center gap-2">
              <Kanban className="w-4 h-4" />
              Kanban Board
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-4">
            <Card className="p-6">
              <div className="h-[500px] overflow-y-auto mb-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.role === 'assistant' ? 'flex-row' : 'flex-row-reverse'
                    }`}
                  >
                    <Avatar>
                      <AvatarImage
                        src={message.role === 'assistant' ? character.image : undefined}
                      />
                      <AvatarFallback>
                        {message.role === 'assistant' ? character.name[0] : 'You'}
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`rounded-lg p-3 max-w-[80%] ${
                        message.role === 'assistant'
                          ? 'bg-card text-card-foreground'
                          : 'bg-primary text-primary-foreground'
                      }`}
                    >
                      {message.content}
                    </div>
                  </div>
                ))}
              </div>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit">Send</Button>
              </form>
            </Card>
          </TabsContent>

          <TabsContent value="kanban" className="space-y-4">
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

              <div className="grid grid-cols-3 gap-4">
                {(['todo', 'in-progress', 'done'] as const).map((status) => (
                  <div key={status} className="space-y-4">
                    <h3 className="font-semibold capitalize">{status.replace('-', ' ')}</h3>
                    <div className="space-y-2">
                      {tasks
                        .filter((task) => task.status === status)
                        .map((task) => (
                          <Card key={task.id} className="p-4">
                            <h4 className="font-medium">{task.title}</h4>
                            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
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
                          </Card>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Workspace;