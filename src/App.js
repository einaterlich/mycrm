
import { BrowserRouter,Routes ,Route} from 'react-router-dom';
import './App.css';
import ListUser from './components/pages/ListUser';
import CreateUser from './components/pages/CreateUser';
import EditUser from './components/pages/EditUser';
import Navbar from './components/Navbar';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Home from './components/pages/Home';

function App() {
  return (
    <div className="App">
      

      <BrowserRouter>
      <Navbar></Navbar>
      
      {/* <nav>
        <ul>
          <li>
            <Link to='/'>List  users</Link>
          </li>
          <li>
            <Link to="user/create">Create User</Link>
          </li>
        </ul>
      </nav> */}
      <Routes>
        <Route path='/'  element={<Home/>}></Route>
        <Route path='user/create' element={<CreateUser />} />
        <Route path='user/:id/Edit' element={<EditUser/>} />
        <Route path='user/listUsers' element={<ListUser/>} />
        <Route path='user/signUp' element={<SignUp/>} />
        <Route path='user/login' element={<Login/>} />
       
      </Routes>
      
      </BrowserRouter>
      
  
    </div>
  );
}

export default App;
