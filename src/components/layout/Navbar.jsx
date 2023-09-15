import { useNavigate } from "react-router-dom";
import ciphyrIcon from "../../assets/ciphyrIcon.png";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex justify-center items-center py-6 border-b-2">
        <div>
          <img src={ciphyrIcon} className="ml-10 w-[50px]" />
        </div>
        <div className="ml-10 mr-auto">
          <ul className="flex gap-10">
            {/* <li>
              <a
                className="text-slate-800 hover:text-secondary cursor-pointer"
                target="_blank"
                rel="noreferrer"
                href="https://excalidraw.com/#room=dbe379f1b41fb715af36,kbu-9fyp1LDuPpKJNTyf4g"
              >
                Documentation
              </a>
            </li> */}
            <li>
              <a
                onClick={() => navigate("/home")}
                className="text-slate-800 hover:text-secondary cursor-pointer"
              >
                Instances
              </a>
            </li>

            <li>
              <a
                onClick={() => navigate("/dashboard")}
                className="text-slate-800 hover:text-secondary cursor-pointer"
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
          <button className="pl-3 mr-16 text-slate-00 hover:text-secondary">
            Profile
          </button>
        </div>
      </nav>
    </>
  );
}
