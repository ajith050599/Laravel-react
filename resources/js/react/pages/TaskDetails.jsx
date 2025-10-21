import { useParams, useNavigate } from "react-router-dom";

export default function TaskDetails({ tasks }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const task = tasks.find((t) => t.id === parseInt(id));

    if (!task) {
        return (
            <div>
                <p className="text-red-600">Task not found.</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-gray-700 text-white px-3 py-2 rounded"
                >
                    Back to Dashboard
                </button>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-2">{task.title}</h2>
            <p className="text-gray-600 mb-4">{task.description}</p>
            <button
                onClick={() => navigate("/")}
                className="bg-gray-700 text-white px-3 py-2 rounded"
            >
                Back
            </button>
        </div>
    );
}
