
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



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  useEffect(() => {
    checkAuth(); 
  }, []);
  const checkAuth = async () => {
    try {
        const response = await axios.get('http://localhost/api/checkAuth.php');
        if (response && response.data.status === 'success') {
            console.log("ughghjghjghgjghjghjg")
            setIsLoggedIn(true);
        }
    } catch (error) {
        console.error('Error checking authentication:', error);
        setIsLoggedIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsAdminLoggedIn(false);
  };
  return (
    <div className="App">
      <Router>
      <Navbar isLoggedIn={isLoggedIn} isAdminLoggedIn={isAdminLoggedIn} handleLogout={handleLogout}></Navbar>
      <Routes>
        <Route path='/'  element={<Home/>}></Route>
        <Route path='user/create' element={<CreateUser />} />
        <Route path='user/:id/Edit' element={<EditUser/>} />
        <Route path='user/listUsers' element={<ListUser/>} />
        <Route path='user/signUp' element={<SignUp/>} />
        <Route path='user/login' element={<Login isLoggedIn={setIsLoggedIn}/>} />
      </Routes>
      </Router>
      
  
    </div>
  );
}

export default App;
