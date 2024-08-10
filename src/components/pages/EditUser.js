import React from 'react';
import './CreateUser.css';
import CreateUser from './CreateUser';
import { useParams } from 'react-router-dom';

function EditUser() {
  const { id } = useParams();
  return (
    <div>
      <CreateUser edit='true' userId={id}></CreateUser>
    </div>
  )
}

export default EditUser