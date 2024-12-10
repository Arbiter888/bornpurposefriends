import { Character } from "@/lib/characters";
import { useState } from "react";
import { Button } from "../ui/button";

interface Task {
  id: string;
  title: string;
  status: "todo" | "inProgress" | "done";
}

interface KanbanBoardProps {
  character: Character;
}

const KanbanBoard = ({ character }: KanbanBoardProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Review market trends", status: "todo" },
    { id: "2", title: "Analyze competition", status: "inProgress" },
    { id: "3", title: "Plan strategy", status: "done" },
  ]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks((prev) => [
      ...prev,
      { id: Date.now().toString(), title: newTask, status: "todo" },
    ]);
    setNewTask("");
  };

  const moveTask = (taskId: string, newStatus: Task["status"]) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const columns: { title: string; status: Task["status"] }[] = [
    { title: "To Do", status: "todo" },
    { title: "In Progress", status: "inProgress" },
    { title: "Done", status: "done" },
  ];

  return (
    <div>
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add new task..."
          className="flex-1 bg-background border rounded-lg px-4 py-2"
        />
        <Button onClick={addTask}>Add Task</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {columns.map((column) => (
          <div
            key={column.status}
            className="bg-card/50 rounded-lg p-4"
          >
            <h3 className="font-semibold mb-4">{column.title}</h3>
            <div className="space-y-2">
              {tasks
                .filter((task) => task.status === column.status)
                .map((task) => (
                  <div
                    key={task.id}
                    className="bg-background p-3 rounded-lg shadow-sm"
                  >
                    <p className="mb-2">{task.title}</p>
                    <div className="flex gap-2">
                      {columns.map((col) => (
                        col.status !== task.status && (
                          <button
                            key={col.status}
                            onClick={() => moveTask(task.id, col.status)}
                            className="text-xs text-primary hover:text-primary/80"
                          >
                            Move to {col.title}
                          </button>
                        )
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;