import { useState } from "react";
import { useAuth } from "../AuthContext";
import "./login.css";
// import axios from "axios";
import { useNavigate,Link } from "react-router";

function Login() {
  const { setIsLoggedIn } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    const res = await fetch("http://localhost:5000/auth/login", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      setIsLoggedIn(true);
      setMsg("Login successful! Welcome back.");
      navigate("/");
    } else {
      setMsg(data.message || "Login failed.");
    }
  }
  return (

    <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            placeholder="Email"
            id="email"
            name="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"

            placeholder="Password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button type="submit">Login</button>
        {msg && <p className="message">{msg}</p>}
        <p className="redirect-text">
          Don't have an account? <Link to="/register">Register now</Link>
        </p>
      </form>

    </div>


  );

};


export default Login;
