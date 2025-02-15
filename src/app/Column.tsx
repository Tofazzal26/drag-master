"use client";
import { useDroppable } from "@dnd-kit/core";
import TaskCard from "./TaskCard";

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

type ColumnProps = {
  tasks: Task[];
  column: Column;
};

const Column = ({ tasks, column }: ColumnProps) => {
  const { setNodeRef } = useDroppable({ id: column.id });

  return (
    <div>
      <div className="shadow-lg rounded-lg p-6 bg-white">
        <h2 className="text-3xl">{column.title}</h2>
        <div ref={setNodeRef}>
          {tasks.map((task) => (
            <TaskCard key={task?.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Column;
