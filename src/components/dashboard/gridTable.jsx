import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import { useState, useEffect, useMemo, useCallback} from 'react'
import QueryModal from './QueryModal.jsx';
import Dropdown from './Dropdown.jsx';


export default function GridTable () {
  const [modal, toggleModal] = useState(false);
  const [rows, setRows] = useState('');
  const [raw, setRaw] = useState('')
  const [instance, setInstance] = useState('')


  useEffect(() => {
    fetchLogs();
  }, [instance]);

  const fetchLogs = async () => {
    console.log("in try block");
    try {
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
      setRows(data);
      console.log(data)
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const rowData = [
    {Time: '2023', Name: 'QueryTest', Type: 'Mutation', Depth: '3', Latency: '4', QueryLog: '{query{hello}}'},
    {Time: '2023', Name: 'QueryTest', Type: 'Mutation', Depth: '3', Latency: '4', QueryLog: '{query{hello}}'},
    {Time: '2023', Name: 'QueryTest', Type: 'Mutation', Depth: '3', Latency: '4', QueryLog: '{query{hello}}'},
    {Time: '2023', Name: 'QueryTest', Type: 'Mutation', Depth: '3', Latency: '4', QueryLog: '{query{hello}}'},
    {Time: '2023', Name: 'QueryTest', Type: 'Mutation', Depth: '3', Latency: '4', QueryLog: '{query{hello}}'},
    {Time: '2023', Name: 'QueryTest', Type: 'Mutation', Depth: '3', Latency: '4', QueryLog: '{query{hello}}'},
    {Time: '2023', Name: 'QueryTest', Type: 'Mutation', Depth: '3', Latency: '4', QueryLog: '{query{hello}}'},
    {Time: '2023', Name: 'QueryTest', Type: 'Mutation', Depth: '3', Latency: '4', QueryLog: '{query{hello}}'},
    {Time: '2023', Name: 'QueryTest', Type: 'Mutation', Depth: '3', Latency: '4', QueryLog: '{query{hello}}'},
  ]

  const columnDefs = [
    {field: 'timestamp'},
    {field: 'query_name'},
    {field: 'operation'},
    {field: 'depth'},
    {field: 'latency'},
    {field: 'raw'},
  ]

  const defaultColDef = useMemo( () => ({
    sortable: true,
    filter: true
  }), []);

  const cellClickedListener = useCallback(e => {
    console.log('cellClicked', e.data.raw);
    setRaw(e.data.raw);
    toggleModal(!modal)
  })

  return (
    <>
    { modal && <QueryModal modal={modal} toggleModal={toggleModal} raw={raw} />}
    <div className="flex justify-between">
            <select
              className="border bg-white rounded-md px-4 py-1 mr-4"
              placeholder="Search by keywords"
              value={instance}
              onChange={(e) => setInstance(e.target.value)}
            >
              <Dropdown />
            </select>
          </div>
    <h1 className='font-semibold text-xl m-8' >Dashboard</h1>
    <div className='ag-theme-material ml-8' style={{height: 500, width: '100%'}}>
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
  )
}