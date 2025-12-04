import { useState } from "react";

interface Task {
  id: number;
  text: string;
  dueDate: string; // store due date as string (YYYY-MM-DD)
}

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [input, setInput] = useState("");
  const [dueDate, setDueDate] = useState(""); // state for date picker

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: input, dueDate }]);
    setInput("");
    setDueDate("");
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className="card">
        <h1> 3D To-Do Dashboard</h1>

        {/* Task input */}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your task..."
          className="task-input"
        />

        {/* Date picker */}
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="task-input"
          min={new Date().toISOString().split("T")[0]} // prevent past dates
          placeholder="Select due date"
        />

        {/* Add button */}
        <button onClick={addTask} className="add-button">
          Add
        </button>

        {/* Task list */}
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className="task-item">
              <div>
                <span>{task.text}</span>
                {task.dueDate && (
                  <small className="block text-sm text-green-300">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </small>
                )}
              </div>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
