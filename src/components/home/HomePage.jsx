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
    console.log(now.getHours());
    console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
    if (hour > 3 && hour < 5) {
      return `Up early, or working late?`;
    } else if (hour >= 5 && hour < 12) {
      return `Good morning, ${user}`;
    } else if (hour >= 12 && hour < 16) {
      return `Good afternoon, ${user}`;
    } else if (hour >= 16 && hour < 21) {
      return `Good evening, ${user}`;
    } else {
      return `We hope you're enjoying, Ciphyr`;
    }
  };

  const getUsername = async () => {
    const response = await fetch("/api/user/getUserInfo");
    const result = await response.json();
    console.log("RESULT:", result);
    setUser(result);
  };

  useEffect(() => {
    getUsername();
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
        
      </div>
    </>
  );
}
