"use client";
import { MessageCircle, Settings, TvMinimal, Bell } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import Column from "./Column";
import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { addTask, updateTask } from "@/redux/TaskSlice/TaskSlice";
import { Button, Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

export default function Home() {
  let [isOpen, setIsOpen] = useState<boolean>(true);

  function open() {
    setIsOpen(true);
  }

  function close() {
    setIsOpen(false);
  }

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

  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const dispatch = useDispatch();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const taskId = active?.id as string;
    const newStatus = over?.id as Task["status"];

    dispatch(updateTask({ id: taskId, newStatus }));
  };

  const handleTaskAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const title = (form.elements.namedItem("title") as HTMLInputElement).value;
    const description = (
      form.elements.namedItem("description") as HTMLInputElement
    ).value;
    const status: string = "TODO";
    console.log({ title, description, status });
    dispatch(addTask({ title, description, status }));
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
          <main className="p-3 lg:p-6 flex-1">
            <div className="flex lg:flex-row flex-col lg:mb-6 mb-3 justify-between lg:items-center">
              <h2 className="text-xl lg:text-2xl">Teaching Activities</h2>
              <div>
                <Button
                  onClick={open}
                  className="rounded-md bg-[#7498fb] py-2 px-4 text-sm lg:text-base font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
                >
                  Add Task
                </Button>

                <Dialog
                  open={isOpen}
                  as="div"
                  className="relative z-10 focus:outline-none"
                  onClose={close}
                >
                  <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                      <DialogPanel
                        transition
                        className="w-full lg:max-w-lg rounded-xl bg-white/5 p-6 text-black backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-lg"
                      >
                        <div>
                          <form onSubmit={handleTaskAdd}>
                            <div>
                              <label className="text-xl">Title</label> <br />
                              <input
                                type="text"
                                placeholder="Title Here"
                                className="outline-none px-4 py-3 w-full text-gray-500 my-2 lg:my-4"
                                name="title"
                                required
                              />
                            </div>
                            <div>
                              <label className="text-xl">Description</label>{" "}
                              <br />
                              <textarea
                                className="outline-none px-4 py-3 w-full text-gray-500 lg:mt-4 mt-2"
                                rows={4}
                                name="description"
                                placeholder="Description"
                                required
                              ></textarea>
                              <div className="text-right mt-1 lg:mt-2">
                                <button
                                  onClick={() => close()}
                                  className="rounded-md bg-[#7498fb] py-2 px-4 text-sm lg:text-base font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
                                >
                                  Add
                                </button>
                              </div>
                            </div>
                          </form>
                        </div>
                      </DialogPanel>
                    </div>
                  </div>
                </Dialog>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <DndContext
                collisionDetection={closestCorners}
                onDragEnd={handleDragEnd}
              >
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
