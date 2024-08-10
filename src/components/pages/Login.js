import React from 'react'
import FormComponent from '../FormComponent'
import { useState } from 'react'
import './../FormComponent.css';
import { Link } from 'react-router-dom';
function Login() {

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
            {/* {errorMessage && <p className="error-message">{errorMessage}</p>}
            {successMessage && <p className="success-message">{successMessage}</p>} */}
            
            <Link to='/user/signUp' style={{color:'black'}}>New here? Create an account</Link>
        
        </div>
        
        
    </div>
    </div>
  )
}

export default Login