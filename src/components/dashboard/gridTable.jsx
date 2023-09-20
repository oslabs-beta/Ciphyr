import {AgGridReact} from 'ag-grid-react'
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { useState, useEffect, useMemo, useCallback} from 'react'
import QueryModal from './QueryModal.jsx'


export default function GridTable () {
  const [modal, toggleModal] = useState(false);
  const [rows, setRows] = useState('');
  const [raw, setRaw] = useState('')

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    console.log("in try block");
    try {
      const response = await fetch("/api/log", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          apiKey: "04ffad9d-73ed-4d44-9e6a-3cbf2db31d2b",
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
    <h1 className='font-semibold text-xl m-8' >Dashboard</h1>
    <div className='ag-theme-alpine' style={{height: 500}}>
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