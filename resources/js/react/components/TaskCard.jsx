import { useNavigate } from "react-router-dom";

export default function TaskCard({ task, deleteTask }) {
    const navigate = useNavigate();

    return (
        <div className="p-4 border rounded-lg shadow-sm mb-3 flex justify-between items-center">
            <div onClick={() => navigate(`/${task.id}`)} className="cursor-pointer">
                <h3 className="text-lg font-semibold">{task.title}</h3>
                <p className="text-gray-500 text-sm">{task.description}</p>
            </div>

            <button
                onClick={() => deleteTask(task.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
            >
                Delete
            </button>
        </div>
    );
}
