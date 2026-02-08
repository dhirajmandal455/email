import { create } from "zustand"
import axios from "axios"


const API_URL = "http://localhost:3000/api";
axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    user: null,
    isLoading: false,
    isAuthenticated: false,
    error: null,
    isCheckingAuth: true,
    message:null,

    signup: async (name, email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await axios.post(`${API_URL}/signup`, { name, email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });

        } catch (error) {
            set({ error: error.response?.data?.message || error.message || "Error signing up", isLoading: false });
            throw error;
        }
    },
    login: async (email, password) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/login`, { email, password });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });


        } catch (error) {
            set({ error: error.response?.data?.message || error.message || "Error signing up", isLoading: false });
            throw error;
        }
    },
    forgotPassword: async (email) => {
        set({ isLoading: true, error: null })
        try {
           const response = await axios.post(`${API_URL}/forgot-pass`, { email })
            set({ message: response.data.message, isLoading: false })
        } catch (error) {
            set({ isLoading: false,error:error.response.data.message || "Error in forgot email" })
            throw error;
        }

    },
    resetPassword:async (token,password) => {
      set({isLoading:true,error:null})  
      try {
        const response =  await axios.post(`${API_URL}/reset-password/${token}`,{password})
        set({message:response.data.message,isLoading:false})
      } catch (error) {
        set({isLoading:false,error:error.response.data.message || "Error reset password"})
        throw error;
      }
    },
    logout: async () => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/logout`);
            set({ user: null, isAuthenticated: false, isLoading: false });
        } catch (error) {
            set({ error: error.response?.data?.message || error.message || "Error in logout", isLoading: false });
            throw error;
        }
    },
    verifyEmail: async (code) => {
        set({ isLoading: true, error: null })
        try {
            const response = await axios.post(`${API_URL}/verify-email`, { code });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            set({ error: error.response?.data?.message || error.message || "Error signing up", isLoading: false });
            throw error;
        }
    },
    checkAuth: async () => {
        await new Promise((resolve) => setTimeout(resolve, 2000))

        set({ isCheckingAuth: true, error: null })
        try {
            const response = await axios.get(`${API_URL}/check-auth`);
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false })
        } catch (error) {
            set({ error: null, isCheckingAuth: false, isAuthenticated: false })
        }
    }

}))