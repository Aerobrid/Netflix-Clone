// Importing necessary libraries and components
import { useState } from "react";
import { useContentStore } from "../store/content";
import Navbar from "../components/Navbar";
import { Search } from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { ORIGINAL_IMG_BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

// searchPage component that allows users to search for movies, TV shows, or people
const SearchPage = () => {
  // useState hook to manage the active tab (movie, tv, or person) and search term
	const [activeTab, setActiveTab] = useState("movie");
  // useState hook to manage the search term input by the user
	const [searchTerm, setSearchTerm] = useState("");

  // useState hook to manage the search results
	const [results, setResults] = useState([]);
  // useContentStore is a Zustand store for managing content type state in the application
  // setContentType is a function to set the content type in the store
	const { setContentType } = useContentStore();

  // Function to handle tab clicks and set the active tab
  // It also sets the content type based on the active tab
	const handleTabClick = (tab) => {
		setActiveTab(tab);
		tab === "movie" ? setContentType("movie") : setContentType("tv");
		setResults([]);
	};

  // Function to handle the search action when the user submits the search form
  // It prevents the default form submission behavior, makes an API call to search for content based on the active tab and search term
	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
			setResults(res.data.content);
		} catch (error) {
			if (error.response.status === 404) {
				toast.error("Nothing found, make sure you are searching under the right category");
			} else {
				toast.error("An error occurred, please try again later");
			}
		}
	};

	return (
		<div className='bg-black min-h-screen text-white'>
			<Navbar />
      {/* Container for the search page content, including tabs, search form, and results */}
			<div className='container mx-auto px-4 py-8'>
				<div className='flex justify-center gap-3 mb-4'>
					<button
						className={`py-2 px-4 rounded ${
							activeTab === "movie" ? "bg-red-600" : "bg-gray-800"
						} hover:bg-red-700`}
						onClick={() => handleTabClick("movie")}
					>
						Movies
					</button>
					<button
						className={`py-2 px-4 rounded ${
							activeTab === "tv" ? "bg-red-600" : "bg-gray-800"
						} hover:bg-red-700`}
						onClick={() => handleTabClick("tv")}
					>
						TV Shows
					</button>
					<button
						className={`py-2 px-4 rounded ${
							activeTab === "person" ? "bg-red-600" : "bg-gray-800"
						} hover:bg-red-700`}
						onClick={() => handleTabClick("person")}
					>
						Person
					</button>
				</div>

        {/* Search form that allows users to search for content based on the active tab */}
				<form className='flex gap-2 items-stretch mb-8 max-w-2xl mx-auto' onSubmit={handleSearch}>
					<input
						type='text'
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder={"Search for a " + activeTab}
						className='w-full p-2 rounded bg-gray-800 text-white'
					/>
					<button className='bg-red-600 hover:bg-red-700 text-white p-2 rounded'>
						<Search className='size-6' />
					</button>
				</form>

				{/* Displaying the search results in a grid layout */}
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
					{results.map((result) => {
						if (!result.poster_path && !result.profile_path) return null;

						return (
							<div key={result.id} className='bg-gray-800 p-4 rounded'>
								{activeTab === "person" ? (
									<div className='flex flex-col items-center'>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.profile_path}
											alt={result.name}
											className='max-h-96 rounded mx-auto'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.name}</h2>
									</div>
								) : (
									<Link
										to={"/watch/" + result.id}
										onClick={() => {
											setContentType(activeTab);
										}}
									>
										<img
											src={ORIGINAL_IMG_BASE_URL + result.poster_path}
											alt={result.title || result.name}
											className='w-full h-auto rounded'
										/>
										<h2 className='mt-2 text-xl font-bold'>{result.title || result.name}</h2>
									</Link>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

// Exporting the SearchPage component to be used in other parts of the application
export default SearchPage;