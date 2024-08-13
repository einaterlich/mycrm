import React from 'react';
import './CreateUser.css';
import CreateUser from './CreateUser';
import { useParams } from 'react-router-dom';

function EditUser({idUser}) {
  const { id } = useParams();
  return (
    <div>
      <CreateUser edit='true' userId={id ?? idUser}></CreateUser>
    </div>
  )
}

export default EditUser