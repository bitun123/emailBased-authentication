import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import {  toast } from 'react-toastify';

function Login() {




const [email, setemail] = useState("")
const [password, setpassword] = useState("")

  const navigate =   useNavigate()

const handleSubmit = async (e)=>{
e.preventDefault()

try {
    const response = await axios.post("http://localhost:3000/api/auth/login",{
    email,
    password
})
console.log(response.data)
toast.success("Login successful")
navigate("/")

} catch (error) {
    toast.error(error.response.data.message || "Login failed")
}

}

  return (
<div className='flex flex-col items-center justify-center w-full h-screen gap-3'>
    <h1>Login</h1>
    <form className='flex flex-col gap-4' 
    onSubmit={(e)=>{
        handleSubmit(e)
    }}
    >
        <input type="text" placeholder='Enter Your Email'
        value = {email}
        onChange={(e)=>{
            setemail(e.target.value)
        }}
className='w-[20rem] border-2 border-gray-300 rounded-md p-2'

        />
        <input type="text" placeholder='Enter Your password' 
        value = {password}
        onChange={(e)=>{
            setpassword(e.target.value)
        }}
className='w-[20rem] border-2 border-gray-300 rounded-md p-2'
        />
<button className='bg-blue-500 text-white p-2 rounded-md active:scale-95'>Login</button>
    </form>
    <p>Don't have an account? <Link to="/registration">Sign up</Link></p>
</div>
  )
}

export default Login