import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
const navigate = useNavigate()

const handleLogout = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/auth/logout');
   console.log(response.data)
  navigate("/login")
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  return (
    <div>
        <button
        onClick={handleLogout}
        className='py-2 px-2 bg-red-800 rounded'
        >Logout</button>
    </div>
  )
}

export default Home