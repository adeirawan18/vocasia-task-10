import { useState } from "react";
import { useTaskStore } from "../store/taskStore";

export const AddForm = () => {
        const createTask = useTaskStore((state) => state.createTask);
        const [title, setTitle] = useState("");

        const addTask = (event) => {
        event.preventDefault();
        const trimmedTitle = title.trim();
        if (trimmedTitle === "") {
          alert("Please enter a task");
          return;
        }
        createTask(trimmedTitle);
        setTitle("");
      };

    return (
        <div className="flex items-center gap-2 mb-16">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add a new task"
          className="input input-bordered w-full border-purple-500 text-black bg-gray-200 text-base-content"

        />
        <button onClick={addTask} className="btn btn-primary">
          +
        </button>
      </div>
    );
  };

