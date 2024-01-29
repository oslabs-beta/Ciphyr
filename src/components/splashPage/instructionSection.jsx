import { useState, useRef } from "react";
import CopyableCodeSnippet from "./copySnippet";
import ciphyrLogo from "../../assets/ciphyrLogo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { faClipboard } from "@fortawesome/free-regular-svg-icons";
import { faGithub, faMedium } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useNavigate } from "react-router-dom";

{
  /* <div className="flex flex-row  border-emerald-400 w-full mx-4 my-4 py-6">
        <div className="w-1/2 border-dashed mx-2 my-2 flex justify-center items-center">
          <div className="text-xl">Create an account</div>
          <div>
            <button
              onClick={() => navigate("/")}
              className="mt-4 border border-slate-500 px-3 py-1 rounded-lg bg-transparent text-slate-600 text-md"
            >
              Sign up
            </button>
          </div>
        </div>
      </div> */
}
{
  /* <div className="flex flex-row  border-emerald-400 w-full mx-4 my-4 py-6">
        <aside className="w-1/2 flex justify-center border-2 rounded-lg mx-2 my-2">
          <img src={ciphyrLogo} className="w-48" />
        </aside>
        <div className="w-1/2 border-dashed mx-2 my-2 flex justify-center items-center">
          <div className="text-xl">
            Follow our Github and LinkedIn page to stay tuned!
          </div>
        </div>
      </div> */
}

export default function InstructionSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-b from-slate-900 via-slate-600 to-custom-end flex flex-col">
      <div className="flex flex-col items-center mx-48 my-32 ">
        <div className="flex flex-row w-full my-4 py-6">
          <div className="w-full flex flex-col items-center space-y-4 text-white ">
            {/* <div className="flex flex-row items-center border rounded rounded-lg text-xl mb-20 w-[12em]">
              <button className="font-mono px-4 py-2">npm i ciphyr</button>
              <FontAwesomeIcon
                icon={faClipboard}
                className="ml-auto px-4 cursor-pointer text-2xl"
              />
            </div> */}
            <div className="flex flex-col text-3xl items-center justify-center ">
              <div>For detailed instructions see our Github</div>
              <div>
                <div className="mt-4 px-6 py-4 rounded-lg bg-slate-200 text-slate-800 text-3xl shadow">
                  <FontAwesomeIcon
                    className="mr-2 text-3xl"
                    icon={faGithub}
                    style={{ color: "#000000" }}
                  />
                  <a
                    href="https://github.com/oslabs-beta/Ciphyr"
                    target="_blank"
                  >
                    GitHub
                  </a>
                </div>
              </div>
              <div className="pt-12">Create your account here</div>
              <div>
                <button
                  onClick={() => navigate("/signup")}
                  className="mt-4 px-6 py-4  rounded-lg bg-black text-slate-200 text-3xl hover:bg-primary hover:text-white transition ease-in-out"
                >
                  Sign Up
                </button>
              </div>
            </div>
            <div className="flex flex-col text-3xl items-center">
              <div>Check us out for more!</div>
              <div className="mt-4 text-3xl flex flex-col sm:flex-row justify-center items-center">
                <div className="mt-4 px-6 py-4 rounded-lg bg-slate-200 text-slate-800 text-3xl shadow mr-4">
                  <FontAwesomeIcon
                    className="mr-2 text-3xl"
                    icon={faLinkedin}
                    style={{ color: "#000000" }}
                  />
                  <a
                    href="https://www.linkedin.com/company/Ciphyr"
                    target="_blank"
                  >
                    linkedin
                  </a>
                </div>
                <div className="mt-4 px-6 py-4 rounded-lg bg-slate-200 text-slate-800 text-3xl shadow font-sans">
                  <FontAwesomeIcon
                    className="mr-2 text-3xl"
                    icon={faMedium}
                    style={{ color: "#000000" }}
                  />
                  <a
                    href="https://medium.com/@ajberger905/3c4fadefb5e4"
                    target="_blank"
                  >
                    Medium
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
