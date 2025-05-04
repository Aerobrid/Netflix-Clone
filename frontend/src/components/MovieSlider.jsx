// Description: A slider component to display movies or TV shows based on the selected category.
// This component fetches content from the API and allows users to scroll through the items with arrows.
// Import useState and useEffect from React for state management and side effects
// Import useRef to create a reference for the slider element
import { useEffect, useRef, useState } from "react";
// import useContentStore to access the current content type (movie or TV show)
import { useContentStore } from "../store/content";
// Import axios for making API requests
import axios from "axios";
// Import React Router's Link component for navigation
import { Link } from "react-router-dom";
// Import constants for image URLs
import { SMALL_IMG_BASE_URL } from "../utils/constants";
// import chevron icons from lucide-react for navigation arrows
import { ChevronLeft, ChevronRight } from "lucide-react";

// MovieSlider component definition
const MovieSlider = ({ category }) => {
	// Use the content store to get the current content type (movie or TV show)
	const { contentType } = useContentStore();
	// State to hold the content fetched from the API
	const [content, setContent] = useState([]);
	// State to manage the visibility of navigation arrows
	const [showArrows, setShowArrows] = useState(false);

	// Create a reference for the slider element to enable scrolling
	const sliderRef = useRef(null);

	// Format the category name and content type for display
	// Replace underscores with spaces and capitalize the first letter of the category name
	const formattedCategoryName =
		category.replaceAll("_", " ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);
	const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

	// Fetch content from the API when the component mounts or when contentType or category changes
	// useEffect is used to perform side effects in functional components
	useEffect(() => {
		const getContent = async () => {
			const res = await axios.get(`/api/v1/${contentType}/${category}`);
			setContent(res.data.content);
		};

		getContent();
	}, [contentType, category]);

	// Function to scroll the slider left or right
	// Uses the sliderRef to scroll by the width of the slider element
	const scrollLeft = () => {
		if (sliderRef.current) {
			sliderRef.current.scrollBy({ left: -sliderRef.current.offsetWidth, behavior: "smooth" });
		}
	};
	const scrollRight = () => {
		sliderRef.current.scrollBy({ left: sliderRef.current.offsetWidth, behavior: "smooth" });
	};

	// Render the MovieSlider component with the fetched content
	return (
		<div
			className='bg-black text-white relative px-5 md:px-20'
			onMouseEnter={() => setShowArrows(true)}
			onMouseLeave={() => setShowArrows(false)}
		>
			<h2 className='mb-4 text-2xl font-bold'>
				{formattedCategoryName} {formattedContentType}
			</h2>

		{/* Render the slider with a horizontal scrollable list of content items */}
		{/* The slider is wrapped in a div with overflow-x-scroll to enable horizontal scrolling when it overflows */}
			<div className='flex space-x-4 overflow-x-scroll scrollbar-hide' ref={sliderRef}>
				{content.map((item) => (
					<Link to={`/watch/${item.id}`} className='min-w-[250px] relative group' key={item.id}>
						<div className='rounded-lg overflow-hidden'>
							<img
								src={SMALL_IMG_BASE_URL + item.backdrop_path}
								alt='Movie image'
								className='transition-transform duration-300 ease-in-out group-hover:scale-125'
							/>
						</div>
						{/* Display the title or name of the movie/TV show below the image */}
						<p className='mt-2 text-center'>{item.title || item.name}</p>
					</Link>
				))}
			</div>

			{ /* Conditionally render the navigation arrows based on showArrows state */}
			{showArrows && (
				<>
					<button
						className='absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10 
            '
						onClick={scrollLeft}
					>
						<ChevronLeft size={24} />
					</button>

					<button
						className='absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            '
						onClick={scrollRight}
					>
						<ChevronRight size={24} />
					</button>
				</>
			)}
		</div>
	);
};

// Export the MovieSlider component for use in other parts of the application like in HomeScreen.jsx
export default MovieSlider;