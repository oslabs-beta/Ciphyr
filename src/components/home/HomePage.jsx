import InstanceTable from "../instances/InstanceTable.jsx";
import CreateInstance from "../instances/CreateInstance.jsx";
import NavBar from "../navigation/Navbar.jsx";
import Sidenav from "../navigation/Sidenav";
import CreateKeyModal from "../instances/CreateKeyModal";
import SaveKeyModal from "../instances/SaveKeyModal";
import ConnectionKeysCard from "../instances/ConnectionKeysCard.jsx";
import { useState, useEffect } from "react";

export default function Homepage() {
  const [modal, setModal] = useState(false);
  const [API, setAPI] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [user, setUser] = useState("");
  const [count, setCount] = useState(0);
  const [lastDate, setLastDate] = useState('');

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleAPI = () => {
    setAPI(!API);
  };
  const currentDate = () => {
    const currentDate = new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "short",
      day: "numeric",
    });
    console.log(currentDate);
    return currentDate;
  };

  const introMessage = () => {
    const now = new Date();
    const hour = now.getHours();
    let message = '';
    console.log(now.getHours());
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    if (hour > 3 && hour < 5) {
      message = `Up early, or working late?`;
    } else if (hour >= 5 && hour < 12) {
      message = `Good morning, ${user}`;
    } else if (hour >= 12 && hour < 16) {
      message = `Good afternoon, ${user}`;
    } else if (hour >= 16 && hour < 21) {
      message = `Good evening, ${user}`;
    } else {
      message = `We hope you're enjoying, Ciphyr`;
    }

    return message;
  };

  const getUsername = async () => {
    const response = await fetch("/api/user/getUserInfo");
    const result = await response.json();
    setUser(result);
  };

  const getLastDate = async () => {
    const response = await fetch('/api/user/getLastLogout');
    const result = await response.json();
    setLastDate(result);
  }
  
  const getLogCount = async () => {
    const response = await fetch('/api/log/getLogCount');
    const result = await response.json();
    setCount(result.count);
  }

  useEffect(() => {
    getUsername();
    getLastDate();
    getLogCount();
  }, []);



  return (
    <>
      <NavBar />
      <div>
        {modal ? (
          <CreateKeyModal
            setApiKey={setApiKey}
            toggleAPI={toggleAPI}
            toggleModal={toggleModal}
          />
        ) : (
          ""
        )}
        {API ? (
          <SaveKeyModal
            apiKey={apiKey}
            setApiKey={setApiKey}
            toggleAPI={toggleAPI}
          />
        ) : (
          ""
        )}
      </div>
      <div className="bg-gradient-to-t from-custom-start to-custom-end  h-screen flex flex-auto">
        <span className="border-l border-slate-300 w-full flex flex-col items-center">
          <div className="flex flex-col items-center my-10 w-1/2">
            <div className="text-slate-200 bg-slate-700 rounded-full text-lg drop-shadow-md px-6 py-2 my-4 ">
              {currentDate()}
            </div>
            <div className="text-slate-700">
              <h1 className="text-3xl text-slate-800 drop-shadow-sm mt-4">{introMessage()} </h1>
            </div>
            <div className="text-slate-700">
              <h1 className="text-3xl text-slate-800 drop-shadow-sm mt-4"> Last session: {lastDate} </h1>
            </div>
            <div className="text-slate-700">
              <h1 className="text-3xl text-slate-800 drop-shadow-sm mt-4">We've recorded {count} query logs </h1>
            </div>
          </div>
          <main className="flex flex-2 flex-col items-center my-8">
            <div className="shadow p-4 bg-white rounded-lg w-2/3">
              <ConnectionKeysCard />
              <div>
                <InstanceTable />
              </div>
              <div>
                <CreateInstance toggleModal={toggleModal} />
              </div>
            </div>
          </main>
        </span>
      </div>
    </>
  );
}
