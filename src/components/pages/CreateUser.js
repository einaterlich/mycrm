import React, { useState,useEffect } from 'react';
import FormComponent from '../FormComponent';
import './CreateUser.css';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function CreateUser({userId,edit,signUp}) {

  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {getUsers();}, []);

  const text = edit ? 'Edit customers to your management' 
              : signUp ? 'Sign up and get access to our CRM' 
              : 'Create new customers to your management';
  const hText=edit ? 'Edit User': signUp ? 'Sign Up': 'Create New Customer';

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    city: '',
    address:'',
    password:''
  });
  
  
  async function getUsers(){
    await axios.get(`http://localhost/api/index.php/${userId}`)
    .then(response=>{
      console.log(response.data);
      setFormData({
            firstname: response.data.first_name || '',
             lastname: response.data.last_name || '',
             email: response.data.email || '',
             phone: response.data.phone || '',
             city: response.data.city || '',
             address: response.data.address || '',
             password: response.data.password || ''
         });
    }).catch(error=>{
      console.log("error while getting the data.",error);
    });
  }

  const fields = [
    { name: 'firstname', label: 'First Name:', type: 'text', placeholder: 'Your First Name',value:formData.firstname },
    { name: 'lastname', label: 'Last Name:', type: 'text', placeholder: 'Your Last Name' ,value:formData.lastname},
    { name: 'email', label: 'User Email:', type: 'email', placeholder: 'Your Email' ,value:formData.email},
    { name: 'phone', label: 'Phone:', type: 'text', placeholder: 'Your Phone Number',value:formData.phone },
    { name: 'address', label: 'Address:', type: 'text', placeholder: 'Your Address',value:formData.address },
    { name: 'city', label: 'City:', type: 'text', placeholder: 'Your City',value:formData.city },
    { name: 'password', label: 'Password:', type: 'password', placeholder: 'Your Password',value:formData.password }
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const validateFormData = (formData) => {
    if (
      !formData.firstname ||
      !formData.email ||
      !formData.phone ||
      !formData.lastname ||
      !formData.password ||
      !formData.city ||
      !formData.address
    ) {
      setErrorMessage('Please fill out all mandatory fields.');
      return false; 
    }
    return true; 
  };
  
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Invalid email format.');
      return false;
    }
    return true;
  };
  
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Simple validation for 10-digit phone number
    if (!phoneRegex.test(phone)) {
      setErrorMessage('Invalid phone number. Must be 10 digits.');
      return false;
    }
    return true;
  };
  
  const validatePassword = (password) => {
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return false;
    }
    return true;
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isFormDataValid = validateFormData(formData);
    const isEmailValid = validateEmail(formData.email);
    const isPhoneValid = validatePhone(formData.phone);
    const isPasswordValid = validatePassword(formData.password);

    // If any validation fails, stop the form submission
    if (!isFormDataValid || !isEmailValid || !isPhoneValid || !isPasswordValid) {
      return; // Prevent form submission
    }

   
    try {
      if (userId){
        await axios.put(`http://localhost/api/index.php/${userId}/edit`, formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response=>{
          if(response.status===200){
            setSuccessMessage('Form data Edited successfully. User Edited');
            setErrorMessage('');
            setTimeout(() => {
              navigate('/');
            }, 2000); 
          }
          else{
            setSuccessMessage('');
            setErrorMessage('Failed to submit form data');
          }
        }).catch(error=>{
          setSuccessMessage('');
          setErrorMessage('Error occurred: ' + error.message);
        });
        
      }
      else{
        await axios.post('http://localhost/api/index.php', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then(response=>{
          if(response.status===200){
            console.log(response);
            setFormData({
              firstname: '',
              lastname: '',
              email: '',
              phone: '',
              city: '',
              address:'',
              password:''
            });
            if(signUp){
              setSuccessMessage('User Created successfully.');
              setErrorMessage('');
              setTimeout(() => {
                navigate('/user/login');
              }, 2000); 

            }
            else{
              setSuccessMessage('Form data submitted successfully. User Created');
              setErrorMessage('');
            }
          
            
          }
          else{
            setSuccessMessage('');
            setErrorMessage('Failed to submit form data');
          }
        }).catch(error=>{
          setSuccessMessage('');
          setErrorMessage('Error occurred: ' + error.message);
        });
        
      }

    
     
    } catch (error) {
      console.error('Error submitting form:', error.message);
    }
  };


  return (
    <div className='main'>
      <div className='form'>
      <div className='details'> 
        <h2>{hText}</h2>
        <div className='details-p'>
          <p>{text}</p>
        </div>
      </div>
      <div className='form-container'>
      <FormComponent 
        formData={formData}
        fields={fields}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
       {errorMessage && <p className="error-message">{errorMessage}</p>}
       {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    
    </div>
      
    </div>
   

  );
}

export default CreateUser;
