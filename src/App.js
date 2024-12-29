import React, { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [draggedTask, setDraggedTask] = useState(null);

  const addTask = useCallback(() => {
    if (!task.trim()) return;
    const newTask = { id: Date.now(), text: task.trim() };
    setTasks((prev) => [...prev, newTask]);
    setTask('');
  }, [task]);

  const handleDragStart = useCallback((index) => {
    setDraggedTask(index);
  }, []);

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = useCallback(
    (index) => {
      setTasks((prev) => {
        const updatedTasks = [...prev];
        const [movedTask] = updatedTasks.splice(draggedTask, 1);
        updatedTasks.splice(index, 0, movedTask);
        return updatedTasks;
      });
      setDraggedTask(null);
    },
    [draggedTask]
  );

  const deleteTask = useCallback(
    (index) => setTasks((prev) => prev.filter((_, i) => i !== index)),
    []
  );

  return (
    <main className="app" role="main">
      <div className="todo-container">
        <header>
          <h1>🚀 Advanced Drag & Drop Todo</h1>
          <p>Your ultimate task management solution.</p>
        </header>
        <section>
          <div className="input-group">
            <input
              type="text"
              value={task}
              onChange={(e) => setTask(e.target.value)}
              placeholder="Type a new task"
              aria-label="New task input"
            />
            <button onClick={addTask} aria-label="Add task button">
              Add Task
            </button>
          </div>
          <ul className="task-list" role="list">
            {tasks.map((task, index) => (
              <li
                key={task.id}
                draggable
                onDragStart={() => handleDragStart(index)}
                onDragOver={handleDragOver}
                onDrop={() => handleDrop(index)}
                className="task-item"
                role="listitem"
                aria-label={`Task: ${task.text}`}
              >
                <span>{task.text}</span>
                <button
                  onClick={() => deleteTask(index)}
                  className="delete-btn"
                  aria-label={`Delete ${task.text}`}
                >
                  ❌
                </button>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}

export default App;
