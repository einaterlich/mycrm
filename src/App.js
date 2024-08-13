
import { BrowserRouter as Router,Routes ,Route} from 'react-router-dom';
import './App.css';
import ListUser from './components/pages/ListUser';
import CreateUser from './components/pages/CreateUser';
import EditUser from './components/pages/EditUser';
import Navbar from './components/Navbar';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import Profile from './components/pages/Profile';




function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[userId,setUserId]=useState('');

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [jwtToken, setJwtToken] = useState(sessionStorage.getItem('jwtToken') || '');
  const [loading, setLoading] = useState(true); // For loading state
  useEffect(() => {
    const jwtToken = sessionStorage.getItem('jwtToken');

    if (jwtToken) {
      try {
        // Decode the JWT token to extract the role
        const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));
        const userRole = decodedToken.data.role;
        const id = decodedToken.data.id;
        setUserId(id);
        setIsLoggedIn(true);
  
        // Check if the user is an admin
        if (userRole === 'admin') {
          setIsAdminLoggedIn(true);
        } else {
          setIsAdminLoggedIn(false);
        }
  
      } catch (error) {
        console.error('Failed to decode JWT token', error);
        // In case of error, set logged-in state to false
        setIsLoggedIn(false);
        setIsAdminLoggedIn(false);
      }
    } else {
      // No token, user is not logged in
      setIsLoggedIn(false);
      setIsAdminLoggedIn(false);
    }
  }, []);


  useEffect(() => {
    // Function to check if the refreshToken cookie exists
    const checkRefreshToken = () => {
      const cookies = document.cookie.split('; ');
      const refreshTokenCookie = cookies.find(cookie => cookie.startsWith('refreshToken='));

      if (refreshTokenCookie) {
        setIsLoggedIn(true);
      }
    };

    // Call the function on component mount (page refresh)
    checkRefreshToken();
  }, []);

  const refreshJwtToken = async () => {
    try {
      const response = await axios.get('http://localhost/api/refresh-token.php', {
        withCredentials: true // Send cookies with the request
      });
      const { jwtToken: newToken } = response.data;
      sessionStorage.setItem('jwtToken', newToken);
      console.log("jhkjhhk")
      console.log(newToken);
      setJwtToken(newToken);
      setIsLoggedIn(true);

      setLoading(false); // Set loading to false once token is refreshed
    } catch (error) {
      console.error('Error refreshing JWT token:', error);
      // Handle the error, such as redirecting to the login page
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkToken = () => {
      // If there's no token, or if the token is expired, refresh it
      if (!jwtToken) {
        refreshJwtToken();
      } else {
        // Optional: Check token expiration and refresh if necessary
        // Implement token expiration check if needed
        setLoading(false); // Set loading to false if no refresh is needed
      }
    };

    checkToken();
  }, [jwtToken]);




  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }
   


  const handleLogout = () => {
    sessionStorage.removeItem('jwtToken');
    deleteCookie('refreshToken');
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
    window.location.href = '/';
    
  };

  function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=0; path=/;';
  }
  

  return (
    <div className="App">
      <Router>
      <Navbar isLoggedIn={isLoggedIn}  isAdminLoggedIn={isAdminLoggedIn} handleLogout={handleLogout} userId={userId}></Navbar>
      <Routes>
        <Route path='/'  element={<Home/>}></Route>
        <Route path='user/profile'  element={<Profile idUser={userId} isLoggedIn={isLoggedIn}/>}></Route>
        <Route path='user/create' element={<CreateUser  />} />
        <Route path='user/:id/Edit' element={<EditUser idUser={userId} />} />
        <Route path='user/listUsers' element={<ListUser  />} />
        <Route path='user/signUp' element={<SignUp/>} />
        <Route path='user/login' element={<Login isLoggedIn={setIsLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} setUserId={setUserId}/>} />
      </Routes>
      </Router>
      
  
    </div>
  );
}

export default App;
