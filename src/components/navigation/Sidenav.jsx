import SuspiciousLog from "../dashboard/SuspiciousLog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { faTableList } from "@fortawesome/free-solid-svg-icons";
import { faCircleQuestion } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

import { useState } from "react";

export default function Sidenav(props) {
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
    <nav className="flex flex-col pl-6 pr-4 w-60 h-full ">
      <div className="flex flex-col justify-end">
        <div className="border-slate-400 mt-4 py-3 flex flex-col items-start">
          <h1 className="text-md w-full mb-5 text-slate border-b pb-3">
            Your Dashboard
          </h1>
          {/* <details className="mb-5 px-4 py-2 hover:bg-gray-100 hover:font-semibold rounded-md">
          <summary className="m-1 btn text-slate-700 hover:text-primary list-none cursor-pointer">
            <FontAwesomeIcon className="mr-2 " icon={faEye} />
            Suspicious Queries
          </summary>
          <ul className="absolute p-2 bg-base-100 w-52 mt-4 space-y-8">
            {queries}
          </ul>
        </details> */}
          <div
            onClick={() => props.toggleLogs()}
            className="font-lg mb-4 px-1 py-1 text-slate-900  hover:bg-gray-100 hover:text-primary rounded-md w-full cursor-pointer"
          >
            <FontAwesomeIcon icon={faTableList} /> Logs
          </div>
          <div
            onClick={() => props.toggleInsight()}
            className="font-lg mb-4 px-1 py-1 text-slate-900 hover:bg-gray-100 hover:text-primary rounded-md w-full cursor-pointer"
          >
            <FontAwesomeIcon icon={faChartLine} /> Insights
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="border mt-10 py-3 flex flex-col items-start">
          <div className="font-lg mb-4 py-1 text-slate-900 hover:bg-gray-100 hover:text-primary rounded-md w-full cursor-pointer">
            <a
              href="https://excalidraw.com/#room=dbe379f1b41fb715af36,kbu-9fyp1LDuPpKJNTyf4g"
              target="_blank"
            >
              <FontAwesomeIcon icon={faFileLines} />{" "}
              <span className="pl-2"> Documentation </span>
            </a>
          </div>
          <div className="font-lg py-1 mb-4 text-slate-900  hover:bg-gray-100 hover:text-primary rounded-md w-full">
            <FontAwesomeIcon icon={faCircleQuestion} />{" "}
            <span className="pl-2"> Feedback </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
