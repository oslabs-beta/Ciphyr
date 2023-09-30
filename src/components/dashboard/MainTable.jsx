import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { useState, useEffect, useMemo, useCallback } from 'react';
import QueryModal from './QueryModal.jsx';
import Dropdown from './Dropdown.jsx';

export default function GridTable(props) {
  const [modal, toggleModal] = useState(false);
  const [rows, setRows] = useState('');
  const [raw, setRaw] = useState('');
  const [timeZone, setTimeZone] = useState('GMT');

  useEffect(() => {
    fetchLogs();
  }, [props.instance, timeZone]);

  const fetchLogs = async () => {
    try {
      const response = await fetch('/api/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          apiKey: props.instance,
          timezone: timeZone,
        }),
      });
      if (!response.ok) {
        throw new Error(`Server side error. Status: ${response.status}`);
      }
      const data = await response.json();
      setRows(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  // const changeTimeZone = async (val) => {
  //   console.log("changing TZ");
  //   fetch ('/api/instance/changeTimeZone', {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       timeZone: timeZone,
  //     }),
  //   })
  // }

  const columnDefs = [
    { field: 'timestamp' },
    { field: 'query_name' },
    { field: 'operation' },
    { field: 'depth' },
    { field: 'latency' },
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
    console.log('cellClicked', e.data.raw);
    setRaw(e.data.raw);
    toggleModal(!modal);
  });

  return (
    <>
      {modal && (
        <QueryModal modal={modal} toggleModal={toggleModal} raw={raw} />
      )}
      <h1 className='ml-10 mt-10 font-light text-2xl'>Main Table</h1>
      <div className='flex justify-end mb-3'>
        <select
          className='border bg-white rounded-md px-4 py-1 mr-4'
          placeholder='Choose a Timezone'
          onChange={(e) => setTimeZone(e.target.value)}
        >
          <option value='GMT'>Choose a Timezone</option>
          <option value='EST'>US/Eastern</option>
          <option value='PST'>US/Pacific</option>
          <option value='CET'>Europe/Berlin</option>
          <option value='EAT'>Africa/Nairobi</option>
          <option value='AET'>Australia/Sydney</option>
        </select>
        <select
          className='border bg-white rounded-md px-4 py-1 mr-4'
          placeholder='Choose a Instance'
          value={props.instance}
          onChange={(e) => props.setInstance(e.target.value)}
        >
          <Dropdown />
        </select>
      </div>
      <div
        className='ag-theme-material ml-8'
        style={{ height: 500, width: '100%' }}
      >
        <AgGridReact
          rowData={rows}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          rowSelection='multiple'
          animateRows={true}
          pagination={true}
          paginationPageSize='10'
          onCellClicked={cellClickedListener}
        />
      </div>
    </>
  );
}
