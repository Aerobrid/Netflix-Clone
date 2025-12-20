// Description: HomePage component that conditionally renders HomeScreen or AuthScreen based on user authentication status
// import HomeScreen and AuthScreen components
import HomeScreen from './HomeScreen';
import AuthScreen from './AuthScreen';
// import useAuthStore to access user authentication state
import { useAuthStore } from '../../store/authUser';

const HomePage = () => {
  // Access the user state from the authentication store
  // useAuthStore is a custom hook that provides access to the authentication state
  const { user } = useAuthStore();

  // Check if user is authenticated and render HomeScreen or AuthScreen accordingly
  // If user is authenticated, HomeScreen is rendered, otherwise AuthScreen is shown
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>
};

// Export the HomePage component as default
// This allows it to be imported in other files without needing to specify the file name
export default HomePage;
