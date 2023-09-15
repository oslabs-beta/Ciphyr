import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./components/home/HomePage.jsx/";
import Dashboard from "./components/dashboard/Dashboard.jsx";
import LoginV2 from "./components/auth/LoginV2.jsx";
import SignupV2 from "./components/auth/SignupV2.jsx";
import InputInstance from "./components/dashboard/InputInstance.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/" element={<LoginV2 />}></Route>
          <Route path="/signup" element={<SignupV2 />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
