import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { signup, isAuthenticated } = useAuth();
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

    if (!name.trim()) {
      setErrorMessage("Please enter your full name.");
      return;
    }

    if (!email.trim()) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const newUser = await signup({ name, email, password, confirmPassword });
      toast.success(`Account created! Welcome to Baazly, ${newUser.name}.`);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err.message || "Failed to create account. Please try again.";
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="page-top">
        <p className="small-title">Join Baazly</p>
        <h1>Create New Account</h1>
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
            <label htmlFor="signupName">Full Name</label>
            <input
              type="text"
              id="signupName"
              required
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>

          <div>
            <label htmlFor="signupEmail">Email Address</label>
            <input
              type="email"
              id="signupEmail"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMessage("");
              }}
            />
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="signupPassword">Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="signupPassword"
                  required
                  placeholder="At least 6 characters"
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
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  required
                  placeholder="Repeat password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorMessage("");
                  }}
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  title={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  <i className={showConfirmPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye"}></i>
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn"
            disabled={isSubmitting}
            style={{ width: "100%", marginTop: "12px" }}
          >
            {isSubmitting ? (
              <>
                <i className="fa-solid fa-spinner fa-spin"></i> Creating Account...
              </>
            ) : (
              <>
                <i className="fa-solid fa-user-plus"></i> Create Account
              </>
            )}
          </button>

          <p style={{ margin: "14px 0 0", textAlign: "center", fontSize: "13px", color: "#666" }}>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "var(--primary)", fontWeight: 700 }}>
              Sign In
            </Link>
          </p>
        </form>
      </section>
    </>
  );
}
