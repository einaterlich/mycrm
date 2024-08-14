import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react";
import Table from '../Table';
import './ListUser.css'


function ListUser({isAdminLoggedIn}) {
  const [users,setUsers]=useState([]);
  useEffect(() => {getUsers();}, []);
  

  async function getUsers(){
    try {
      if(isAdminLoggedIn){
        await axios.get('http://localhost/api/index.php')
        .then(response=>{
          setUsers(response.data);
        }).catch(error=>{
          console.log("error while getting the data.",error);
        });
      }
    }
   catch (error) {
    console.error("Error while deleting the user:", error);
  }
    
  }
  async function handleDelete(id) {
    try {
     const response = await axios.delete(`http://localhost/api/index.php/${id}/delete`);
     getUsers(); // Refresh the data
    } catch (error) {
      console.error("Error while deleting the user:", error);
    }
}

  return (
    <>
    {isAdminLoggedIn?(
      <div className='main-conatiner'>
      <h1>List of users</h1>
      <Table data={users} onDelete={handleDelete} ></Table>
    </div>
    ):(
      <div>
          <p>error. you dont have permmission</p>
      </div>

    )}
    
    </>
    
  )
}

export default ListUser