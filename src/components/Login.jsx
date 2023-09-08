import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'




export default function Login() {
  const [email, setEmail] = useState('')

  

  return (
    <>
    <div className='flex justify-center items-center h-screen bg-indigo-500'>
      <div className='flex flex-col bg-white p-10 rounded-md shadow-md'>
        <h1 className='text-2xl block text-center m-2'><FontAwesomeIcon icon={faUser} />Login below</h1>
        <label htmlFor='email'>Email</label>
        <input id='email' className='m-2 border-2 rounded-md px-4 py-2' type='text' placeholder='Email'/>
        <label htmlFor='Password'>Password</label>
        <input id='Password' className='m-2 border-2  rounded-md px-4 py-2' type='password' placeholder='Password' />
        <button className='bg-indigo-500 text-white p-2 w-1/2 rounded-md hover:bg-indigo-700'>Log in</button>
      </div>
    </div>
    {/* <div className='flex justify-center items-center border-8 w-1/2 h-96'>
    <div className='bg-slate-50'>
      <h1>Login</h1>
      <input className='m-3' type='text' placeholder='Email' />
      <input className='m-3' type='text' placeholder='Password' />
      <button className='bg-cyan-500 text-white px-10 py-1 rounded'>Log in</button>
     </div>
     </div> */}
    </>
  )
}