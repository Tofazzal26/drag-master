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

  return (
    <div>
      <div className="bg-gray-100 p-4 rounded-lg my-4">
        <h2 className="text-xl">{title}</h2>
        <h2 className="text-base mt-2 text-gray-600">{description}</h2>
      </div>
    </div>
  );
};

export default TaskCard;
