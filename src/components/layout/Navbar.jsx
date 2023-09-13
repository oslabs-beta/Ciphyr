import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex py-6 border-b-2">
        <div>
          <h1 className="font-bold cursor-pointer ml-16">Ciphyr</h1>
        </div>
        <div className="ml-12 mr-auto">
          <ul className="flex gap-10">
            <li>
              <a
                className="text-slate-800 hover:text-slate-500 cursor-pointer"
                target="_blank"
                rel="noreferrer"
                href="https://github.com/Ciphyr-OSP4/cipher-demo"
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                onClick={() => navigate("/")}
                className="text-slate-800 hover:text-slate-500 cursor-pointer"
              >
                Instances
              </a>
            </li>

            <li>
              <a
                onClick={() => navigate("/dashboard")}
                className="text-slate-800 hover:text-slate-500 cursor-pointer"
              >
                Dashboard
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center">
          <img
            className="w-8 h-8 rounded-full"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2080&q=80"
            alt="Avatar"
          />
          <button className="pl-3 mr-16 text-slate-800 hover:text-slate-500">
            Profile
          </button>
        </div>
      </nav>
    </>
  );
}
