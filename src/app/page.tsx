"use client";
import { MessageCircle, Settings, Menu, TvMinimal, Bell } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Column from "./Column";
import { DndContext, DragEndEvent } from "@dnd-kit/core";

export default function Home() {
  interface Column {
    id: string;
    title: string;
  }
  interface Task {
    id: string;
    title: string;
    description: string;
    status: string;
  }

  const COLUMNS: Column[] = [
    {
      id: "TODO",
      title: "To Do",
    },

    {
      id: "IN_PROGRESS",
      title: "In Progress",
    },
    {
      id: "DONE",
      title: "Done",
    },
  ];

  const INITIAL_TASKS: Task[] = [
    {
      id: "1",
      title: "Research Project",
      description: "Gather requirements and create initial documentation",
      status: "TODO",
    },
    {
      id: "2",
      title: "Research Project",
      description: "Gather requirements and create initial documentation",
      status: "TODO",
    },

    {
      id: "3",
      title: "Design System",
      description: "Create component library and design tokens",
      status: "IN_PROGRESS",
    },
    {
      id: "4",
      title: "API Integration",
      description: "Implement REST API endpoints",
      status: "DONE",
    },
  ];

  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active.id as string;
    const newStatus = over?.id as Task["status"];
    setTasks(() =>
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen bg-gray-100">
        {/* Header */}
        <header className="bg-white shadow-md p-4 flex justify-between items-center">
          <div className="text-xl font-bold text-gray-800">Dashboard</div>
          <div>
            <div className="flex items-center gap-4">
              <Bell size={20} />
              <Image src="/man.png" width={40} height={40} alt="profile" />
              <h4>Tofazzal Hossain</h4>
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar */}
          <aside className="lg:w-64 bg-white shadow-md p-4 flex flex-col justify-between">
            <ul>
              <li className="p-2 rounded bg-[#7498fb] text-white flex items-center gap-2 cursor-pointer">
                <TvMinimal size={24} /> Home
              </li>
              <li className="p-2 hover:bg-gray-200 rounded flex items-center gap-2 cursor-pointer">
                <MessageCircle size={20} /> Messages
              </li>
              <li className="p-2 hover:bg-gray-200 rounded flex items-center gap-2 cursor-pointer">
                <Settings size={20} /> Settings
              </li>
            </ul>
            <div className="text-sm text-gray-500">© 2025 Drag Master</div>
          </aside>

          {/* Main Content Area */}
          <main className="p-6 flex-1">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <DndContext onDragEnd={handleDragEnd}>
                {COLUMNS.map((column) => {
                  return (
                    <Column
                      key={column.id}
                      tasks={tasks.filter((task) => task.status === column.id)}
                      column={column}
                    />
                  );
                })}
              </DndContext>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
