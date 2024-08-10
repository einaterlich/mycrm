import React from 'react'
import { useState } from 'react';
import FormComponent from '../FormComponent';
import './CreateUser.css';

function SignUp() {

  const [formSignUp, setFormSignUp] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    city: '',
    address:'',
    password:''
  });

  const fields = [
    { name: 'firstname', label: 'First Name:', type: 'text', placeholder: 'Your First Name'},
    { name: 'lastname', label: 'Last Name:', type: 'text', placeholder: 'Your Last Name' },
    { name: 'email', label: 'User Email:', type: 'email', placeholder: 'Your Email' },
    { name: 'phone', label: 'Phone:', type: 'text', placeholder: 'Your Phone Number'},
    { name: 'address', label: 'Address:', type: 'text', placeholder: 'Your Address'},
    { name: 'city', label: 'City:', type: 'text', placeholder: 'Your City'},
    { name: 'password', label: 'Password:', type: 'password', placeholder: 'Your Password'}
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormSignUp((prevFormSignUp) => ({ ...prevFormSignUp, [name]: value }));
  };
  const handleSubmit = async (event) => {}

  return (
    <div className='main'>
      <div className='form'>
      <div className='details'> 
        <h2>Sign Up</h2>
        <div className='details-p'>
          <p>fill your details and then login.</p>
        </div>
      </div>
      <div className='form-container'>
      <FormComponent 
        formData={formSignUp}
        fields={fields}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
       {/* {errorMessage && <p className="error-message">{errorMessage}</p>}
       {successMessage && <p className="success-message">{successMessage}</p>} */}
      </div>
    
    </div>
      
    </div>
  )
}

export default SignUp