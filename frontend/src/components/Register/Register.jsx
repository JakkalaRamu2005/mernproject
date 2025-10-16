import { useState } from "react";
import "./register.css";
import { useNavigate, Link } from "react-router";
// import axios from "axios";
function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    const res = await fetch("http://localhost:5000/auth/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form),
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      setMsg("Registration successful! Redirecting to login...");
      setForm({ name: "", email: "", password: "" });
      setTimeout(() => navigate("/login"), 1500);

    } else {
      setMsg(data.message || "Registration failed.");
    }
  };

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            value={form.name}
            placeholder="Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            value={form.email}
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            value={form.password}
            placeholder="Password"
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <button className="" type="submit">Register</button>
      </form>
      {msg && <p className="message">{msg}</p>}
      <p className="redirect-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>

    </div>

  );
}

export default Register;
