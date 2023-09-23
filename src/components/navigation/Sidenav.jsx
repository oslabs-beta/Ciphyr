import SuspiciousLog from "../dashboard/SuspiciousLog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";


import { useState } from "react";

export default function Sidenav(props) {

  const insights = () => {
    if (props.instance === '') {
      alert('Please choose an instance')
    } else {
      props.toggleInsight()
    }

  }

/** WORK IN PROGRESS - suspicious queries component
 * remember to import at the top --> import data from './MOCKdb.json'
 *  const [supiciousLogs, setSuspiciousLogs] = useState([])

  const renderLogs = suspiciousLogs.map(suspiciousLogs) => {
    return
  }
  fetch all of the queries
  process into suspiciouLogsArr <- have backend take care of this
  map over the array of suspicious objects

  const queries = data.map((query) => {
    return (
      <SuspiciousLog
        id={query.id}
        depth={query.depth}
        latency={query.latency}
      />
    );
  });

 */


  return (
    <nav className="flex flex-col px-10 w-56 h-screen">
      <div className="border-slate-400 mt-10 py-3 flex flex-col items-start">
        <h1 className="text-md w-full mb-5 text-slate border-b pb-3">Data</h1>
        {/* <details className="mb-5 px-4 py-2 hover:bg-gray-100 hover:font-semibold rounded-md">
          <summary className="m-1 btn text-slate-700 hover:text-primary list-none cursor-pointer">
            <FontAwesomeIcon className="mr-2 " icon={faEye} />
            Suspicious Queries
          </summary>
          <ul className="absolute p-2 bg-base-100 w-52 mt-4 space-y-8">
            {queries}
          </ul>
        </details> */}
        <h1 onClick={() => props.toggleLogs()} className="font-lg mb-4 px-1 py-1 text-slate-900  hover:bg-gray-100 hover:text-primary rounded-md w-full cursor-pointer">
        <FontAwesomeIcon icon={faTableList} /> Logs
        </h1>
        <h1 onClick={insights} className="font-lg mb-4 px-1 py-1 text-slate-900  hover:bg-gray-100 hover:text-primary rounded-md w-full cursor-pointer">
          <FontAwesomeIcon icon={faChartLine} /> Insights
        </h1>
        <a
          className="font-lg mb-4 px-1 py-1 text-slate-900 hover:bg-gray-100 hover:text-primary  rounded-md w-full"
          href="https://excalidraw.com/#room=dbe379f1b41fb715af36,kbu-9fyp1LDuPpKJNTyf4g"
          target="_blank"
        >
          <FontAwesomeIcon icon={faFileLines} /> Docs
        </a>
        <h1 className="font-lg px-1 py-1 mb-4 text-slate-900  hover:bg-gray-100 hover:text-primary rounded-md w-full">
          More
        </h1>
      </div>
    </nav>
  );
}
