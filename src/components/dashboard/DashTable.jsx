import { useState, useEffect, useMemo } from "react";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import EmptyMessage from "../common/EmptyMessage";

export default function DashTable(props) {
  const [filtering, setFiltering] = useState("");
  const [columnFilters, setColumnFilters] = useState("");
  const [tableRows, setTableRows] = useState([]);
  const [instance, setInstance] = useState("");
  const [cellValue, setCellValue] = useState('')
  //One time on load of page render the instances logs
  const getCellValue = (cell) => {
    //setCellValue(cell.value);
    console.log(cell)
    console.log('cell clicked');
  }

  const cellCheck = () => {
    console.log(cellValue)
  }

  useEffect(() => {
    fetchLogs();
  }, [instance]);
  /**
   * client -> "[ {instance1 : logsFor1 }, {instance2 : logsFor1 }, ... ] "
   */
  const fetchLogs = async () => {
    console.log("in try block");
    try {
      if (!instance) {
        console.log("instance not defined");
        apiKey = null;
      }
      console.log("INSTANCE", instance);
      const response = await fetch("/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: instance,
        }),
      });
      if (!response.ok) {
        throw new Error(`Server side error. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("data", data); // debugging
      console.log("TABLE ROWS B4 UPDATE:", tableRows);
      setTableRows(data.reverse());
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    console.log("TABLE ROWS UPDATE:", tableRows);
  }, [tableRows]);

  // const data = useMemo(() => mData, []);

  // **************************** COLUMNS FROM SERVER  ****************************
  const columns = [
    {
      header: "Time",
      accessorKey: "timestamp",
    },
    {
      header: "Name",
      accessorKey: "query_name",
    },
    {
      header: "Type",
      accessorKey: "operation",
    },
    {
      header: "Depth",
      accessorKey: "depth",
    },
    {
      header: "Latency",
      accessorKey: "latency",
    },
    {
      header: "Query Log",
      accessorKey: "log",
    },
  ];
  // *************************************************************************************

  // **************************** COLUMNS FROM MOCK DATA  ****************************
  // const columns = [
  //   {
  //     header: "Time",
  //     accessorKey: "time",
  //   },
  //   {
  //     header: "Name",
  //     accessorKey: "name",
  //   },
  //   {
  //     header: "Type",
  //     accessorKey: "type",
  //   },
  //   {
  //     header: "Query Log",
  //     accessorKey: "query",
  //   },
  //   {
  //     header: "Depth",
  //     accessorKey: "depth",
  //   },
  //   {
  //     header: "Latency",
  //     accessorKey: "latency"
  //   },
  // ];
  // *************************************************************************************

  // ...

  // ...

  const table = useReactTable({
    data: tableRows,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: filtering,
    },
    onGlobalFilterChanged: setFiltering,
  });

  return (
    <>
      <div className="relative flex flex-col items-start mt-5 ml-5rem mr-8 w-2/3">
        <div className="">
          <div className="flex justify-between">

            <input
              className="border bg-white rounded-md px-2 py-1"
              type="text"
              placeholder="Search by keywords"
              value={filtering}
              onChange={(e) => setFiltering(e.target.value)}
            />
            <select
              className="border bg-white rounded-md px-4 py-1 mr-4"
              placeholder="Search by keywords"
              value={instance}
              onChange={(e) => setInstance(e.target.value)}
            >
              <option value="null">Choose an Instance</option>
              <option value="04ffad9d-73ed-4d44-9e6a-3cbf2db31d2b">
                cluster0
              </option>
              <option value="45b8811c-a25b-4ba4-a42b-75abbde27e4c">
                testInstance
              </option>
            </select>
          </div>
          <div className=" h-[800px] !important overflow-y-auto">
            <table className="w-[1800px] mt-5 bg-white shadow-md table-fixed">
              <thead>
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        className={`py-2 pl-2 text-left border-b pr-12 border-gray-200 bg-gray-100 h-[50px] ${
                          header.column.id === "log" ? "w-20" : "w-10"
                        } `}
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
                {table.getRowModel().rows.map((row, rowIndex) => (
                  <tr
                    key={row.id}
                    className={
                      rowIndex % 2 === 0 ? "bg-tertiary text-slate" : ""
                    }
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td
                        onClick={() => console.log(cell.getValue)}
                        key={cell.id}
                        className="text-left px-4 py-4 border-r border-b border-gray-200 overflow-clip h-[20] cursor-pointer"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-6">
            <button
              className="border border-slate-300 mr-2 px-2 py-1 rounded"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              {"<"}
            </button>
            {/* <button
          className="border border-slate-300 mr-2 px-2 py-1 rounded"
          onClick={() => table.setPageIndex((oldPageIndex) => oldPageIndex - 1)}
          disabled={!table.getCanPreviousPage()}
        >
          {table.getState().pagination.pageIndex - 1}
        </button> */}
            <button className="border border-slate-300 mr-2 px-2 py-1 rounded">
              {table.getState().pagination.pageIndex + 1}
            </button>
            {/* <button
          className="border border-slate-300 mr-2 px-2 py-1 rounded"
          onClick={() => table.setPageIndex((oldPageIndex) => oldPageIndex + 1)}
          disabled={!table.getCanNextPage()}
        >
          {table.getState().pagination.pageIndex + 1}
        </button> */}
            <button
              className="border border-slate-300 mr-2 px-2 py-1 rounded"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </>
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
