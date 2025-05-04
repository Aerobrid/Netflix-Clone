// This file manages the authentication state of the user using Zustand.
// It provides methods for signing up, logging in, logging out, and checking authentication status.
import axios from "axios";
// toast is used to display notifications to the user
import toast from "react-hot-toast";
// create a Zustand store for managing authentication state
import { create } from "zustand";

export const useAuthStore = create((set) => ({
	// Initial state of the store
	user: null,
	isSigningUp: false,
	isCheckingAuth: true,
	isLoggingOut: false,
	isLoggingIn: false,
	// These actions are asynchronous and interact with the backend API
	// This function handles user signup
	signup: async (credentials) => {
		set({ isSigningUp: true });
		try {
			const response = await axios.post("/api/v1/auth/signup", credentials);
			set({ user: response.data.user, isSigningUp: false });
			toast.success("Account created successfully");
		} catch (error) {
			toast.error(error.response.data.message || "Signup failed");
			set({ isSigningUp: false, user: null });
		}
	},
	// This function handles user login
	login: async (credentials) => {
		set({ isLoggingIn: true });
		try {
			const response = await axios.post("/api/v1/auth/login", credentials);
			set({ user: response.data.user, isLoggingIn: false });
		} catch (error) {
			set({ isLoggingIn: false, user: null });
			toast.error(error.response.data.message || "Login failed");
		}
	},
	// This function handles user logout
	logout: async () => {
		set({ isLoggingOut: true });
		try {
			await axios.post("/api/v1/auth/logout");
			set({ user: null, isLoggingOut: false });
			toast.success("Logged out successfully");
		} catch (error) {
			set({ isLoggingOut: false });
			toast.error(error.response.data.message || "Logout failed");
		}
	},
	// This function checks if the user is authenticated
	// last line commented out to avoid annoying error messages coming from the backend
	authCheck: async () => {
		set({ isCheckingAuth: true });
		try {
			const response = await axios.get("/api/v1/auth/authCheck");
			set({ user: response.data.user, isCheckingAuth: false });
		} catch {
			set({ isCheckingAuth: false, user: null });
			// toast.error(error.response.data.message || "An error occurred");
		}
	},
}));