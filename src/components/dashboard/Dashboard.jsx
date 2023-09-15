import Navbar from "../layout/Navbar";
import Sidenav from "../layout/Sidenav";
import DashTable from "./DashTable";
import { useState, useEffect, useMemo } from "react";
import InputInstance from "react";
import EmptyMessage from "../common/EmptyMessage";

export default function Dashboard() {
  //const [tableRows, setTableRows] = useState('')

  // change variable name
  const [apiKey, setApiKey] = useState("");
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    console.log("in try block");
    try {
      const response = await fetch("/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: "04ffad9d-73ed-4d44-9e6a-3cbf2db31d2",
        }),
      });
      if (!response.ok) {
        throw new Error(`Server side error. Status: ${response.status}`);
      }
      const data = await response.json();
      setTableRows(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const getApiKey = (e) => {
    const apiKey = e.target.value;
    setApiKey(apiKey);
  };

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidenav />

        <div className="border-l bg-stone-50 border-slate-300 w-full h-screen">
          {/* <div>Your logs</div> */}
          <h1 className="ml-20 mt-10 font-semibold text-2xl">Recent activity</h1>

          {tableRows.length === 0 ? <DashTable /> : <DashTable />}
          {/* <InputInstance setTableRows={setTableRows}/> */}
        </div>
      </div>
    </>
  );
}
