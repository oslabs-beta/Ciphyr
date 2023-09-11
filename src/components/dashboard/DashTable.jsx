import { useState, useEffect } from "react";

export default function DashTable() {
  const [tableRows, setTableRows] = useState([]);
  
  useEffect(()=> {
    
  }, [])
  const tableData = [
    {
      time: "16:50.28",
      name: "getUsers",
      type: "query",
      depth: "4",
      query: "{reviews{id}games{reviews{idauthor{id}}}authors{id}}",
    },
  ];

  return (
    <>
      <table className="table-auto w-full">
        <thead className="">
          <tr>
            <th className="text-left">Time</th>
            <th className="text-left">Name</th>
            <th className="text-left">Type</th>
            <th className="text-left">Depth</th>
            <th className="text-left">Query</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((rowData, index) => (
            <tr key={index} className="border-t border-gray-400 my-2">
              <td className="text-left">{rowData.time}</td>
              <td className="text-left">{rowData.name}</td>
              <td className="text-left">{rowData.type}</td>
              <td className="text-left">{rowData.depth}</td>
              <td className="text-left">{rowData.query}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
