import Navbar from "../navigation/Navbar";
import Sidenav from "../navigation/Sidenav";
import { useState, useEffect, useMemo } from "react";
import InputInstance from "react";
import ChartContainer from './charts/ChartContainer.jsx';
import MainTable from './MainTable.jsx'


export default function DashContainer() {
  const [insight, setInsight] = useState(false);
  const [instance, setInstance] = useState('')

  //toggles insight state to change dashboard from MainTable display to insights tab
  // future fix: need to make this not a toggle and make it actually route to the insights tab
  const toggleInsight = () => {
    setInsight(true);
  }

  const toggleLogs = () => {
    setInsight(false);
  }

  // contains our navbar, sidenav, and passes state through sideNav. also conditionally renders our MainTable depending our Instance State

  return (
    <>
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex w-full h-full w-screen mb-0 mt-0">
        <Sidenav toggleInsight={toggleInsight} toggleLogs={toggleLogs} instance={instance}/>
        <div className=" border-l bg-stone-50 border-slate-300 w-full">
          {insight ?
          <ChartContainer instance={instance}/> : <MainTable instance={instance} setInstance={setInstance}/>
          }
        </div>
      </div>
    </div>
    </>
  );
}
