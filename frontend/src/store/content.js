// This file defines a Zustand store for managing content type state in a React application
// Zustand is a small, fast, and scalable state management solution for React applications
import { create } from "zustand";

// type is initially set to "movie" but can be changed to "tv" using the setContentType function
// This store allows components to access and update the content type
export const useContentStore = create((set) => ({
	contentType: "movie",
	setContentType: (type) => set({ contentType: type }),
}));