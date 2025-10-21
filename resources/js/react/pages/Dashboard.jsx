import { useNavigate } from "react-router-dom";
import TaskCard from "../components/TaskCard";

export default function Dashboard({ tasks, deleteTask }) {
  const navigate = useNavigate();

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">All Tasks</h2>
        <button
          onClick={() => navigate("/add")}
          className="bg-blue-600 text-white px-3 py-2 rounded"
        >
          + Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks yet. Add one!</p>
      ) : (
        tasks.map((task) => (
          <TaskCard key={task.id} task={task} deleteTask={deleteTask} />
        ))
      )}
    </div>
  );
}
