import React from 'react'
import axios from "axios"
import FormComponent from '../FormComponent'
import './../FormComponent.css';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import {  useState} from 'react';


function Login({isLoggedIn,setIsAdminLoggedIn,setUserId}) {
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    


    const [formLogin, setFormLogin] = useState({
        email: '',
        password: '',
      });
    const fields = [
        { name: 'email', label: 'User Email:', type: 'email', placeholder: 'Your Email'},
        { name: 'password', label: 'Password:', type: 'password', placeholder: 'Your Password'}
    ]
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormLogin((prevFormLogin) => ({ ...prevFormLogin, [name]: value }));
      };
      
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formLogin);
        try{
            await axios.post('http://localhost/api/login.php',formLogin).then(response=>{
                if(response && response.data.status === 'success'){
                    setSuccessMessage('Login successful!');
                    setErrorMessage('');
                    sessionStorage.setItem('jwtToken', response.data.token);
                    document.cookie = `refreshToken=${response.data.refreshToken}; expires=${new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString()}; path=/; secure; SameSite=Strict`;
                    isLoggedIn(true);


                    const decodedToken = JSON.parse(atob(response.data.token.split('.')[1]));
                    const userRole = decodedToken.data.role;
                    setUserId(decodedToken.data.id)
                    if(userRole==="admin"){
                        setIsAdminLoggedIn(true)
                    }
                    
                    setTimeout(() => {
                        navigate('/user/profile');
                    }, 2000);
                }
                else{
                    isLoggedIn(false);
                    setErrorMessage(response?.data?.message || 'Login failed');
                }
            }).catch(err =>{
                setErrorMessage(err.response?.data?.message || err.response);
                isLoggedIn(false);
            })

        }
        catch{

        };
    }



  return (
    <div className='main'>
      <div className='form-login'>
        <div className='form-container'> 
            <h3 style={{ fontSize: 36, paddingBottom: 30 ,color:'white'}}>Login</h3>
            <FormComponent 
                formData={formLogin}
                fields={fields}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                buttonStyle='btn--outlineGreen'
                buttonText='Sign In'
            
            />
             {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-login">{successMessage}</p>} 
            
            <Link to='/user/signUp' style={{color:'black'}}>New here? Create an account</Link>
        
        </div>
        
        
    </div>
    </div>
  )
}

export default Login