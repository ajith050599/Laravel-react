import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AddTask from "./pages/AddTask";
import TaskDetails from "./pages/TaskDetails";

const App = () => {
  const [tasks, setTasks] = useState([
    { id: 1, title: "Learn React Router", description: "Understand navigation and parameters" },
    { id: 2, title: "Build Task Manager", description: "Add tasks and view details" },
  ]);

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <Router>
      <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Manager</h1>

        <Routes>
          <Route path="/" element={<Dashboard tasks={tasks} deleteTask={deleteTask} />} />
          <Route path="/add" element={<AddTask addTask={addTask} />} />
          <Route path="/:id" element={<TaskDetails tasks={tasks} />} />
        </Routes>
      </div>
    </Router>
  );
};


const rootElement = document.getElementById("task-root");

if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}