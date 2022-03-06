import { useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const init = async () => {
    const { data } = await axios.get("/api/auth/init");
    setUser(data.user);
  };

  const login = async (event) => {
    event.preventDefault();

    const body = {
      email,
      password,
    };

    try {
      const { data } = await axios.post("/api/auth/login", body);
      localStorage.setItem("token", data.token);
      axios.defaults.headers.authorization = `Bearer ${data.token}`;
      await init();
    } catch (e) {
      if (e.response.status === 403) {
        alert(e.response.data.error);
      }
    }
  };

  const register = async (event) => {
    event.preventDefault();
    const body = {
      email,
      password,
    };

    await axios.post("/api/auth/register", body);
    window.location.reload();
  };

  return (
    <div style={{ display: "flex", gap: "4rem" }}>
      {user && (
        <>
          <h2>You are logged in as {user.email}</h2>
        </>
      )}

      <form onSubmit={login}>
        <h2>Login</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button>Submit</button>
      </form>

      <form onSubmit={register}>
        <h2>Register</h2>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
