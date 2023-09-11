import { useNavigate } from 'react-router-dom';

export default function Navbar() {
   const navigate = useNavigate()


  return (
    <>
    <nav className='flex mx-16 py-6 border-b'>
      <div>
        <h1 className='font-bold cursor-pointer' >Ciphyr</h1>
      </div>
      <div className='ml-12 mr-auto' >
        <ul className='flex gap-10' >
          <li>
            <a onClick={() => navigate('/dashboard')} className='text-slate-800 hover:text-slate-500 cursor-pointer' >Dashboard</a>
          </li>
          <li>
            <a onClick={() => navigate('/')} className='text-slate-800 hover:text-slate-500 cursor-pointer' >Instances</a>
          </li>
          <li>
            <a className='text-slate-800 hover:text-slate-500 cursor-pointer' target='_blank' rel='noreferrer' href='https://github.com/Ciphyr-OSP4/cipher-demo'>Documentation</a>
          </li>
        </ul>
      </div>
      <div className='flex'>
        <img className='w-8' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQCX5_wYEa6hyWoqSBOaPbaHw5Ff8Ljp0WcA&usqp=CAU'/>
        <button className='text-slate-800 hover:text-slate-500' >Profile</button>
      </div>
    </nav>
    </>
  )
}