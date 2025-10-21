import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddTask({ addTask }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return alert("Please enter a title");
        addTask({ title, description });
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block font-semibold mb-1">Task Title</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="Enter task title"
                />
            </div>

            <div>
                <label className="block font-semibold mb-1">Description</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border p-2 rounded w-full"
                    placeholder="Enter task description"
                />
            </div>

            <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded"
            >
                Add Task
            </button>
        </form>
    );
}
