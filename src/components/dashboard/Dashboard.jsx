import Navbar from "../layout/Navbar";
import Sidenav from "../layout/Sidenav";
import DashTable from "./DashTable";
import { useState } from "react";

export default function Dashboard() {

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

        <div className="border-l bg-stone-50 border-slate-300 w-screen">
          {/* <div>Your logs</div> */}
          <h1 className="ml-20 mt-10 font-semibold text-xl">Recent activity</h1>

          <div className="flex flex-col items-start h-screen mt-5 ml-5rem mr-8">
            <div>
              <input
                id="apiKey"
                onChange={getApiKey}
                className="border-2 rounded-md px-4 py-2 block w-full placeholder:text-xs"
                type="text"
                placeholder="apiKey"
              />
            </div>
            <DashTable />
          </div>
        </div>
      </div>
    </>
  );
}
