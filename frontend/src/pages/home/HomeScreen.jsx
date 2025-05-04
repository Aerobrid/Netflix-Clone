// Description: Home screen component for the application, displaying trending content and categories
// import link from react-router-dom to navigate between pages
import { Link } from "react-router-dom";
// import Navbar component for the navigation bar
import Navbar from "../../components/Navbar";
// import icons from lucide-react for play and info buttons
import { Info, Play } from "lucide-react";
// import custom hook to fetch trending content
import useGetTrendingContent from "../../hooks/useGetTrendingContent";
// import constants for movie and TV categories, and image base URL
import { MOVIE_CATEGORIES, ORIGINAL_IMG_BASE_URL, TV_CATEGORIES } from "../../utils/constants";
// import content store to get the current content type
import { useContentStore } from "../../store/content";
// import MovieSlider component to display movie or TV show sliders
import MovieSlider from "../../components/MovieSlider";
// import useState hook from react to manage loading state of images
import { useState } from "react";

// HomeScreen component definition
const HomeScreen = () => {
  // useGetTrendingContent hook to fetch trending content
	const { trendingContent } = useGetTrendingContent();
  // useContentStore hook to get the current content type (movie or TV)
	const { contentType } = useContentStore();
  // useState hook to manage loading state of the background image
	const [imgLoading, setImgLoading] = useState(true);

  // If no trending content is available, return a loading screen with a shimmer effect
	if (!trendingContent)
		return (
			<div className='h-screen text-white relative'>
				<Navbar />
				<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center -z-10 shimmer' />
			</div>
		);

  // Render the home screen with the trending content and categories
	return (
		<>
			<div className='relative h-screen text-white '>
				<Navbar />

				{/* COOL OPTIMIZATION HACK FOR IMAGES */}
        {/* Show a shimmer effect while the background image is loading */}
				{imgLoading && (
					<div className='absolute top-0 left-0 w-full h-full bg-black/70 flex items-center justify-center shimmer -z-10' />
				)}

				<img
					src={ORIGINAL_IMG_BASE_URL + trendingContent?.backdrop_path}
					alt='Hero img'
					className='absolute top-0 left-0 w-full h-full object-cover -z-50'
					onLoad={() => {
						setImgLoading(false);
					}}
				/>

				<div className='absolute top-0 left-0 w-full h-full bg-black/50 -z-50' aria-hidden='true' />

				<div className='absolute top-0 left-0 w-full h-full flex flex-col justify-center px-8 md:px-16 lg:px-32'>
					<div
						className='bg-gradient-to-b from-black via-transparent to-transparent 
					absolute w-full h-full top-0 left-0 -z-10'
					/>

          {/* Main content area with title, movie rating, release date, overview, and action buttons */}
					<div className='max-w-2xl'>
						<h1 className='mt-4 text-6xl font-extrabold text-balance'>
							{trendingContent?.title || trendingContent?.name}
						</h1>
						<p className='mt-2 text-lg'>
							{trendingContent?.release_date?.split("-")[0] ||
								trendingContent?.first_air_date.split("-")[0]}{" "}
							| {trendingContent?.adult ? "18+" : "PG-13"}
						</p>

						<p className='mt-4 text-lg'>
							{trendingContent?.overview.length > 200
								? trendingContent?.overview.slice(0, 200) + "..."
								: trendingContent?.overview}
						</p>
					</div>

					<div className='flex mt-8'>
						<Link
							to={`/watch/${trendingContent?.id}`}
							className='bg-white hover:bg-white/80 text-black font-bold py-2 px-4 rounded mr-4 flex
							 items-center'
						>
							<Play className='size-6 mr-2 fill-black' />
							Play
						</Link>

						<Link
							to={`/watch/${trendingContent?.id}`}
							className='bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded flex items-center'
						>
							<Info className='size-6 mr-2' />
							More Info
						</Link>
					</div>
				</div>
			</div>

      {/* Render movie or TV show categories based on the content type */}
			<div className='flex flex-col gap-10 bg-black py-10'>
				{contentType === "movie"
					? MOVIE_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)
					: TV_CATEGORIES.map((category) => <MovieSlider key={category} category={category} />)}
			</div>
		</>
	);
};

// Export the HomeScreen component as the default export
export default HomeScreen;