import InstanceTable from "./InstanceTable.jsx";
import CreateInstance from "./CreateInstance.jsx";
import NavBar from "../layout/Navbar.jsx";
import Sidenav from "../layout/Sidenav";
import InstanceModal from './InstanceModal'
import ApiModal from './ApiModal'
import { useState } from 'react'

export default function Homepage() {
  const [modal, setModal] = useState(false);
  const [API, setAPI] = useState(false);
  const [apiKey, setApiKey] = useState('')

  const toggleModal = () => {
    setModal(!modal);
  }

  const toggleAPI = () => {
    setAPI(!API);
  }


  return (
    <>
      <NavBar />
      <div>
        { modal ? <InstanceModal setApiKey={setApiKey} toggleAPI={toggleAPI} toggleModal={toggleModal}/> : '' }
        { API ? <ApiModal apiKey={apiKey} setApiKey={setApiKey} toggleAPI={toggleAPI} /> : '' }
      </div>
      <div className="bg-gradient-to-t from-custom-start to-custom-end  h-screen flex flex-auto">
        <span className ="border-l border-slate-300 w-full">
          <main className="flex flex-2 flex-col items-center my-12">
            <div className="shadow p-4 bg-white rounded-lg w-2/3">
              <section>
                <div className="text-3xl subpixel-antialiased font-semibold">
                  Connection Keys
                </div>
                <div className="mt-5 mb-5 text-slate-600">
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
                <CreateInstance toggleModal={toggleModal}/>
              </div>
            </div>
          </main>
        </span>
      </div>
    </>
  );
}
