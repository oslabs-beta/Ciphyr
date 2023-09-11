import { useState, useEffect, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import mData from "./MOCK_DATA.json";

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

  const data = useMemo(() => mData, []);
  // desired tableData picture
  // const data = [
  //   {
  //     time: "16:50.28",
  //     name: "getUsers",
  //     type: "query",
  //     depth: "4",
  //     query: "{reviews{id}games{reviews{idauthor{id}}}authors{id}}",
  //   },
  // ];

  const columns = [
    {
      header: "Time",
      accessorKey: "time",
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Type",
      accessorKey: "type",
    },
    {
      header: "Depth",
      accessorKey: "depth",
    },
    {
      header: "Query Log",
      accessorKey: "query",
    },
  ];

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-2 pr-12 text-left border-b border-gray-200 bg-gray-100"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="text-left pr-4 py-4 border-r border-b border-gray-200"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
