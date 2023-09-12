import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate('')

  const getEmail = (e) => {
    const email = e.target.value;
    console.log(email);
    setEmail(email);
  };

  const getPassword = (e) => {
    const password = e.target.value;
    console.log(password);
    setPassword(password);
  };

  const validate = async () => {
    const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: email, password: password }),
    });

    console.log(response);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-sky-900 to-sky-700">
        <div className="flex bg-white rounded-md w-3/4 shadow-lg">
          <div className="p-10">
            <h1 className="mb-20 font-bold">Ciphyr</h1>
            <h1 className="text-xl block w-96">
              Monitoring Tool Protecting Your Company One Query At A Time
            </h1>
            <p className="text-slate-500 mb-5 mt-5">
              Welcome back, please login to your account
              <FontAwesomeIcon icon={faUser} />
            </p>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              onChange={getEmail}
              className="m-2 border-2 rounded-md px-4 py-2 block w-3/4"
              type="text"
              placeholder="Email"
            />
            <label htmlFor="Password">Password</label>
            <input
              id="Password"
              onChange={getPassword}
              className="m-2 border-2  rounded-md px-4 py-2 block w-3/4"
              type="password"
              placeholder="Password"
            />
            <div className="mt-10">
              <button
                onClick={validate}
                className="bg-sky-800 text-white p-2 w-1/4 rounded-md hover:bg-sky-900"
              >
                Log in
              </button>
              <button onClick={() => navigate('/signup')} className="bg-white text-sky-800 p-2 w-1/4 border border-sky-800 rounded-md hover:bg-sky-800 hover:text-white">
                Sign up
              </button>
            </div>
          </div>
          <div className="p-5">
            <img
              className="rounded-md w-"
              src="https://media3.giphy.com/media/MFabj1E9mgUsqwVWHu/giphy.gif?cid=ecf05e47m78ogipv1cmt1r5ppx9gph5srzplgcpv03myowf6&ep=v1_gifs_search&rid=giphy.gif&ct=g"
            />
          </div>
        </div>
      </div>
    </>
  );
}
