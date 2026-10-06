import React, { createContext, useState, useEffect, useCallback } from "react";
import { findUserByEmail, register, updateUser } from "../api/authApi";
import { loadFromStorage, saveToStorage, removeFromStorage } from "../utils/storage";

export const AuthContext = createContext(null);

const STORAGE_KEY = "baazly_user";

export const DEFAULT_ADMIN_USER = {
  id: "u1",
  name: "Prayash Jena",
  email: "prayash@baazly.com",
  password: "Prayash1234",
  role: "admin",
  phone: "+91 9999999999",
  address: {
    street: "123 Main Street",
    city: "Bhubaneswar",
    state: "Odisha",
    pincode: "751024"
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = loadFromStorage(STORAGE_KEY);
    if (stored) {
      if (stored.email === "prayash@baazly.com") {
        const adminUser = { ...DEFAULT_ADMIN_USER, ...stored, role: "admin", password: "Prayash1234" };
        saveToStorage(STORAGE_KEY, adminUser);
        return adminUser;
      }
      return stored;
    }
    saveToStorage(STORAGE_KEY, DEFAULT_ADMIN_USER);
    return DEFAULT_ADMIN_USER;
  });

  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === STORAGE_KEY) {
        setUser(e.newValue ? JSON.parse(e.newValue) : null);
      }
    }
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    setAuthError(null);

    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPassword = (password || "").trim();

    if (!cleanEmail) {
      setLoading(false);
      const err = new Error("Please enter your email address.");
      setAuthError(err.message);
      throw err;
    }

    if (!cleanPassword) {
      setLoading(false);
      const err = new Error("Please enter your password.");
      setAuthError(err.message);
      throw err;
    }

    try {
      if (cleanEmail === "prayash@baazly.com") {
        if (cleanPassword === "Prayash1234") {
          saveToStorage(STORAGE_KEY, DEFAULT_ADMIN_USER);
          setUser(DEFAULT_ADMIN_USER);
          return DEFAULT_ADMIN_USER;
        }
        throw new Error("Incorrect password. Please try again.");
      }

      const foundUser = await findUserByEmail(cleanEmail);
      if (!foundUser) {
        throw new Error("No account found with this email address.");
      }

      if (foundUser.password !== cleanPassword) {
        throw new Error("Incorrect password. Please try again.");
      }

      saveToStorage(STORAGE_KEY, foundUser);
      setUser(foundUser);
      return foundUser;
    } catch (err) {
      const message = err.message || "Failed to log in. Please check your connection.";
      setAuthError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async ({ name, email, password, confirmPassword }) => {
    setLoading(true);
    setAuthError(null);

    const cleanName = (name || "").trim();
    const cleanEmail = (email || "").trim().toLowerCase();
    const cleanPassword = (password || "").trim();
    const cleanConfirm = (confirmPassword || "").trim();

    if (!cleanName || cleanName.length < 2) {
      setLoading(false);
      const err = new Error("Please enter your full name (minimum 2 characters).");
      setAuthError(err.message);
      throw err;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!cleanEmail || !emailRegex.test(cleanEmail)) {
      setLoading(false);
      const err = new Error("Please enter a valid email address.");
      setAuthError(err.message);
      throw err;
    }

    if (!cleanPassword || cleanPassword.length < 6) {
      setLoading(false);
      const err = new Error("Password must be at least 6 characters long.");
      setAuthError(err.message);
      throw err;
    }

    if (cleanPassword !== cleanConfirm) {
      setLoading(false);
      const err = new Error("Passwords do not match.");
      setAuthError(err.message);
      throw err;
    }

    try {
      const existingUser = await findUserByEmail(cleanEmail);
      if (existingUser) {
        throw new Error("An account with this email address already exists.");
      }

      const newUser = {
        id: "u" + Date.now(),
        name: cleanName,
        email: cleanEmail,
        password: cleanPassword,
        role: "customer",
        phone: "",
        address: {
          street: "",
          city: "",
          state: "",
          pincode: ""
        },
        createdAt: new Date().toISOString()
      };

      const createdUser = await register(newUser);
      saveToStorage(STORAGE_KEY, createdUser);
      setUser(createdUser);
      return createdUser;
    } catch (err) {
      const message = err.message || "Failed to create account. Please try again.";
      setAuthError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    removeFromStorage(STORAGE_KEY);
    setUser(null);
    setAuthError(null);
  }, []);

  const updateProfile = useCallback(async (updatedFields) => {
    if (!user) throw new Error("No authenticated user.");
    setLoading(true);
    try {
      const updated = await updateUser(user.id, updatedFields);
      saveToStorage(STORAGE_KEY, updated);
      setUser(updated);
      return updated;
    } catch (err) {
      console.error("AuthContext: Profile update error:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [user]);

  const isAdmin = Boolean(
    user && (user.role === "admin" || user.email === "prayash@baazly.com")
  );

  const value = {
    user,
    isAuthenticated: Boolean(user),
    isAdmin,
    loading,
    authError,
    setAuthError,
    login,
    signup,
    logout,
    updateProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
