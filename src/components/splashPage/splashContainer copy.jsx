import ciphyrIcon from "../../assets/ciphyrIcon.png";
import ciphyrLogo from "../../assets/ciphyrLogo.png";

export default function splashContainer() {
  return (
    <>
      <div className="flex flex-col border-indigo-700">
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
              <h1 className="text-6xl font-semibold">The Power of Security</h1>
            </div>
            <div className="text-xl font-light py-2">
              Ciphyr is a powerful go-to solution for GraphQL traffic monitoring
            </div>
            <div>
              <button className="border px-4 py-2 rounded-lg bg-primary text-white text-lg">
                Get started
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
