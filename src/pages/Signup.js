import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/LoginSignup.css";
import API from "../api/axios";
import { FiZap } from "react-icons/fi";
export default function Signup() {
  const nav = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    setLoading(true);

    try {
      await API.post("/auth/register", { name, email, password });
      nav("/login");
    } catch (error) {
      setErr(error?.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card center">
        <div className="auth-logo">
  <FiZap />
</div>
        <div className="auth-brand">
          fast<span>cart</span>
        </div>

        <h2 className="auth-title">Create account</h2>
        <p className="auth-subtitle">Sign up to get started</p>

        {err && <div className="error">{err}</div>}

        <form onSubmit={submit} className="auth-form">
          <label className="field">
            <span>Name</span>
            <input
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>

          <label className="field">
            <span>Email</span>
            <input
              type="email"
              placeholder="abc@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className="field">
            <span>Password</span>
            <div className="pw-wrap">
              <input
                type={showPw ? "text" : "password"}
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPw(!showPw)}
              >
                {showPw ? "Hide" : "Show"}
              </button>
            </div>
          </label>

          <button className="primary-btn full" disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="auth-foot">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}
