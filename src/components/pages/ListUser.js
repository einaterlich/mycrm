import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react";
import Table from '../Table';
import './ListUser.css'


function ListUser() {
  const [users,setUsers]=useState([]);
  useEffect(() => {getUsers();}, []);
  

  async function getUsers(){
    await axios.get('http://localhost/api/index.php')
    .then(response=>{
      console.log(response.data);
      setUsers(response.data);
    }).catch(error=>{
      console.log("error while getting the data.",error);
    });
  }
  async function handleDelete(id) {
    try {
     const response = await axios.delete(`http://localhost/api/index.php/${id}/delete`);
     console.log(response.data);
     getUsers(); // Refresh the data
    } catch (error) {
      console.error("Error while deleting the user:", error);
    }
}



//   const deleteUser = (id) => {
//     axios.delete(`http://localhost:8888/api/user/${id}/delete`).then(function(response){
//         console.log(response.data);
//         getUsers();
//     });
// }
  
  return (
    <div className='main-conatiner'>
      <h1>List of users</h1>
      <Table data={users} onDelete={handleDelete} ></Table>
    </div>
    
  )
}

export default ListUser