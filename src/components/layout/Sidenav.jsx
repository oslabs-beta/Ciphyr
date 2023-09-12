import QuerySearchBar from "../common/QuerySearch";

export default function Sidenav() {
  return (
    <nav className="flex flex-col px-10 w-20rem h-screen">
      <div className="border-b mt-10 border-slate-400 py-3">
        <button>
          <QuerySearchBar />
        </button>
      </div>
      <div className="border-slate-400 mt-10 py-3 flex flex-col items-start">
        <button>Test</button>
        <button data-dropdown-toggle='dropdown' >Suspicious Queries</button>
        <ul id='dropdown'>
          <li>test</li>
          <li>test</li>
          <li>test</li>
          <li>test</li>
        </ul>
      </div>
    </nav>
  );
}
