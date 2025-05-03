// Importing React library
import React from 'react';
// Importing React Router components for routing
import {Route, Routes} from 'react-router-dom';
// Importing the pages for the application
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Footer from './components/Footer';


// Main App component that defines the routes for the application
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
      <Footer />
    </>
  );
}

// Exporting the App component as the default export
export default App;
