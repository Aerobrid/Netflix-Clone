// Importing React library
import React, { useEffect } from 'react';
// Importing React Router components for routing
import {Navigate, Route, Routes} from 'react-router-dom';
// Importing the pages for the application
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
// Importing the Footer component to be displayed on all pages
import Footer from './components/Footer';
// Importing the Toaster component for displaying toast notifications
import { Toaster } from 'react-hot-toast';
// Importing the authentication store for managing user state
import { useAuthStore } from './store/authUser';
// Importing the Loader icon from lucide-react for loading state
import { Loader } from "lucide-react";


// Main App component that defines the routes for the application
function App() {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log("auth user is here:", user)

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className='h-screen'>
        <div className='flex justify-center items-center bg-black h-full'>
          <Loader className='animate-spin text-red-600 size-10' />
        </div>
      </div>
    )
  }

  return (
    // Fragment to group multiple elements without adding extra nodes to the DOM
    <>
      {/* Setting up the routes for the application */}
      {/* The HomePage component will be rendered at the root path */}
      {/* The LoginPage component will be rendered at the /login path */}
      {/* The SignUpPage component will be rendered at the /signup path */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"} />} />
      </Routes>
      {/* Footer component that will be displayed on all pages */}
      {/* It is placed outside the Routes so it appears on all pages */}
      <Footer />
      {/* Toaster component for displaying toast notifications */}
      {/* It will show notifications for actions like signup, login, and logout */}
      {/* The Toaster component is provided by the react-hot-toast library */}
      <Toaster />
    </>
  );
}

// Exporting the App component as the default export
export default App;
