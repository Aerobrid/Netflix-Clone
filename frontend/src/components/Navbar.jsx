// Description: Navbar component for the Netflix clone application
// usestate for managing mobile menu state
import { useState } from "react";
// React Router DOM for navigation
import { Link } from "react-router-dom";
// Lucide React for icons
import { LogOut, Menu, Search } from "lucide-react";
// useauthStore for managing user authentication
import { useAuthStore } from "../store/authUser";
// useContentStore for managing content types
import { useContentStore } from "../store/content";

// Navbar component definition
const Navbar = () => {
	// State to manage mobile menu visibility
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	// Extracting user and logout function from auth store
	const { user, logout } = useAuthStore();

	// Function to toggle mobile menu visibility
	// This function toggles the state of the mobile menu between open and closed
	const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

	// Extracting setContentType function from content store to set the type of content
	const { setContentType } = useContentStore();

	return (
		<header className='max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20'>
			<div className='flex items-center gap-10 z-50'>
				<Link to='/'>
					<img src='/netflix-logo.png' alt='Netflix Logo' className='w-32 sm:w-40' />
				</Link>

				{/* desktop navbar items */}
				{/* The following links allow users to navigate to different sections of the app */}
				<div className='hidden sm:flex gap-2 items-center'>
					<Link to='/' className='hover:underline' onClick={() => setContentType("movie")}>
						Movies
					</Link>
					<Link to='/' className='hover:underline' onClick={() => setContentType("tv")}>
						Tv Shows
					</Link>
					<Link to='/history' className='hover:underline'>
						Search History
					</Link>
				</div>
			</div>

			{/* Search icon, user avatar, and logout button for the authenticated user */}
			<div className='flex gap-2 items-center z-50'>
				<Link to={"/search"}>
					<Search className='size-6 cursor-pointer' />
				</Link>
				<img src={user.image} alt='Avatar' className='h-8 rounded cursor-pointer' />
				<LogOut className='size-6 cursor-pointer' onClick={logout} />
				<div className='sm:hidden'>
					<Menu className='size-6 cursor-pointer' onClick={toggleMobileMenu} />
				</div>
			</div>

			{/* mobile navbar items */}
			{/* This section is only visible on mobile devices and contains links to navigate */}
			{/* The mobile menu can be toggled by clicking the Menu icon */}
			{isMobileMenuOpen && (
				<div className='w-full sm:hidden mt-4 z-50 bg-black border rounded border-gray-800'>
					<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Movies
					</Link>
					<Link to={"/"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Tv Shows
					</Link>
					<Link to={"/history"} className='block hover:underline p-2' onClick={toggleMobileMenu}>
						Search History
					</Link>
				</div>
			)}
		</header>
	);
};

// Exporting the Navbar component to be used in other parts of the application
export default Navbar;