import Navbar from "../layout/Navbar";
import Sidenav from "../layout/Sidenav";
import DashTable from "./DashTable";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidenav />

        <div className="border-l bg-stone-50 border-slate-300 w-screen">
          {/* <div>Your logs</div> */}
          <h1 className='ml-20 mt-10 font-semibold text-xl' >Recent activity</h1>
          
          <div className="flex flex-col items-start h-screen mt-5 ml-5rem mr-8">
            <DashTable />
          </div>
        </div>
      </div>
    </>
  );
}
