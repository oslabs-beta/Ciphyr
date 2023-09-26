import Navbar from "../navigation/Navbar";
import Sidenav from "../navigation/Sidenav";
import { useState, useEffect, useMemo } from "react";
import InputInstance from "react";
import ChartContainer from './charts/ChartContainer.jsx';
import MainTable from './MainTable.jsx'
import Alerts from './Alerts.jsx'


export default function DashContainer() {
  const [activeTab, setActiveTab] = useState('table');
  const [instance, setInstance] = useState('');

  //rendering specific container in dashboard based upon the activeTab state
  const content = () => {
    if (activeTab === 'table') {
      return <MainTable instance={instance} setInstance={setInstance}/>
    } else if (activeTab === 'insights') {
      return <ChartContainer instance={instance}/>
    } else if (activeTab === 'alerts') {
      return <Alerts />
    }
  }

  return (
    <>
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex w-full h-full w-screen mb-0 mt-0">
        <Sidenav setActiveTab={setActiveTab}/>
        <div className=" border-l bg-stone-50 border-slate-300 w-full">
          {content()}
        </div>
      </div>
    </div>
    </>
  );
}
