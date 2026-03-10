import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";

import {  toast } from 'react-toastify';

function Registration() {


    const [userName, setUserName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
const response = await axios.post("http://localhost:3000/api/auth/register",{
    userName,
    phone: phoneNumber,
    email,
    password
})
console.log(response.data)
toast.success("Registration sucessfull pleace verify your email")
navigate("/login")
    }

  return (
    <div className='flex flex-col items-center justify-center w-full h-screen gap-3'>
        <h1>Registration</h1>
        <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <input type="text" placeholder='Enter Your Name' className='w-[20rem] border-2 border-gray-300 rounded-md p-2'
            value={userName}
            onChange={(e)=>{
                setUserName(e.target.value)
            }}
            />
            <input type="text" placeholder='Enter Your phoneNumber' className='w-[20rem] border-2 border-gray-300 rounded-md p-2' 
            value={phoneNumber}
            onChange={(e)=>{
                setPhoneNumber(e.target.value)
            }}
            />
            <input type="text" placeholder='Enter Your Email' className='w-[20rem] border-2 border-gray-300 rounded-md p-2' 
            value={email}
            onChange={(e)=>{
                setEmail(e.target.value)
            }}
            />
            <input type="text" placeholder='Enter Your password' className='w-[20rem] border-2 border-gray-300 rounded-md p-2' 
            value={password}
            onChange={(e)=>{
                setPassword(e.target.value)
            }}
            />
    <button className='bg-blue-500 text-white p-2 rounded-md active:scale-95'>Register</button>
        </form>
        <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Registration
