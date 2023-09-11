import InstanceTable from "./InstanceTable.jsx";
import CreateInstance from "./CreateInstance.jsx";
import NavBar from "../layout/Navbar.jsx";
import Sidenav from "../layout/Sidenav";

export default function Homepage() {
  return (
    <>
      <NavBar />
      <div className="flex">
        <span className ="border-l border-slate-300">
          <main className="flex flex-col items-start h-screen mt-20 ml-20rem">
            <div className="shadow p-4 rounded-lg w-50rem ">
              <section>
                <div className="text-3xl subpixel-antialiased font-semibold">
                  Connection Keys
                </div>
                <div className="mt-5 mb-5">
                  <p>
                    {" "}
                    Your secret connection keys are listed below. Please note that we
                    do not display your secret API keys again after you generate
                    them{" "}
                  </p>
                  <p className="mt-5">
                    {" "}
                    Do not share your connection key with others, or expose it in the
                    browser or other client-side code. In order to protect the
                    security of your account, Ciphyr may also automatically
                    disable any connection key that we have found has leaked publicly.
                  </p>
                </div>
              </section>
              <div>
                <InstanceTable />
              </div>
              <div>
                <CreateInstance />
              </div>
            </div>
          </main>
        </span>
      </div>
    </>
  );
}
