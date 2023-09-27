import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { useState, useEffect, useMemo, useCallback } from "react";
import QueryModal from "./QueryModal.jsx";
import Dropdown from "./Dropdown.jsx";

export default function GridTable(props) {
  const [modal, toggleModal] = useState(false);
  const [rows, setRows] = useState("");
  const [raw, setRaw] = useState("");
  const [timeZone, setTimeZone] = useState("");

  useEffect(() => {
    fetchLogs();
  }, [props.instance]);

  const fetchLogs = async () => {
    console.log("in try block");
    try {
      const response = await fetch("/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: props.instance,
        }),
      });
      if (!response.ok) {
        throw new Error(`Server side error. Status: ${response.status}`);
      }
      const data = await response.json();
      data.forEach(el => {
        el.timestamp = el.timestamp.substring(0, 19).replace('T', ' ')
      })
      setRows(data);
      console.log(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const columnDefs = [
    { field: "timestamp" },
    { field: "query_name" },
    { field: "operation" },
    { field: "depth" },
    { field: "latency" },
    //{ field: "raw" },
  ];

  const defaultColDef = useMemo(
    () => ({
      sortable: true,
      filter: true,
    }),
    []
  );

  const cellClickedListener = useCallback((e) => {
    console.log("cellClicked", e.data.raw);
    setRaw(e.data.raw);
    toggleModal(!modal);
  });

  return (
    <>
      {modal && (
        <QueryModal modal={modal} toggleModal={toggleModal} raw={raw} />
      )}
      <h1 className="ml-10 mt-10 font-light text-2xl">Main Table</h1>
      <div className="flex justify-end mb-3">
        <select
          className="border bg-white rounded-md px-4 py-1 mr-4"
          placeholder="Choose a Timezone"
          onChange={(e) => props.setTimeZone(e.target.value)}
        >
          <option value="Universal">Choose a Timezone</option>
          <option value="Canada/Eastern">Canada/Eastern</option>
          <option value="US/Eastern">US/Eastern</option>
          <option value="US/Central">US/Central</option>
          <option value="US/Mountain">US/Mountain</option>
          <option value="US/Pacific">US/Pacific</option>
        </select>
        <select
          className="border bg-white rounded-md px-4 py-1 mr-4"
          placeholder="Choose a Instance"
          value={props.instance}
          onChange={(e) => props.setInstance(e.target.value)}
        >
          <Dropdown />
        </select>
      </div>
      <div
        className="ag-theme-material ml-8"
        style={{ height: 500, width: "100%" }}
      >
        <AgGridReact
          rowData={rows}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection="multiple"
          animateRows={true}
          pagination={true}
          paginationPageSize="10"
          onCellClicked={cellClickedListener}
        />
      </div>
    </>
  );
}
