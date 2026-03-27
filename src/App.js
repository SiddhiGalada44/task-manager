import { useState } from "react";
import Auth from "./Auth";
import Tasks from "./Tasks";

export default function App() {
  const [token, setToken] = useState(null);

  if (!token) {
    return <Auth onLogin={setToken} />;
  }

  return <Tasks token={token} onLogout={() => setToken(null)} />;
}