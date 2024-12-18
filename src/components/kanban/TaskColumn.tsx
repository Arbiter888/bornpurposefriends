import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Folder, ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { Task, TaskStatus } from "@/types/kanban";
import { useState } from "react";

interface TaskColumnProps {
  status: TaskStatus;
  label?: string; // Added label prop as optional
  tasks: Task[];
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskColumn = ({ status, label, tasks, onUpdateStatus, onDeleteTask }: TaskColumnProps) => {
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const getStatusLabel = (status: TaskStatus) => {
    if (label) return label;
    
    switch (status) {
      case 'todo':
        return 'Scripture to Read';
      case 'in-progress':
        return 'Currently Reading';
      case 'done':
        return 'Scripture Read';
      case 'saved':
        return 'Saved Verses';
      default:
        return status;
    }
  };

  const getDisplayContent = (content: string, isExpanded: boolean) => {
    const maxLength = 100;
    if (content.length <= maxLength) return content;
    return isExpanded ? content : content.slice(0, maxLength) + "...";
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold capitalize flex items-center gap-2">
        {status === 'saved' && <Folder className="w-4 h-4" />}
        {getStatusLabel(status)}
      </h3>
      <div className="space-y-2">
        {tasks
          .filter((task) => task.status === status)
          .map((task) => (
            <Card key={task.id} className="p-4">
              <div className="flex justify-between items-start">
                <h4 className="font-medium">{task.title}</h4>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="text-sm text-gray-500 mt-1">
                {getDisplayContent(task.description || '', expandedTasks[task.id])}
                {task.description && task.description.length > 100 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-1 flex items-center gap-2"
                    onClick={() => toggleTaskExpansion(task.id)}
                  >
                    {expandedTasks[task.id] ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        Read more
                      </>
                    )}
                  </Button>
                )}
              </div>
              {status !== 'saved' && (
                <div className="flex gap-2 mt-4">
                  {status !== 'todo' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateStatus(task.id, 'todo')}
                    >
                      Move to Scripture to Read
                    </Button>
                  )}
                  {status !== 'in-progress' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateStatus(task.id, 'in-progress')}
                    >
                      Move to Currently Reading
                    </Button>
                  )}
                  {status !== 'done' && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onUpdateStatus(task.id, 'done')}
                    >
                      Move to Scripture Read
                    </Button>
                  )}
                </div>
              )}
            </Card>
          ))}
      </div>
    </div>
  );
};