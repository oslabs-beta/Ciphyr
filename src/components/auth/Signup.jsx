import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";
import DashboardImage from "../../assets/Dashboard.png";
import { useNavigate } from "react-router-dom";
import ciphyrLogo from "../../assets/ciphyrLogo.png";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate("");

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

  const getUsername = (e) => {
    const username = e.target.value;
    console.log(username);
    setUsername(username);
  };

  const signup = async () => {
    const response = await fetch("/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    navigate("/login");
    console.log("data in signup", data);
  };

  return (
    <>
      <div className="min-h full flex flex-col">
        <div className="flex flex-col flex-1 bg-scale-100">
          <div className="absolute top-0 w-full px-8 pt-4 mx-auto">
            <nav className="relative flex justify-between">
              <img src={ciphyrLogo} className="w-[200px]" />
            </nav>
          </div>
          <div className="flex flex-1 ">
            <main className=" flex flex-col flex-shrink-0 items-center border-r border-slate-200 w-2/5 md:h-full lg:h-screen px-5 pt-32 shadow">
              <section className="flex-1 flex flex-col justify-center w-2/3">
                <div>
                  <h1 className="text-3xl text-slate-800 mb-2">Get started</h1>
                  <h2 className="text-l text-slate-500">
                    Create a new account
                  </h2>
                </div>
                <div className="flex flex-col gap-5">
                  <button className="flex items-center justify-center border border-slate-300 rounded-md my-5 py-2 px-4 hover:bg-slate-100">
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faGoogle}
                      style={{ color: "#000000" }}
                    />
                    <span className="border-slate-200 ">
                      Sign Up With Google
                    </span>
                  </button>
                </div>
                <div id="orLine" className="relative mb-12">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-1/2 border-t border-scale-00"></div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 text-sm bg-scale-200 text-scale-1200">
                        or
                      </span>
                    </div>
                    <div className="w-1/2 border-t border-scale-00"></div>
                  </div>
                </div>{" "}
                <div className="flex flex-col gap-5 mb-8" id="logIn">
                  <div>
                    <div className="flex flex-row space-x-2 justify-between">
                      <label
                        className="text-sm mb-1 text-slate-500"
                        htmlFor="email"
                      >
                        Email
                      </label>
                    </div>
                    <div id="email" className="mb-4">
                      <input
                        id="email"
                        onChange={getEmail}
                        className="border-2 rounded-md px-4 py-2 block w-full placeholder:text-xs"
                        type="text"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div className="flex flex-row space-x-2 justify-between">
                      <label
                        className="text-sm mb-1 text-slate-500"
                        htmlFor="email"
                      >
                        Username
                      </label>
                    </div>
                    <div id="user" className="mb-4">
                      <input
                        id="user"
                        onChange={getUsername}
                        className="border-2 rounded-md px-4 py-2 block w-full placeholder:text-xs"
                        type="text"
                        placeholder="username"
                      />
                    </div>

                    <div className="flex flex-row space-x-2 justify-between">
                      <label
                        className="text-sm mb-1 text-slate-500"
                        htmlFor="Password"
                      >
                        Password
                      </label>
                    </div>
                    <input
                      id="Password"
                      onChange={getPassword}
                      className="border-2 rounded-md px-4 py-2 block w-full placeholder:text-xs"
                      type="password"
                      placeholder="●●●●●●●"
                    />
                  </div>
                </div>
                <div>
                  <button
                    onClick={signup}
                    className="text-white p-2 w-full rounded-md bg-sky-600 hover:bg-sky-700 mb-4"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="self-center">
                  <div>
                    <span className="text-scale-1000">
                      Already have an account?
                    </span>
                    <a
                      className="ml-2 underline transition text-slate-400 hover:text-slate-300"
                      onClick={() => navigate("/login")}
                    >
                      {"Sign In Now"}
                    </a>
                  </div>
                </div>
                <div className="mt-[6em] py-4 flex flex-col bottom-0 text-center text-xs text-slate-500 italic">
                  <p>
                    By continuing, you agree to Ciphyer's Terms of Service and
                    Privacy Policy, and to receive periodic emails with updates.
                  </p>
                </div>
              </section>
            </main>
            <aside className="flex flex-col items-center justify-center w-3/4">
              <div className="relative text-4xl text-slate-600 font-serif italic ml-20 mb-12 w-3/4">
                <div className="-left-8 -top-10 z-[0] absolute text-7xl font-serif italic text-slate-500">
                  "
                </div>
                {"We can scale much more confidently with Ciphyr"}
              </div>
              <div className="flex justify-end items-center ml-5 mt-6 top text-2xl text-slate-500 font-serif italic w-3/4">
                <img
                  className="w-12 h-12 rounded-full mx-4"
                  src="https://media.licdn.com/dms/image/C5603AQG5zLxbpKQA7w/profile-displayphoto-shrink_800_800/0/1593130186582?e=1701302400&v=beta&t=NDpvMXDVv2GeZ2r1SNtzxhSp9hdPanssU6hHmEktZq0"
                />
                <div>@anonymous_user</div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
