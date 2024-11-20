import { useEffect } from "react";
import { FiPower, FiEdit2, FiTrash2, FiCheck } from "react-icons/fi";
import { useAuthStore } from "../store/authStore";
import { useTaskStore } from "../store/taskStore";
import { useProfileStore } from "../store/profileStore";
import { AddForm } from "../components/addForm";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const logout = useAuthStore((state) => state.logout);
  const profile = useProfileStore((state) => state.profile);
  const { tasks, getTasks, toggleTaskStatus, deleteTask } = useTaskStore();
  const navigate = useNavigate();

  useEffect(() => {
    getTasks(); 
  }, [getTasks]);

  const incompleteTasks = tasks.filter((task) => !task.isDone);
  const completeTasks = tasks.filter((task) => task.isDone);

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  const handleToggleTask = async (taskId) => {
    try {
      await toggleTaskStatus(taskId);
      console.log(`Task with ID ${taskId} marked as done.`);
    } catch (error) {
      console.error("Failed to toggle task status:", error.message);
    }
  };
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      console.log(`Task with ID ${taskId} deleted successfully.`);
    } catch (error) {
      console.error("Failed to delete task:", error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col justify-center items-center p-8">
      <div className="w-full max-w-4xl p-8 bg-white rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold text-primary">Hi, {profile?.name ?? "Voca User"}</h1>
            <button
              className="text-primary hover:text-blue-500 transition-colors"
              onClick={handleEditProfile}
            >
              <FiEdit2 size={20} />
            </button>
          </div>

          <FiPower
            size={20}
            className="cursor-pointer hover:text-primary transition-colors"
            onClick={logout}
          />
        </div>

        <div className="mb-6">
          <AddForm />
        </div>

        <div className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">Incomplete Tasks</h2>
            {incompleteTasks.length > 0 ? (
              incompleteTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-center bg-gray-200 p-4 rounded-lg border border-purple-500"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.isDone}
                      onChange={() => handleToggleTask(task.id)}
                      className="text-purple-500"
                    />
                    <p className={`flex-1 ${task.isDone ? "line-through text-gray-500" : "text-black"}`}>
                      {task.title}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className="text-green-500 hover:text-green-700 transition-colors"
                    >
                      <FiCheck size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No incomplete tasks yet.</p>
            )}
          </div>


          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary">Completed Tasks</h2>
            {completeTasks.length > 0 ? (
              completeTasks.map((task) => (
                <div
                  key={task.id}
                  className="flex justify-between items-center bg-gray-200 p-4 rounded-lg border border-purple-500"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={task.isDone}
                      onChange={() => handleToggleTask(task.id)}
                      className="text-purple-500"
                    />
                    <p className={`flex-1 ${task.isDone ? "line-through text-gray-500" : "text-black"}`}>
                      {task.title}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className="text-green-500 hover:text-green-700 transition-colors"
                    >
                      <FiCheck size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No completed tasks yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
