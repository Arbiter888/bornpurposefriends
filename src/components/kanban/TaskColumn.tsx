import { useState } from "react";
import { Task, TaskStatus } from "@/types/kanban";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onUpdateStatus: (taskId: string, newStatus: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskColumn = ({ status, tasks, onUpdateStatus, onDeleteTask }: TaskColumnProps) => {
  const [expandedTasks, setExpandedTasks] = useState<Record<string, boolean>>({});

  const toggleTaskExpansion = (taskId: string) => {
    setExpandedTasks(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const getStatusLabel = (status: TaskStatus) => {
    switch (status) {
      case 'todo':
        return 'Scripture to Read';
      case 'in-progress':
        return 'Currently Reading';
      case 'done':
        return 'Completed Reading';
      case 'saved':
        return 'Saved Scriptures';
      default:
        return status;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-t-lg">
        {getStatusLabel(status)}
      </h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-3 bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col gap-2">
              <div 
                className="cursor-pointer"
                onClick={() => toggleTaskExpansion(task.id)}
              >
                <h4 className="font-medium text-gray-900">{task.title}</h4>
                {expandedTasks[task.id] && (
                  <p className="mt-1 text-sm text-gray-600">{task.description}</p>
                )}
              </div>
              <div className="flex items-center justify-between gap-2 mt-2 pt-2 border-t border-gray-100">
                <select
                  value={status}
                  onChange={(e) => onUpdateStatus(task.id, e.target.value as TaskStatus)}
                  className="text-sm border rounded p-1 flex-1"
                >
                  <option value="todo">To Read</option>
                  <option value="in-progress">Reading</option>
                  <option value="done">Completed</option>
                  <option value="saved">Save</option>
                </select>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDeleteTask(task.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};