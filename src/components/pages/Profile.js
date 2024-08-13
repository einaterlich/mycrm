import React from 'react'
import './Profile.css'
import { useState,useEffect } from 'react';
import axios from 'axios';
import { Button } from '../Button';
import { useNavigate } from "react-router-dom";

function Profile({ isLoggedIn, idUser }) {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      city: '',
      address: '',
    });
    
      

    useEffect(() => {
        if (isLoggedIn && idUser) {
            // Fetch user data only if logged in and idUser is available
           const getUser = async () => {
                 try {
                     const response = await axios.get(`http://localhost/api/index.php/${idUser}/profile`);
                     setUserData({
                        firstname: response.data.first_name || '',
                         lastname: response.data.last_name || '',
                         email: response.data.email || '',
                         phone: response.data.phone || '',
                         city: response.data.city || '',
                         address: response.data.address || '',
                     });
                 } catch (error) {
                     console.error('Error while getting the data of the user.', error);
                 }
             };

            getUser();
         } 
     }, [isLoggedIn, idUser, navigate]);

   

  return (
        <>
        {isLoggedIn?(
            <div className='profile-container'>
            <h1>Welcome, {userData.firstname}!</h1>
           <div className='section1'>
               <div className='profile-details'>
                   <p><strong>First Name:</strong> {userData.firstname}</p>
                   <p><strong>Last Name:</strong> {userData.lastname}</p>
                   <p><strong>Email:</strong> {userData.email}</p>
                   <p><strong>Phone:</strong> {userData.phone}</p>
                   <p><strong>Address:</strong> {userData.address}</p>
               </div>
          </div>
         <div className='section2'>
         <Button
           className='btns'
           buttonStyle='btn--outlineWhite'
           buttonSize='btn--large'
           onClick={()=>navigate(`/user/${idUser}/edit`)}
         >
           Edit Profile
         </Button>
         </div>
   
       </div>

        ):(
            <div>
                <p>error. you dont have permmission</p>
            </div>

        )
        }
        </>
      
    )
      
}

export default Profile
