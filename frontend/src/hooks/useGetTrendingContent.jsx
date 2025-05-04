// Description: Custom hook to fetch trending content based on the content type from the store
// useEffect to fetch trending content when the component mounts or when contentType changes
// useState to manage the state of trending content
import { useEffect, useState } from "react";
// useContentStore to access the current content type (movie or TV)
import { useContentStore } from "../store/content";
// axios for making API requests
import axios from "axios";

// Custom hook to fetch trending content
const useGetTrendingContent = () => {
	// State to hold the trending content, usestate is initialized to null for initial loading state
	const [trendingContent, setTrendingContent] = useState(null);
	// Access the current content type (movie or TV) from the content store
	const { contentType } = useContentStore();

	// useEffect to fetch trending content when the component mounts or when contentType changes
	useEffect(() => {
		// Function to fetch trending content from the API
		const getTrendingContent = async () => {
			const res = await axios.get(`/api/v1/${contentType}/trending`);
			setTrendingContent(res.data.content);
		};

		// Call the function to fetch trending content
		getTrendingContent();
	}, [contentType]);

	// Return the trending content so it can be used in components
	return { trendingContent };
};

// This allows the component using this hook to access the trending content data
export default useGetTrendingContent;