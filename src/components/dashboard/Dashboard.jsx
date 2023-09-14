import Navbar from "../layout/Navbar";
import Sidenav from "../layout/Sidenav";
import DashTable from "./DashTable";
import { useState } from "react";
import InputInstance from 'react';

export default function Dashboard() {
  //const [tableRows, setTableRows] = useState('')

  // change variable name
  const [apiKey, setApiKey] = useState("");

  const getApiKey = (e) => {
    const apiKey = e.target.value;
    setApiKey(apiKey);
  };
  
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidenav />

        <div className="border-l bg-stone-50 border-slate-300 w-full">
          {/* <div>Your logs</div> */}
          <h1 className="ml-20 mt-10 font-semibold text-xl">Recent activity</h1>

          <div className="relative flex flex-col items-start mt-5 ml-5rem mr-8 w-2/3">
            <DashTable />
            {/* <InputInstance setTableRows={setTableRows}/> */}
          </div>
        </div>
      </div>
    </>
  );
}
