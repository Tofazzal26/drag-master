"use client";

import { useDraggable } from "@dnd-kit/core";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

type TaskCardProps = {
  task: Task;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const { title, status, description, id } = task;

  const { setNodeRef, transform, listeners, attributes } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div>
      <div
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className="bg-gray-100 rounded-lg my-6 p-8 shadow-lg"
      >
        <h2 className="text-xl">{title}</h2>
        <h2 className="text-base mt-2 text-gray-600">{description}</h2>
      </div>
    </div>
  );
};

export default TaskCard;
