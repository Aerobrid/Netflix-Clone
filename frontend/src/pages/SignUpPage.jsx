// Importing React and useState for managing state
import { React, useState } from 'react';
// Importing Link from react-router-dom for navigation
import { Link } from 'react-router-dom';
import { useAuthStore } from "../store/authUser";

// Importing the SignUpPage component
// This component renders the sign-up page for the application
const SignUpPage = () => {
  // Using searchParams from the URL to get the email value
  // This allows the page to pre-fill the email field if the user navigates to this page with an email query parameter
  const {searchParams} = new URL(document.location);
  const emailValue = searchParams.get("email");
  // Using useState to manage the state of the email, username, and password fields
  // The initial state of the email field is set to the value from the URL if available, otherwise it defaults to an empty string
  const [email, setEmail] = useState(emailValue || '');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

	const { signup } = useAuthStore();
  
  // Function to handle form submission
  // This function is called when the user submits the sign-up form
  const handleSignUp = (e) => {
    e.preventDefault();
    signup({ email, username, password });

  };

  return <div className='h-screen w-full hero-bg'>
    <header className='max-w-6xl mx-auto flex items-center justify-between p-4'>
      <Link to={"/"}>
        <img src="/netflix-logo.png" alt="Logo" className="w-52" />
      </Link>
    </header>

    <div className='flex justify-center items-center mt-20 mx-3'>
      <div className='w-full max-w-md p-8 space-y-6 bg-black/60 rounded-lg shadow-md'>
        <h1 className='text-center text-white text-2xl font-bold mb-4'>Sign Up</h1>

        <form className="space-y-4" onSubmit={handleSignUp}>
          {/* Form fields for email, username, and password */}
          {/* Each field has a label and an input element */}
          {/* The input elements are styled with Tailwind CSS classes for a consistent look */}
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
            <label htmlFor="username" className="text-sm font-medium text-gray-300 block ">
              Username
            </label>
            <input type="text" 
              className='w-full px-3 py-2 mt-1 border border-gray-700 rounded-md bg-transparent text-white focus:outline-none focus:ring' 
              placeholder='JohnDoe123'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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

          <button className='w-full py-2 bg-red-600 text-white font-semibold rounded-md
          hover:bg-red-700'>
            Sign Up
          </button>
        </form>
        <div className='text-center text-gray-400'>
          Already a member?{" "}
          <Link to={"/login"} className='text-red-500 hover:underline'>Sign In</Link>
        </div>
      </div>
    </div>
  </div>;
};

// Exporting the SignUpPage component so it can be used in other parts of the application
export default SignUpPage;
