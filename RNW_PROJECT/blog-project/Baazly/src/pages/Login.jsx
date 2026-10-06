import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, isAuthenticated } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/profile";

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage("");

    if (!email.trim() || !password) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      const loggedUser = await login(email, password);
      toast.success(`Welcome back, ${loggedUser.name}!`);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.message || "Login failed. Please check your credentials.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-top">
        <p className="small-title">Welcome back</p>
        <h1>Sign In to Baazly</h1>
      </section>

      <section className="form-section">
        <form className="product-form auth-form" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="auth-error-banner">
              <i className="fa-solid fa-circle-exclamation"></i>
              <span>{errorMessage}</span>
            </div>
          )}

          <div>
            <label htmlFor="loginEmail">Email Address</label>
            <input
              type="email"
              id="loginEmail"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>

          <div>
            <label htmlFor="loginPassword">Password</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                id="loginPassword"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrorMessage("");
                }}
              />
              <button
                type="button"
                className="password-toggle-btn"
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <i className={showPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn"
            disabled={isSubmitting}
            style={{ width: "100%", marginTop: "14px" }}
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i> Signing in...
              </>
            ) : (
              <>
                <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In
              </>
            )}
          </button>

          <p style={{ margin: "14px 0 0", textAlign: "center", fontSize: "13px", color: "#666" }}>
            Don't have an account?{" "}
            <Link to="/signup" style={{ color: "var(--primary)", fontWeight: 700 }}>
              Create an account
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}
