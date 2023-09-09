import Navbar from './Navbar';
import Sidenav from './Sidenav'


export default function Dashboard() {




  return (
    <>
      <Navbar />
      <div className='flex'>
      <Sidenav />
      <div>
      <h1>dashboard</h1>
    </div>
      </div>
    </>
  )
}