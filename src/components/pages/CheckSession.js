import React from 'react'
import { useState } from 'react'

function CheckSession() {
    const[token,setToken]=useState[false];
    async function getToken(){
        await axios.get('http://localhost/api/sessionCheck.php')
        .then(response=>{
          if (response.data.status='succees'){
            setToken(true)
          }
        }).catch(error=>{
          console.log("error while fetching the data session.",error);
        });
      }


    

  return (
    token
  )
}

export default CheckSession