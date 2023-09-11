import { useState, useEffect } from "react";
export default function DashTable() {
  // const [tableRows, setTableRows] = useState([]);

  //One time on load of page render the instances logs
  // useEffect(() => {
  //   fetchLogs();
  // }, []);

  // const fetchLogs = async () => {
  //   try {
  //     const response = await fetch("http://localhost:3000/log");

  //     if (!response.ok) {
  //       throw new Error(`Server side error. Status: ${response.status}`);
  //     }
  //     const data = await response.json();
  //     console.log(data); // debugging
  //     setTableRows(data);
  //   } catch (error) {
  //     console.error("Fetch error:", error);
  //   }
  // };

  // desired tableData picture
  const data = [
    {
      time: "16:50.28",
      name: "getUsers",
      type: "query",
      depth: "4",
      query: "{reviews{id}games{reviews{idauthor{id}}}authors{id}}",
    },
    {
      time: "16:50.28",
      name: "getUsers",
      type: "query",
      depth: "4",
      query: "{reviews{id}games{reviews{idauthor{id}}}authors{id}}",
    },
    {
      time: "16:50.28",
      name: "getUsers",
      type: "query",
      depth: "4",
      query: "{reviews{id}games{reviews{idauthor{id}}}authors{id}}",
    },
  ];

  return (
    <div>
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
          {sampleData.map((rowData, index) => (
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
    </div>
  );
}
