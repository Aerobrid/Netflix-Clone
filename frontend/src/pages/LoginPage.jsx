// Importing React and useState for managing state
import { React, useState } from 'react';
// Importing Link from react-router-dom for navigation
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authUser';

// Importing the LoginPage component
// This component renders the login page for the application
// It includes a form for users to enter their email and password to log in
const LoginPage = () => {
  // State variables to hold the email and password input values
  // useState is a React hook that allows you to add state to functional components
  const [email, setEmail] = useState('');
  // useState is used to create state variables for email and password
  // The initial state is set to an empty string
  const [password, setPassword] = useState('');
  const { login } = useAuthStore();

  // Function to handle form submission
  // This function is called when the user submits the login form
  const handleLogin = (e) => {
    // Prevent the default form submission behavior
    // This is important to prevent the page from reloading
    e.preventDefault();
    login({email, password});
  };

  // Render the login page
  // The page includes a header with a logo, a form for login, and a link to the signup page
  return <div className='h-screen w-full hero-bg'>
    <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
      <Link to={"/"}>
        <img src="/netflix-logo.png" alt="Logo" className="w-52" />
      </Link>
    </header>

    <div className='flex justify-center items-center mt-20 mx-3'>
      <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
        <h1 className='text-center text-white text-2xl font-bold mb-4'>Login</h1>

        {/* Form for user login */}
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-gray-300 block ">
              Email
            </label>
            <input type="email" 
              className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' 
              placeholder='you@example.com'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="text-sm font-medium text-gray-300 block ">
              Password
            </label>
            <input type="Password" 
              className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' 
              placeholder='••••••••'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Submit button for the login form */}
          {/* This button will trigger the handleLogin function when clicked */}
          <button className='w-full py-2 bg-red-600 text-white font-semibold rounded-md
          hover:bg-red-700'>
            Login
          </button>
        </form>
        <div className='text-center text-gray-400'>
          New to Netflix?{" "}
          <Link to={"/signup"} className='text-red-500 hover:underline'>Sign up now.</Link>
        </div>
      </div>
    </div>
  </div>;
};

// This component is exported so it can be used in other parts of the application
// It is the main component for the login page and can be imported into the main application file or router
export default LoginPage;
