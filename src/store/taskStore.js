import { create } from "zustand";
import { createTask, getAllTask, toggleTaskStatus as toggleTaskStatusAPI, deleteTask as deleteTaskAPI } from "../network/network"; 

const initialState = {
  tasks: [],
  error: null,
  isLoading: false,
};

export const useTaskStore = create((set, get) => ({
  tasks: [],
  error: null,
  isLoading: false,

  getTasks: async () => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await getAllTask();
      set({ tasks: data });
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  toggleTaskStatus: async (taskId) => {
    try {
      const updatedTask = await axios.put(`/api/tasks/${taskId}/toggle`);
      set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, isDone: updatedTask.data.isDone } : task
        ),
      }));
    } catch (error) {
      console.error('Failed to toggle task status:', error.message);
    }
  },

  deleteTask: async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      }));
    } catch (error) {
      console.error('Failed to delete task:', error.message);
    }
  },
}));
