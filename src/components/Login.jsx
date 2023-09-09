import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'




export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const getEmail = (e) => {
     const email = e.target.value;
     console.log(email);
     setEmail(email)
  }

  const getPassword = (e) => {
    const password = e.target.value;
    console.log(password);
    setPassword(password)
  }

  const validate = async () => {
    const response = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email: email, password: password})
    });

    console.log(response);

  }


  return (
    <>
    <div className='flex justify-center items-center h-screen bg-sky-800'>
      <div className='flex bg-white rounded-md shadow-lg'>
      <div className='p-10'>
        <h1 className='mb-16 font-bold'>Ciphyr</h1>
        <h1 className='text-xl block w-96'>Monitoring Tool Protecting Your Company One Query At A Time</h1>
        <p className='text-slate-500 mb-5 mt-5'>Welcome back, please login to your account<FontAwesomeIcon icon={faUser} /></p>
        <label htmlFor='email'>Email</label>
        <input id='email' onChange={getEmail} className='m-2 border-2 rounded-md px-4 py-2 block w-3/4' type='text' placeholder='Email'/>
        <label htmlFor='Password'>Password</label>
        <input id='Password' onChange={getPassword} className='m-2 border-2  rounded-md px-4 py-2 block w-3/4' type='password' placeholder='Password' />
        <div className='mt-10'>
        <button onClick={validate} className='bg-sky-800 text-white p-2 w-1/4 rounded-md hover:bg-sky-900'>Log in</button>
        <button className='bg-white text-sky-800 p-2 w-1/4 border border-sky-800 rounded-md hover:bg-sky-800 hover:text-white'>Sign up</button>
        </div>
      </div>
      <div className='p-5'>
        <img className='rounded-md'src='https://www.ncsc.gov.uk/images/cyber_data.jpg?mpwidth=545&mlwidth=737&twidth=961&dwidth=618&dpr=2.625&width=412' />
      </div>
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


{/* <div className='flex justify-center items-center h-screen bg-indigo-500'>
<div className=' bg-white p-10 rounded-md shadow-md w-96'>
  <h1 className='mb-16 font-bold'>Ciphyr</h1>
  <h1 className='text-xl block'>Monitoring Tool Protecting Your Company One Query At A Time</h1>
  <p className='text-slate-400 mb-5 mt-5'>Welcome back, please login to your account<FontAwesomeIcon icon={faUser} /></p>
  <label htmlFor='email'>Email</label>
  <input id='email' className='m-2 border-2 rounded-md px-4 py-2 block' type='text' placeholder='Email'/>
  <label htmlFor='Password'>Password</label>
  <input id='Password' className='m-2 border-2  rounded-md px-4 py-2 block' type='password' placeholder='Password' />
  <div className='mt-10'>
  <button className='bg-indigo-500 text-white p-2 w-1/2 rounded-md hover:bg-indigo-700'>Log in</button>
  <button className='bg-white text-indigo-500 p-2 w-1/2 border border-indigo-500 rounded-md hover:bg-indigo-700'>Sign up</button>
  </div>
</div>
<div className='flex flex-col p-10 bg-white rounded-md'>
  <img src='https://www.ncsc.gov.uk/images/cyber_data.jpg?mpwidth=545&mlwidth=737&twidth=961&dwidth=618&dpr=2.625&width=412' />
</div>
</div> */}