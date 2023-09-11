import { useState } from "react";

export default function QuerySearchBar() {
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <div>
        <input
          className="border border-slate-500 rounded"
          type="text"
          placeholder="Search by name..."
          value={searchInput}
          onChange={e => setSearchInput(e.target.value)}
        />
      </div>
    </>
  );
}
