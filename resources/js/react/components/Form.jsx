import { useState } from "react";
import api from "../api/axios";

export default function Form() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const res = await api.post("/submit-form", formData);
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-lg font-semibold mb-4">React Form Test</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>

      {result && (
        <div className="mt-4 p-3 bg-green-100 rounded text-green-700">
          <p><strong>Message:</strong> {result.message}</p>
          <p><strong>Name (Upper):</strong> {result.data.name_upper}</p>
          <p><strong>Email Domain:</strong> {result.data.email_domain}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-100 rounded text-red-700">{error}</div>
      )}
    </div>
  );
}
