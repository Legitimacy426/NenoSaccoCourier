import axios from "axios";

const API_BASE_URL = "/api/auth";

export const authApi = {
  login: async (email: string, password: string) =>
    await axios.post(`${API_BASE_URL}/login`, { email, password }),

  register: async (userData: {
    username: string;
    email: string;
    password: string;
    phone: string;
  }) => await axios.post(`${API_BASE_URL}/register`, userData),

  getMe: async (token: string) =>
    await axios.get(`${API_BASE_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }),

  resetPassword: async (email: string) =>
    await axios.post(`${API_BASE_URL}/reset-password`, { email }),

  confirmResetPassword: async (token: string, password: string) =>
    await axios.post(`${API_BASE_URL}/confirm`, { token, password }),
};
