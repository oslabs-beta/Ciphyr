import QuerySearchBar from "../common/QuerySearch";
import SuspiciousLog from "../dashboard/SuspiciousLog";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faFileLines } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from "react-router-dom";

import { useState } from "react";
import data from "./MOCKdb.json";

export default function Sidenav() {
  // const [supiciousLogs, setSuspiciousLogs] = useState([])

  // const renderLogs = suspiciousLogs.map(suspiciousLogs) => {
  //   return
  // }
  // fetch all of the queries
  // process into suspiciouLogsArr <- have backend take care of this
  //map over the array of suspicious objects
  const queries = data.map((query) => {
    return (
      <SuspiciousLog
        id={query.id}
        depth={query.depth}
        latency={query.latency}
      />
    );
  });

  return (
    <nav className="flex flex-col px-10 w-20rem h-screen">
      {/* <div className="border-b mt-10 border-slate-400 py-3">
        <button>
          <QuerySearchBar />
        </button>
      </div> */}
      <div className="border-slate-400 mt-10 py-3 flex flex-col items-start">
        <h1 className="text-md w-full mb-5 text-slate border-b pb-3">Data</h1>
        {/* <button>Test</button> */}
        <details className="mb-5 px-4 py-2 hover:bg-gray-100 hover:font-semibold rounded-md">
          <summary className="m-1 btn text-slate-700 hover:text-primary list-none cursor-pointer">
            <FontAwesomeIcon className="mr-2 " icon={faEye} />
            Suspicious Queries
          </summary>
          <ul className="absolute p-2 bg-base-100 w-52 mt-4 space-y-8">
            {queries}
          </ul>
        </details>
        <h1 className="font-lg mb-2 text-slate-900 px-4 py-4 hover:bg-gray-100 hover:text-primary rounded-md w-full">
          <FontAwesomeIcon icon={faChartLine} /> Insights
        </h1>
        <a
          className="font-lg mb-2 text-slate-900 px-4 py-4 hover:bg-gray-100 hover:text-primary  rounded-md w-full"
          href="https://excalidraw.com/#room=dbe379f1b41fb715af36,kbu-9fyp1LDuPpKJNTyf4g"
          target="_blank"
        >
          <FontAwesomeIcon icon={faFileLines} /> Documentation
        </a>
        <h1 className="font-lg mb-2 text-slate-900 px-4 py-4 hover:bg-gray-100 hover:text-primary rounded-md w-full">
          More
        </h1>
      </div>
    </nav>
  );
}
