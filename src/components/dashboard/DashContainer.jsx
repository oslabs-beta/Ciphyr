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
    console.log('clicked')
    setInsight(!insight);
  }

  // contains our navbar, sidenav, and passes state through sideNav. also conditionally renders our MainTable depending our Instance State

  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidenav toggleInsight={toggleInsight} />
        <div className="border-l bg-stone-50 border-slate-300 w-full h-screen">
          <h1 className="ml-20 mt-10 font-semibold text-2xl">Recent activity</h1>
          {insight ?
          <ChartContainer instance={instance}/> : <MainTable instance={instance} setInstance={setInstance}/>
          }
        </div>
      </div>
    </>
  );
}
