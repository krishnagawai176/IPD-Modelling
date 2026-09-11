import { useState } from "react";
import { ArrowRight, Cuboid, ShieldCheck } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { mockUsers } from "../data/mockUsers";
import { useIPD } from "../context/IPDContext";
import PasswordField from "../components/common/PasswordField";

export default function LoginPage({ signup = false }: { signup?: boolean }) {
  const { user, setUser } = useIPD();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to="/select-model" replace />;

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const match = mockUsers.find(
      (candidate) => candidate.email === email && candidate.password === password,
    );
    if (!signup && !match) {
      setError("Email or password is incorrect. Try one of the development credentials.");
      return;
    }
    setUser({ email, role: signup ? "IPD Engineer" : match!.role });
    navigate("/select-model");
  };

  return (
    <div className="auth-page">
      <div className="auth-panel">
        <div className="auth-brand">
          <span className="brand-mark">
            <Cuboid size={24} />
          </span>
          <span>
            IPD <b>Modelling</b>
            <small>INTELLIGENT PRODUCT DESIGN</small>
          </span>
        </div>
        <div className="auth-copy">
          <span className="eyebrow">ENGINEERING WORKSPACE</span>
          <h1>{signup ? "Create your account" : "Build precisely."}</h1>
          <p>
            {signup
              ? "Set up your access to the IPD modelling workspace."
              : "Create unit-specific 3D models from master assemblies."}
          </p>
        </div>
        <form onSubmit={submit}>
          {signup && (
            <label>
              Full name
              <input required placeholder="Alex Morgan" />
            </label>
          )}
          <label>
            {signup ? "Company email" : "Email"}
            <input
              required
              type={signup ? "email" : "text"}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@company.com"
            />
          </label>
          <PasswordField
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          {signup && <PasswordField label="Confirm password" />}
          {!signup && (
            <label className="check-line">
              <input type="checkbox" /> Keep me signed in
            </label>
          )}
          {error && <div className="error-message">{error}</div>}
          <button className="primary wide" type="submit">
            {signup ? "Create account" : "Sign in"} <ArrowRight size={17} />
          </button>
        </form>
        <p className="auth-switch">
          {signup ? "Already have an account?" : "Don't have an account?"}{" "}
          <Link to={signup ? "/login" : "/signup"}>{signup ? "Sign in" : "Sign up"}</Link>
        </p>
        <p className="demo-note">
          <ShieldCheck size={14} /> Development workspace · mock authentication
        </p>
      </div>
    </div>
  );
}
