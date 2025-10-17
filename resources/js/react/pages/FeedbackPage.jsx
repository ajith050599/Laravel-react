import React, { useState } from "react";
import api from "../api/axios";

const FeedbackPage = () => {
  const [formData, setFormData] = useState({ name: "", message: "" });
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResponse(null);

    try {
      const res = await api.post("/submit-feedback", formData);
      setResponse(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-semibold mb-4">Feedback Form</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <textarea
          name="message"
          placeholder="Your Feedback"
          value={formData.message}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Submit Feedback
        </button>
      </form>

      {response && (
        <p className="mt-4 text-green-700"> {response.message}</p>
      )}

      {error && (
        <p className="mt-4 text-red-600">{error}</p>
      )}

      <div>
        <a href="/contact" className="text-blue-600 underline">
          Go to Contact Page
        </a>
      </div>
    </div>


  );
};

export default FeedbackPage;
