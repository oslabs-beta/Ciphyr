import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ciphyrIcon from "../../assets/ciphyrIcon.png";
import ciphyrLogo from "../../assets/ciphyrLogo.png";
import CiphyrRoundIcon from "./__assets__/Ciphyr-Round-Icon.png";
import CiphyrRoundLogo from "./__assets__/Ciphyr-Round-Logo.png";
import bigIdea from "./__assets__/undraw_bigIdea.png";
import graphQL from "./__assets__/GraphQL_Logo.png";
import jsLogo from "./__assets__/icons/JS-logo.png";
import nodeJS from "./__assets__/icons/nodeJS.png";
import pgLogo from "./__assets__/icons/pgLogo.png";
import reactLogo from "./__assets__/icons/React.png";
import npmLogo from "./__assets__/icons/npmLogo.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesDown } from "@fortawesome/free-solid-svg-icons";
// SECTION FOR ICONS FOR SERVICES SECTION //

import binoculars from "./__assets__/icons/binoculars.png";
import notifcation from "./__assets__/icons/notification.png";
import barChart from "./__assets__/icons/bar-chart.png";
import magnifying from "./__assets__/icons/magnifying.png";
import group from "./__assets__/icons/group.png";
// CONSIDER MODULARIZING //
//

// MODULARIZED COMPONENTS
import Services from "./servicesSection.jsx";
import Footer from "./footer.jsx";
import InstructionSection from "./instructionSection.jsx";

import { Link } from "react-scroll";

export default function splashContainer() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col border-indigo-700">
      <div className="flex flex-row  border-sky-400 w-full ">
        <main className=" w-full">
          <section className="mb-12">
            <div className="bg-gradient-to-b from-custom-start via-splash-via to-splash-end pt-20 pb-24 h-full flex flex-col items-center justify-center">
              <nav className=" flex flex-row justify-between mx-32 items-center">
                <div className="">
                  <img src={CiphyrRoundLogo} className="w-[12em]" />
                </div>
                <div className="flex flex-row">
                  <div id="login" className="space-x-4">
                    {/* <span className="font-light text-sm text-slate-700"> Already have an account?</span> */}
                    {/* <span>
                    <button
                      onClick={() => navigate("/")}
                      className="border  border-slate-400 hover:bg-white hover:border-primary hover:text-primary mr-2 px-4 py-1 rounded-lg "
                    >
                      Login
                    </button>
                  </span> */}
                    {/* <button
                    onClick={() => navigate("/signup")}
                    className="border px-4 py-1 rounded-lg text-lg"
                  >
                    Sign up
                  </button> */}
                  </div>
                </div>
              </nav>
              <div className="flex flex-row w-full">
                <div className="flex flex-col w-full items-center mt-20 mb-10 ">
                  <div>
                    <h1 className="py-4 text-5xl text-center sm:text-7xl font-semibold drop-shadow-lg bg-gradient-to-r from-blue-600 via-red-800 to-indigo-400 text-transparent bg-clip-text">
                      UNLOCK SECURITY WITH
                    </h1>
                    <h1 className="text-4xl sm:text-6xl text-center font-semibold drop-shadow-lg bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 text-transparent bg-clip-text">
                      TRANSPARENT GRAPHQL
                    </h1>
                  </div>
                  <div className="text-2xl font-light py-6 mt-8 px-5 text-center">
                    Server-side GraphQL monitoring. All in one place.
                  </div>
                  <div>
                    <Link to="getStarted" smooth={true} duration={2000}>
                      <button className="mt-4 px-4 py-2 rounded-full bg-black text-white text-lg hover:bg-primary hover:text-white transition ease-in-out">
                        Get started
                      </button>
                    </Link>
                  </div>
                  <div>
                    <button
                      onClick={() => navigate("/login")}
                      className="mt-4 border border-slate-500 px-3 py-1 rounded-full bg-transparent text-slate-600 text-md"
                    >
                      Already have an account?
                    </button>
                  </div>
                </div>
                {/* <div className="border flex ml-32 w-1/4  border-sky-800 sticky">
                  <div>
                    <img
                      src={CiphyrRoundIcon}
                      className="w-[18em] absolute z-[1] left-0"
                    />
                    <img
                      src={graphQL}
                      className="w-[18em] absolute z-[0] left-32 top-20"
                    />
                  </div>
                </div> */}
              </div>

              <div className="mt-[3em] mb-[4em] flex item-end justify-center text-3xl animate-bounce cursor-pointer">
                <Link to="services" smooth={true} duration={1000}>
                  <FontAwesomeIcon icon={faAnglesDown} />
                </Link>
              </div>
            </div>
          </section>
          <Services />
          <section className="flex-col w-full items-center shadow">
            <div className="flex flex-row w-full py-16 justify-center items-center bg-slate-900">
              <div className="text-4xl font-light text-slate-200 mr-6">
                Built with ❤️ but also
              </div>
              <span className="flex flex-row text-3xl font-light text-slate-200 space-x-4 ">
                <span>
                  <img src={jsLogo} className="w-12" />
                </span>
                <span>
                  <img src={reactLogo} className="w-14" />
                </span>
                <span>
                  <img src={graphQL} className="w-14" />
                </span>

                <span>
                  <img src={pgLogo} className="w-12" />
                </span>
              </span>
            </div>
          </section>
          <section className="flex flex-col items-start">
            <div className="flex flex-col sm:flex-row  border-emerald-400 w-full my-36">
              <div className="w-full sm:w-1/2 px-6 my-4 space-y-4">
                <div className="text-2xl font-semibold">
                  So, what's the big idea?
                </div>
                <div className="text-xl font-light">We love GraphQL</div>
                <div className="text-lg font-light">
                  <p className="text-sky-700 font-normal">
                    But there's still much to be done.
                  </p>
                </div>
                <div className="text-lg font-light">
                  <p className="">
                    We are Ciphyr. An open-source platform dedicated to the
                    developer community and motivated by the challenges GraphQL
                    faces. We are a lightweight, middleware SDK that monitors
                    your application's GraphQL queries.
                  </p>
                </div>
                <div className="text-lg font-light">
                  <p className="">
                    As long as security remains a consideration when considering
                    whether to utilize GraphQL in your appplication, Ciphyr
                    wants to be your intuitive solution!
                  </p>
                </div>
                <div className="text-lg font-light">
                  <p className="">
                    We hope you enjoy using our product, and greatly welcome any
                    feedback. We are constantly iterating, so feel free to check
                    in every once and a while.
                  </p>
                </div>
              </div>
              <aside className="max-w-1/2 flex justify-center mx-6 my-4">
                <img src={bigIdea} className="" />
              </aside>
            </div>
          </section>
          <section className="flex flex-col w-full items-center bg-slate-900">
            <div className="flex flex-row w-full pt-16  justify-center">
              <div
                id="getStarted"
                className=" text-4xl font-bold text-slate-200"
              >
                GETTING STARTED{" "}
              </div>
            </div>
          </section>
          <InstructionSection />
          <Footer />
        </main>
      </div>
    </div>
  );
}
