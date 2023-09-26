import ciphyrIcon from "../../assets/ciphyrIcon.png";
import ciphyrLogo from "../../assets/ciphyrLogo.png";

export default function splashContainer() {
  return (
    <div className="flex flex-col border-indigo-700">
      <div className="flex flex-row  border-sky-400 w-full ">
        <main className=" w-full my-12 mx-36 space-y-4">
          <section className=" border-sky-800">
            <nav className=" flex justify-between mb-10">
              <div className="">
                <img src={ciphyrLogo} className="w-40" />
              </div>
              <div>
                <div id="loginGroup">
                  <button className="border mr-2 px-4 py-2 rounded-lg text-lg">
                    Login
                  </button>
                  <button className="border px-4 py-2 rounded-lg text-lg">
                    Sign up
                  </button>
                </div>
              </div>
            </nav>
            <div className="flex flex-col space-y-2 ml-2 my-8">
              <div>
                <h1 className="text-6xl font-semibold">
                  The Power of Security
                </h1>
              </div>
              <div className="text-xl font-light py-2">
                Ciphyr is a powerful go-to solution for GraphQL traffic
                monitoring
              </div>
              <div>
                <button className="border px-4 py-2 rounded-lg bg-primary text-white text-lg">
                  Get started
                </button>
              </div>
            </div>
          </section>
          <section className="flex flex-col w-full items-center border border-sky-800 ">
            <div className="text-2xl font-semibold py-4 ">Services</div>
            <div className="text-4xl font-thin py-2 mb-12">
              Bolster your GraphQL application
            </div>
            <div className="flex flex-row space-x-10 w-full justify-around mb-6">
              <div className="flex flex-col items-center w-1/3">
                <img src={ciphyrIcon} className="w-20 py-2" />
                <div className="border px-6 py-2 ">
                  Monitor your client's traffic
                </div>
              </div>
              <div className="flex flex-col items-center w-1/3">
                <img src={ciphyrIcon} className="w-20 py-2" />
                <div className="border py-2 ">Get alerts for your queries</div>
              </div>
              <div className="flex flex-col items-center w-1/3">
                <img src={ciphyrIcon} className="w-20 py-2" />
                <div className="border px-6 py-2 ">
                  Visualize your GraphQL analytics
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col w-full items-center border border-sky-800 ">
            <div className="flex flex-row w-full py-16">
              <div className="ml-16 text-3xl font-light">Made with love</div>
            </div>
          </section>
          <section className="flex flex-col w-full items-start border border-sky-800 ">
            <div className="flex flex-row  border-emerald-400 w-full my-4">
              <div className="w-1/2  mx-6 my-4 space-y-4">
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
              <aside className="w-1/2 flex justify-center mx-6 my-4">
                <img src={ciphyrIcon} className="scale-75" />
              </aside>
            </div>
          </section>
          <section className="flex flex-col w-full items-center border border-sky-800 ">
            <div className="flex flex-row w-full py-16 justify-center">
              <div className="ml-16 text-3xl font-light">Getting started</div>
            </div>
          </section>
          <section className="flex flex-col w-full items-center border border-sky-800 ">
            <div className="flex flex-row  border-emerald-400 w-full my-4 py-6">
              <aside className="w-1/2 flex justify-center border-2 border-dashed mx-2 my-2">
                <img src={ciphyrLogo} className="w-48" />
              </aside>
              <div className="w-1/2  border-dashed mx-2 my-2 flex justify-center items-center">
                <div className="text-xl">NPM install Ciphyr</div>
              </div>
            </div>
            <div className="flex flex-row  border-emerald-400 w-full mx-4 my-4 py-6">
              <div className="w-1/2 border-dashed mx-2 my-2 flex justify-center items-center">
                <div className="text-xl">Plug in config</div>
              </div>
              <aside className="w-1/2 flex justify-center border-2 border-dashed mx-2 my-2">
                <img src={ciphyrLogo} className="w-48" />
              </aside>
            </div>
            <div className="flex flex-row  border-emerald-400 w-full mx-4 my-4 py-6">
              <aside className="w-1/2 flex justify-center border-2 border-dashed mx-2 my-2">
                <img src={ciphyrLogo} className="w-48" />
              </aside>
              <div className="w-1/2  border-dashed mx-2 my-2 flex justify-center items-center">
                <a className="text-xl">Create an account</a>
              </div>
            </div>
          </section>
          <footer className="flex flex-col w-full items-center border border-sky-800 ">
            <div className="flex flex-row  border-emerald-400 w-full my-4">
              <div className="w-1/2  border-dashed mx-2 my-2 px-4 py-4 ">
                <div className="text-2xl font-semibold">
                  Active Contributors
                </div>
                <div className="py-2">
                  <div className="text-lg font-light">Aidan Berger</div>
                  <div className="text-lg font-light">Jeremy Wang</div>
                  <div className="text-lg font-light">John Le</div>
                  <div className="text-lg font-light">Mike Zhang</div>
                </div>
              </div>
              <div className="w-1/2 mx-2 my-2 py-4">
                <div className="text-2xl font-semibold">Write to us</div>
                <div className="my-2">
                  <input
                    className="border border-slate-500 rounded w-full px-2 py-1 text-lg"
                    placeholder="johndoe@email.com"
                  ></input>
                </div>
                <div className="mt-4">
                  <input
                    className="border border-slate-500 rounded w-full px-2 pb-12 text-lg"
                    placeholder="Ciphyr is..."
                  ></input>
                </div>
                <div className="flex items-end justify-end w-full">
                  <button className="px-4 py-2 border rounded-lg text-lg">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
