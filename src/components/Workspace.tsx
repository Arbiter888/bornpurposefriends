import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { characters } from "@/lib/characters";
import { MessageSquare, Kanban } from "lucide-react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ChatWindow } from "./chat/ChatWindow";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useUser } from "@supabase/auth-helpers-react";
import { Message } from "@/types/chat";

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
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const user = useUser();

  useEffect(() => {
    if (!user?.id || !characterId) return;
    
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', characterId)
        .order('created_at', { ascending: true });

      if (error) {
        toast({
          title: "Error fetching messages",
          description: error.message,
          variant: "destructive",
        });
        return;
      }

      if (data) {
        setMessages(data.map(msg => ({
          id: msg.id,
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
          timestamp: new Date(msg.created_at),
        })));
      }
    };

    fetchMessages();
  }, [user?.id, characterId, toast]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user?.id || !character) return;

    setIsLoading(true);
    const messageId = crypto.randomUUID();
    const userMessage: Message = {
      id: messageId,
      role: 'user',
      content: newMessage,
      timestamp: new Date(),
    };

    try {
      // Save user message to Supabase
      const { error: insertError } = await supabase
        .from('messages')
        .insert({
          id: messageId,
          conversation_id: characterId,
          content: newMessage,
          role: 'user',
          user_id: user.id,
        });

      if (insertError) throw insertError;

      setMessages(prev => [...prev, userMessage]);
      setNewMessage("");

      // Get AI response
      const response = await fetch('/functions/v1/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          message: newMessage,
          character,
        }),
      });

      if (!response.ok) throw new Error('Failed to get AI response');

      const data = await response.json();
      const aiMessageId = crypto.randomUUID();
      const aiMessage: Message = {
        id: aiMessageId,
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };

      // Save AI message to Supabase
      const { error: aiInsertError } = await supabase
        .from('messages')
        .insert({
          id: aiMessageId,
          conversation_id: characterId,
          content: data.response,
          role: 'assistant',
          user_id: user.id,
        });

      if (aiInsertError) throw aiInsertError;

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!character) {
    return <div>Character not found</div>;
  }

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

          <TabsContent value="chat">
            <ChatWindow
              messages={messages}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              handleSendMessage={handleSendMessage}
              characterImage={character.image}
              characterName={character.name}
              isLoading={isLoading}
            />
          </TabsContent>

          <TabsContent value="kanban">
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
