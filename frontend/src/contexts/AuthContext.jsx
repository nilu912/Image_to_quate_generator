import { useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { createContext } from "react";
import axios from "axios";
import { useEffect } from "react";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setIsAuthenticated(true);
      navigate("/");
    }
  }, []);
  const navigate = useNavigate();
  const loginUser = async (data) => {
    const {email, password} = data;
    try {
      const respose = await axios.post(
        `${import.meta.env.VITE_API_URL}/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(respose.data.token);
      localStorage.setItem("userToken", respose.data.token);
      setIsAuthenticated(true);
      navigate("/");

      console.log(respose.data);
    } catch (err) {
      console.error(err);
    }
  };
  const registerUser = async (data) => {
    const {name, email, password} = data;
    console.log(name, email, password);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };
  const logout = () => {
    localStorage.removeItem("userToken");
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ loginUser, isAuthenticated, logout, registerUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
