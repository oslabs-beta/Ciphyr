import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './components/HomePage.jsx/';
import Dashboard from './components/Dashboard.jsx';
import Login from './components/Login.jsx';

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path = '/' element={<HomePage />}></Route>
          <Route path = '/dashboard' element={<Dashboard />}></Route>
          <Route path = '/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
