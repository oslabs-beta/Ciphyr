import QuerySearchBar from '../common/QuerySearch';
import SuspiciousLog from '../dashboard/SuspiciousLog';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';

export default function Sidenav() {

// const [supiciousLogs, setSuspiciousLogs] = useState([])

// const renderLogs = suspiciousLogs.map(suspiciousLogs) => {
//   return
// }
  // fetch all of the queries
  // process into suspiciouLogsArr <- have backend take care of this
  //map over the array of suspicious objects

  

  return (
    <nav className='flex flex-col px-10 w-20rem h-screen'>
      {/* <div className="border-b mt-10 border-slate-400 py-3">
        <button>
          <QuerySearchBar />
        </button>
      </div> */}
      <div className='border-slate-400 mt-10 py-3 flex flex-col items-start'>
        {/* <button>Test</button> */}
        <details className='mb-32'>
          <summary className='m-1 btn list-none cursor-pointer'><FontAwesomeIcon className="mr-2 "icon={faEye} />Suspicious Queries</summary>
          <ul className='absolute p-2 bg-base-100 w-52 mt-4 space-y-8'>
           <SuspiciousLog/>
          </ul>
        </details>
      </div>
    </nav>
  );
}
