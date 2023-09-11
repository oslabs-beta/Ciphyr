import Navbar from "../layout/Navbar";
import Sidenav from "../layout/Sidenav";
import DashTable from "./DashTable";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="flex">
        <Sidenav />
        <div className="border-l border-slate-300 w-screen">
          <div className="flex flex-col items-start h-screen mt-20 ml-10rem mr-5">
            <DashTable />
          </div>
        </div>
      </div>
    </>
  );
}
