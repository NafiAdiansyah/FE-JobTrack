// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../utils/api";
import { useRouter } from "next/router";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);      // user object or null
  const [loading, setLoading] = useState(true); // loading while checking token
  const router = useRouter();

  // centralize: set token + user (used after login/register)
  const setAuth = (token, userObj) => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");

    if (userObj) localStorage.setItem("user", JSON.stringify(userObj));
    else localStorage.removeItem("user");

    setUser(userObj || null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const fetchProfile = async (token) => {
    try {
      // api already attaches token via interceptor (see utils/api.js)
      const res = await api.get("/api/auth/profile");
      // Expect backend returns { user: { ... } }
      if (res.data && res.data.user) return res.data.user;
      // fallback: maybe backend returns user directly
      return res.data;
    } catch (err) {
      console.error("fetchProfile error:", err?.response?.data || err.message);
      return null;
    }
  };

  useEffect(() => {
    // run only on client
    const init = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setLoading(false);
        return;
      }

      // optimistic: try to use local storage user first (fast UI)
      const stored = localStorage.getItem("user");
      if (stored) {
        try {
          setUser(JSON.parse(stored));
        } catch (e) {
          setUser(null);
        }
      }

      // verify with backend and refresh user if needed
      const verified = await fetchProfile(token);
      if (verified) {
        setUser(verified);
        localStorage.setItem("user", JSON.stringify(verified));
      } else {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      }
      setLoading(false);
    };

    init();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, setAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
