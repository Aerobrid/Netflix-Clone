// strict mode is used to highlight potential problems in an application
import { React, StrictMode } from 'react'
// Importing React and ReactDOM for rendering the application
import { createRoot } from 'react-dom/client'
// Importing the main CSS file for styling
import './index.css'
// Importing the main application component and BrowserRouter for routing
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

// Creating the root element for the React application and rendering it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
