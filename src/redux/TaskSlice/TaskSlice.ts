import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
}

interface AddTask {
  title: string;
  description: string;
  status: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [
    {
      id: "1",
      title: "Research Project",
      description: "Gather requirements and create initial documentation",
      status: "TODO",
    },
    {
      id: "2",
      title: "Design System",
      description: "Create component library and design tokens",
      status: "IN_PROGRESS",
    },
    {
      id: "3",
      title: "API Integration",
      description: "Implement REST API endpoints",
      status: "DONE",
    },
  ],
};

export const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<AddTask>) => {
      const id = (
        state.tasks.length
          ? Number(state.tasks[state.tasks.length - 1].id) + 1
          : 0
      ).toString();
      state.tasks.push({ id, ...action.payload });
    },
    updateTask: (
      state,
      action: PayloadAction<{
        id: string;
        newStatus: string;
      }>
    ) => {
      const { id, newStatus } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.status = newStatus;
      }
    },
  },
});

export const { addTask, updateTask } = TaskSlice.actions;
export default TaskSlice.reducer;
