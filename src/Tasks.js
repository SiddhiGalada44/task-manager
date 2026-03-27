import { useState, useEffect } from "react";
import { getTasks, createTask, completeTask, deleteTask } from "./api";

export default function Tasks({ token, onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  // Load tasks when component mounts
  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function fetchTasks() {
    setLoading(true);
    const data = await getTasks(token);
    setTasks(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!newTitle.trim()) return;
    setAdding(true);
    const task = await createTask(token, newTitle);
    setTasks(prev => [...prev, task]);
    setNewTitle("");
    setAdding(false);
  }

  async function handleComplete(id) {
    const updated = await completeTask(token, id);
    setTasks(prev => prev.map(t => t.id === id ? updated : t));
  }

  async function handleDelete(id) {
    await deleteTask(token, id);
    setTasks(prev => prev.filter(t => t.id !== id));
  }

  const pending   = tasks.filter(t => !t.completed);
  const completed = tasks.filter(t => t.completed);

  return (
    <div style={styles.container}>
      <div style={styles.inner}>

        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}>My Tasks</h1>
          <button onClick={onLogout} style={styles.logoutBtn}>
            Log out
          </button>
        </div>

        {/* Add task form */}
        <form onSubmit={handleAdd} style={styles.form}>
          <input
            placeholder="Add a new task..."
            value={newTitle}
            onChange={e => setNewTitle(e.target.value)}
            style={styles.input}
          />
          <button
            type="submit"
            disabled={adding}
            style={styles.addBtn}
          >
            {adding ? "Adding..." : "Add"}
          </button>
        </form>

        {/* Task list */}
        {loading ? (
          <p style={styles.empty}>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p style={styles.empty}>No tasks yet. Add one above!</p>
        ) : (
          <>
            {/* Pending tasks */}
            {pending.length > 0 && (
              <div style={styles.section}>
                <p style={styles.sectionLabel}>
                  {pending.length} remaining
                </p>
                {pending.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}

            {/* Completed tasks */}
            {completed.length > 0 && (
              <div style={styles.section}>
                <p style={styles.sectionLabel}>
                  Completed ({completed.length})
                </p>
                {completed.map(task => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onComplete={handleComplete}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function TaskItem({ task, onComplete, onDelete }) {
  return (
    <div style={styles.taskItem}>
      {/* Checkbox */}
      <button
        onClick={() => !task.completed && onComplete(task.id)}
        style={{
          ...styles.checkbox,
          background: task.completed ? "#1a1a1a" : "transparent",
          borderColor: task.completed ? "#1a1a1a" : "#e0e0e0",
        }}
      >
        {task.completed && (
          <span style={{ color: "#fff", fontSize: "11px" }}>✓</span>
        )}
      </button>

      {/* Title */}
      <span style={{
        ...styles.taskTitle,
        textDecoration: task.completed ? "line-through" : "none",
        color: task.completed ? "#aaa" : "#1a1a1a",
      }}>
        {task.title}
      </span>

      {/* Delete button */}
      <button
        onClick={() => onDelete(task.id)}
        style={styles.deleteBtn}
      >
        ✕
      </button>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "#f5f5f5",
    padding: "40px 20px",
  },
  inner: {
    maxWidth: "560px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
  },
  logoutBtn: {
    background: "transparent",
    color: "#888",
    fontSize: "13px",
    padding: "6px 12px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "32px",
  },
  input: {
    flex: 1,
    padding: "12px 14px",
    fontSize: "14px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    outline: "none",
    background: "#fff",
  },
  addBtn: {
    background: "#1a1a1a",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    whiteSpace: "nowrap",
  },
  section: {
    marginBottom: "24px",
  },
  sectionLabel: {
    fontSize: "12px",
    color: "#aaa",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    marginBottom: "10px",
  },
  taskItem: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    background: "#fff",
    borderRadius: "10px",
    padding: "14px 16px",
    marginBottom: "8px",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },
  checkbox: {
    width: "22px",
    height: "22px",
    borderRadius: "50%",
    border: "1.5px solid #e0e0e0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    padding: 0,
  },
  taskTitle: {
    flex: 1,
    fontSize: "14px",
  },
  deleteBtn: {
    background: "transparent",
    color: "#ccc",
    fontSize: "12px",
    padding: "4px 8px",
    borderRadius: "6px",
  },
  empty: {
    color: "#aaa",
    fontSize: "14px",
    textAlign: "center",
    marginTop: "60px",
  },
};