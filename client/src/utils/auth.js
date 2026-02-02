import axios from "axios";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

/* ===================== AXIOS INSTANCE ===================== */
const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
});

/* ===================== AUTH HELPERS ===================== */
export const setAuth = (token, user) => {
  if (!token || !user) return;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
};

export const getUser = () => {
  const raw = localStorage.getItem("user");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

export const getUserId = () => {
  const user = getUser();
  return user?.id || user?._id || null;
};

export const getToken = () => localStorage.getItem("token");

export const isAuthenticated = () => {
  return Boolean(getToken() && getUser());
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/login";
};

/* ===================== EMAIL LOGIN ===================== */
export const loginWithEmail = async (email, password) => {
  try {
    const res = await API.post("/auth/login", { email, password });
    const { token, user } = res.data;
    setAuth(token, user);
    return { success: true, user };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Login failed",
    };
  }
};

/* ===================== GOOGLE LOGIN ===================== */
export const loginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const idToken = await result.user.getIdToken();

    const res = await API.post("/auth/google", { idToken });
    const { token, user } = res.data;

    setAuth(token, user);
    return { success: true, user };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Google login failed",
    };
  }
};

/* ===================== ATTACH TOKEN ===================== */
API.interceptors.request.use((req) => {
  const token = getToken();
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
