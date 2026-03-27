const BASE_URL = "https://task-manager-api-production-944a.up.railway.app";

export async function register(email, password) {
  const res = await fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

export async function getTasks(token) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    headers: { "Authorization": `Bearer ${token}` },
  });
  return res.json();
}

export async function createTask(token, title) {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function completeTask(token, id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "PUT",
    headers: { "Authorization": `Bearer ${token}` },
  });
  return res.json();
}

export async function deleteTask(token, id) {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` },
  });
  return res.json();
}