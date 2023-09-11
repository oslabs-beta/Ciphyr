import { useState, useEffect, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import mData from "./MOCK_DATA.json";
import FilterFunction from "./FilterFunction";

export default function DashTable() {
  const [filtering, setFiltering] = useState("");
  const [columnFilters, setColumnFilters] = useState("");
  // const [tableRows, setTableRows] = useState([]);

  // //One time on load of page render the instances logs
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
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
      columnFilters: columnFilters,
    },
    onGlobalFilterChanged: setFiltering,
    onColumnFiltersChange: setColumnFilters,
  });

  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search by keywords"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
      />
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-2 pr-12 text-left border-b border-gray-200 bg-gray-100"
                >
                  {header.isPlaceholder ? null : (
                    <>
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {/* <div>
                        <FilterFunction column={header.column} table={table} />
                      </div> */}
                    </>
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
      <div>
        <button
          className="border border-slate-300 mr-2 px-2 py-1 rounded"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border border-slate-300 mr-2 px-2 py-1 rounded"
          onClick={() => table.setPageIndex((oldPageIndex) => oldPageIndex - 1)}
          disabled={!table.getCanPreviousPage()}
        >
          {table.getState().pagination.pageIndex - 1}
        </button>
        <button
          className="border border-slate-300 mr-2 px-2 py-1 rounded"
          onClick={() => table.setPageIndex()}
        >
          {table.getState().pagination.pageIndex}
        </button>
        <button
          className="border border-slate-300 mr-2 px-2 py-1 rounded"
          onClick={() => table.setPageIndex((oldPageIndex) => oldPageIndex + 1)}
          disabled={!table.getCanNextPage()}
        >
          {table.getState().pagination.pageIndex + 1}
        </button>
        <button
          className="border border-slate-300 mr-2 px-2 py-1 rounded"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
      </div>
    </div>
  );
}

// function Filter({ column, table }) {
//   const firstValue = table.getPreFilteredRowModel().flatRows[0]?.getValue(column.id);

//   const columnFilterValue = column.getFilterValue();

//   const sortedUniqueValues = React.useMemo(
//     () =>
//       typeof firstValue === 'number'
//         ? []
//         : Array.from(column.getFacetedUniqueValues().keys()).sort(),
//     [column.getFacetedUniqueValues()]
//   );

//   return typeof firstValue === 'number' ? (
//     <div>
//       <div className="flex space-x-2">
//         <DebouncedInput
//           type="number"
//           min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
//           max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
//           value={(columnFilterValue?.[0] ?? '')}
//           onChange={(value) =>
//             column.setFilterValue((old) => [value, old?.[1]])
//           }
//           placeholder={`Min ${
//             column.getFacetedMinMaxValues()?.[0]
//               ? `(${column.getFacetedMinMaxValues()?.[0]})`
//               : ''
//           }`}
//           className="w-24 border shadow rounded"
//         />
//         <DebouncedInput
//           type="number"
//           min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
//           max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
//           value={(columnFilterValue?.[1] ?? '')}
//           onChange={(value) =>
//             column.setFilterValue((old) => [old?.[0], value])
//           }
//           placeholder={`Max ${
//             column.getFacetedMinMaxValues()?.[1]
//               ? `(${column.getFacetedMinMaxValues()?.[1]})`
//               : ''
//           }`}
//           className="w-24 border shadow rounded"
//         />
//       </div>
//       <div className="h-1" />
//     </div>
//   ) : (
//     <>
//       <datalist id={column.id + 'list'}>
//         {sortedUniqueValues.slice(0, 5000).map((value) => (
//           <option value={value} key={value} />
//         ))}
//       </datalist>
//       <DebouncedInput
//         type="text"
//         value={(columnFilterValue ?? '')}
//         onChange={(value) => column.setFilterValue(value)}
//         placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
//         className="w-36 border shadow rounded"
//         list={column.id + 'list'}
//       />
//       <div className="h-1" />
//     </>
//   );
// }

// // A debounced input react component
// function DebouncedInput({
//   value: initialValue,
//   onChange,
//   debounce = 500,
//   ...props
// }) {
//   const [value, setValue] = React.useState(initialValue);

//   React.useEffect(() => {
//     setValue(initialValue);
//   }, [initialValue]);

//   React.useEffect(() => {
//     const timeout = setTimeout(() => {
//       onChange(value);
//     }, debounce);

//     return () => clearTimeout(timeout);
//   }, [value]);

//   return <input {...props} value={value} onChange={(e) => setValue(e.target.value)} />;
// }
