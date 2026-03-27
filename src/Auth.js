import { useState } from "react";
import { login, register } from "./api";

export default function Auth({ onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isLogin) {
        const data = await login(email, password);
        if (data.token) {
          onLogin(data.token);
        } else {
          setError(data.error || "Login failed");
        }
      } else {
        const data = await register(email, password);
        if (data.message) {
          setIsLogin(true);
          setError("Registered! Please log in.");
        } else {
          setError(data.error || "Registration failed");
        }
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
    }

    setLoading(false);
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Task Manager</h1>
        <p style={styles.subtitle}>
          {isLogin ? "Welcome back" : "Create an account"}
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={styles.input}
          />

          {error && (
            <p style={{
              ...styles.error,
              color: error.includes("Registered") ? "#2e7d32" : "#c62828"
            }}>
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Please wait..." : isLogin ? "Log in" : "Register"}
          </button>
        </form>

        <p style={styles.toggle}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span
            onClick={() => { setIsLogin(!isLogin); setError(""); }}
            style={styles.link}
          >
            {isLogin ? "Register" : "Log in"}
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f5f5",
  },
  card: {
    background: "#fff",
    borderRadius: "16px",
    padding: "48px 40px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "6px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#888",
    marginBottom: "32px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  input: {
    padding: "12px 14px",
    fontSize: "14px",
    border: "1px solid #e0e0e0",
    borderRadius: "8px",
    outline: "none",
  },
  button: {
    background: "#1a1a1a",
    color: "#fff",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "14px",
    fontWeight: "500",
    marginTop: "4px",
  },
  error: {
    fontSize: "13px",
    margin: "0",
  },
  toggle: {
    marginTop: "24px",
    fontSize: "13px",
    color: "#888",
    textAlign: "center",
  },
  link: {
    color: "#1a1a1a",
    fontWeight: "500",
    cursor: "pointer",
    textDecoration: "underline",
  },
};