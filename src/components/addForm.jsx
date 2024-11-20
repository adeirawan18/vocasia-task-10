import { useState } from "react";
import { useTaskStore } from "../store/taskStore";

export const AddForm = () => {
  const [taskTitle, setTaskTitle] = useState("");
  const createTaskHandler = useTaskStore((state) => state.createTask);

  const handleSubmit = (e) => {
    e.preventDefault();
    const sanitizedTitle = taskTitle.trim();

    if (!sanitizedTitle) {
      alert("Task title cannot be empty!");
      return;
    }

    createTaskHandler(sanitizedTitle);
    setTaskTitle(""); // Clear input field
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-4 mb-6"
    >
      <input
        type="text"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
        placeholder="Enter a task"
        className="flex-1 px-4 py-2 border rounded-lg bg-gray-100 text-black border-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Add
      </button>
    </form>
  );
};
