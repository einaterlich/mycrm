
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const jwtToken = sessionStorage.getItem('jwtToken');

    if (jwtToken) {
      try {
        const decodedToken = JSON.parse(atob(jwtToken.split('.')[1]));
        const userRole = decodedToken.data.role;
        const id = decodedToken.data.id;
        setUserId(id);
        setIsLoggedIn(true);

        if (userRole === 'admin') {
          setIsAdminLoggedIn(true);
        } else {
          setIsAdminLoggedIn(false);
        }
  
      } catch (error) {
        console.error('Failed to decode JWT token', error);
        setIsLoggedIn(false);
        setIsAdminLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
      setIsAdminLoggedIn(false);
    }
  }, []);


  useEffect(() => {
    const checkRefreshToken = () => {
      const cookies = document.cookie.split('; ');
      const refreshTokenCookie = cookies.find(cookie => cookie.startsWith('refreshToken='));

      if (refreshTokenCookie) {
        setIsLoggedIn(true);
      }
    };

    checkRefreshToken();
  }, []);

  const refreshJwtToken = async () => {
    try {
      const response = await axios.get('http://localhost/api/refresh-token.php', {
        withCredentials: true 
      });
      const { jwtToken: newToken } = response.data;
      sessionStorage.setItem('jwtToken', newToken);
      setJwtToken(newToken);
      setIsLoggedIn(true);

      setLoading(false); 
    } catch (error) {
      console.error('Error refreshing JWT token:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkToken = () => {
      // If there's no token, or if the token is expired, refresh it
      if (!jwtToken) {
        refreshJwtToken();
      } else {
        setLoading(false); 
      }
    };

    checkToken();
  }, [jwtToken]);




  if (loading) {
    return <div>Loading...</div>; 
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
        <Route path='user/create' element={<CreateUser   />} />
        <Route path='user/:id/Edit' element={<EditUser idUser={userId} />} />
        <Route path='user/listUsers' element={<ListUser isAdminLoggedIn={isAdminLoggedIn}  />} />
        <Route path='user/signUp' element={<SignUp/>} />
        <Route path='user/login' element={<Login isLoggedIn={setIsLoggedIn} setIsAdminLoggedIn={setIsAdminLoggedIn} setUserId={setUserId}/>} />
      </Routes>
      </Router>
      
  
    </div>
  );
}

export default App;
