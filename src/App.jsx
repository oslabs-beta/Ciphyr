import { BrowserRouter, Routes, Route } from "react-router-dom";

//import BeforeHome from "./components/home/BeforeHome";
import HomePage from "./components/home/HomePage.jsx/";
import Dashboard from "./components/dashboard/DashContainer.jsx";
import Login from "./components/auth/Login.jsx";
import Signup from "./components/auth/Signup.jsx";
import SplashPage from "./components/splashPage/splashContainer.jsx";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashPage />}></Route>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
