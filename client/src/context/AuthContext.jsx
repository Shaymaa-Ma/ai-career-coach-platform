import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // LOAD USER ON REFRESH
  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (!savedToken) {
      setLoading(false);
      return;
    }

    setToken(savedToken);
    setIsAuthenticated(true);

    fetch("http://localhost:5000/api/profile", {
      headers: {
        Authorization: `Bearer ${savedToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.user) setCurrentUser(data.user);
        else logout();
      })
      .catch(() => logout())
      .finally(() => setLoading(false));
  }, []);

  //  SIGNUP (AUTO LOGIN)
  const signup = async (formData) => {
    const res = await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    localStorage.setItem("token", data.token);

    setToken(data.token);
    setCurrentUser(data.user);
    setIsAuthenticated(true);

    return data.user;
  };

  //  LOGIN
  const login = async (email, password) => {
    const res = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    localStorage.setItem("token", data.token);

    setToken(data.token);
    setCurrentUser(data.user);
    setIsAuthenticated(true);

    return data.user;
  };

  //  LOGOUT
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setCurrentUser(null);
    setIsAuthenticated(false);
  }, []);

  //  UPDATE PROFILE
  const updateProfile = useCallback(async (updatedData) => {
    const res = await fetch("http://localhost:5000/api/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(updatedData)
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.error);

    setCurrentUser(data.user);
  }, [token]);

  return (
    <AuthContext.Provider value={{
      token,
      currentUser,
      loading,
      isAuthenticated,
      signup,
      login,
      logout,
      updateProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};