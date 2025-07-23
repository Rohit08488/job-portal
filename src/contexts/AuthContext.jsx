import React, { createContext, useState, useContext, useEffect } from "react";

// Create a context
const AuthContext = createContext();

// Auth provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRecruiterAuthenticated, setIsRecruiterAuthenticated] =
    useState(false);

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");
    const recruiterEmail = localStorage.getItem("recruiterEmail");

    // ✅ Set authentication states based on role
    setIsAuthenticated(role === "user" && !!token);
    setIsRecruiterAuthenticated(role === "recruiter" && !!recruiterEmail);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        isRecruiterAuthenticated,
        setIsRecruiterAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
