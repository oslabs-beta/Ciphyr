import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import DashboardImage from "../../assets/Dashboard.png";
import { useNavigate } from "react-router-dom";
import ciphyrLogo from "../../assets/ciphyrLogo.png";

export default function LoginV2() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

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
    try {
      const response = await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input: email, password: password }),
      });
      const parsed = await response.json();
      if (parsed.verified === true) {
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="min-h full flex flex-col">
        <div className="flex flex-col flex-1 bg-scale-100">
          <div className="absolute top-0 w-full px-8 pt-6 mx-auto">
            <nav className="relative flex justify-between">
              <img src={ciphyrLogo} className="w-[200px]"/>
              <div>dark mode</div>
            </nav>
          </div>
          <div className="flex flex-1">
            <main className="flex flex-col flex-shrink-0 items-center border-r border-slate-200 w-2/5 h-screen px-5 pt-16 shadow-lg">
              <section className="flex-1 flex flex-col justify-center w-2/3">
                <div>
                  <h1 className="text-3xl text-slate-800 mb-2">Welcome back</h1>
                  <h2 className="text-l text-slate-500">
                    Sign in to your account
                  </h2>
                </div>
                <div className="flex flex-col gap-5 mb-5">
                  <button className="flex items-center justify-center border border-slate-300 rounded-md my-5 py-2 px-4 hover:bg-slate-100">
                    <FontAwesomeIcon
                      className="mr-2"
                      icon={faGithub}
                      style={{ color: "#000000" }}
                    />
                    <span className="border-slate-200 ">
                      Continue with GitHub
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
                </div>
                <div className="flex flex-col gap-5 mb-8" id="logIn">
                  <div>
                    <div className="flex flex-row space-x-2 justify-between">
                      <label
                        className="text-sm mb-1 text-slate-500"
                        htmlFor="email"
                      >
                        Username or Email
                      </label>
                    </div>
                    <div id="user" className="mb-4">
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
                        htmlFor="Password"
                      >
                        Password
                      </label>
                      <span className="text-xs text-slate-500 italic">
                        Forgot Password?
                      </span>
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
                    onClick={validate}
                    className="text-white p-2 w-full rounded-md bg-sky-600 hover:bg-sky-700 mb-4"
                  >
                    Sign in
                  </button>
                </div>
                <div className="self-center">
                  <div>
                    <span className="text-scale-1000">
                      Don't have an account?
                    </span>
                    <a
                      className="ml-2 underline transition text-slate-400 hover:text-slate-300"
                      onClick={() => navigate("/signup")}
                    >
                      {"Sign Up Now"}
                    </a>
                  </div>
                </div>
                <div className="mt-10rem flex flex-col bottom-0 text-center text-xs text-slate-500 italic">
                  <p>
                    By continuing, you agree to Ciphyer's Terms of Service and
                    Privacy Policy, and to receive periodic emails with updates.
                  </p>
                </div>
              </section>
            </main>
            <aside className="flex flex-col items-center justify-center w-3/4">
              <div className="relative text-4xl text-slate-600 font-serif italic ml-20 mb-12 w-3/4">
                <div className="-left-8 -top-10 z-[0] absolute text-8xl font-serif italic text-slate-500">
                  "
                </div>
                {
                  "Ciphyr changed me..."
                }
              </div>
              <div className="flex justify-end items-center ml-5 mt-6 top text-2xl text-slate-500 font-serif italic w-3/4">
                <img
                  className="w-12 h-12 rounded-full mx-4"
                  src="https://media.licdn.com/dms/image/C4D03AQG2XwBr2rylkg/profile-displayphoto-shrink_800_800/0/1572454199260?e=1700092800&v=beta&t=I2J8vm4K3mzwIEDvxOtxNt2o1sG6FVbOh__2dcEhi9w"
                />
                <div>@not_philtroutman</div>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 *                   src="https://media.licdn.com/dms/image/C4D03AQG2XwBr2rylkg/profile-displayphoto-shrink_800_800/0/1572454199260?e=1700092800&v=beta&t=I2J8vm4K3mzwIEDvxOtxNt2o1sG6FVbOh__2dcEhi9w"
 *
 */
