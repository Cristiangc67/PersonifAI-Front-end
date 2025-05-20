import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext();
const API_URL = "http://localhost:5500/api/v1/auth";

export const AuthProvider = ({ children }) => {
  const [actualUser, setActualUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
    const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = () => {
      if (token) {
        try {
          const decoded = jwtDecode(token);
          if (decoded.exp * 1000 > Date.now()) {
            setActualUser({
              id: decoded.userId,
              email: decoded.email,
              username: decoded.username,
              image: decoded.image,
            });
          } else {
            logout();
          }
        } catch (error) {
          logout();
        }
      }
      setIsLoading(false); 
    };
    initializeAuth()
  }, [token]);

  const signup = async (username, email, password) => {
    try {
      const response = await axios.post(`${API_URL}/sign-up`, {
        username,
        email,
        password,
      });
      const { token, user } = response.data.data;
      setToken(token);
      setActualUser({
        id: user._id,
        username: user.username,
        email: user.email,
      });
      localStorage.setItem("token", token);
    } catch (error) {
      throw error.response?.data?.message || "Error al registrarse";
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/log-in`, {
        email,
        password,
      });
      const { token, user } = response.data.data;
      setToken(token);
      setActualUser({
        id: user._id,
        username: user.username,
        email: user.email,
        image: user.profilePicture,
      });
      localStorage.setItem("token", token);
    } catch (error) {
      throw error.response?.data?.message || "Error al iniciar sesion";
    }
  };
  const logout = () => {
    setToken(null);
    setActualUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };

  const updateUserImage = (newImageUrl) => {
    setActualUser((prevuser) => {
      if (!prevuser) {
        return null;
      }
      const updatedUser = { ...prevuser, image: newImageUrl };
      return updatedUser;
    });
  };

  const refreshUser = async () => {
    if (!token) return;
    try {
      const res = await axios.get(
        `http://localhost:5500/api/v1/users/${actualUser.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const user = res.data.data;

      setActualUser({
        id: user._id,
        username: user.username,
        email: user.email,
        image: user.profilePicture,
      });
    } catch (error) {
      console.error("Error al refrescar el usuario:", error);
    }
  };

  const value = {
    actualUser,
    token,
    signup,
    login,
    logout,
    updateUserImage,
    refreshUser,
    isAuthenticated: !!actualUser,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
