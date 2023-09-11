import QuerySearchBar from "../common/QuerySearch";

export default function Sidenav() {
  return (
    <nav className="flex flex-col px-10 w-20rem h-screen">
      <div className="border-b mt-10 border-slate-400 py-3">
        <button>
          <QuerySearchBar />
        </button>
      </div>
      <div className="border-slate-400 mt-10 py-3">
        <button>Test</button>
      </div>
    </nav>
  );
}
