export default function InstaceTable() {

  const tableData = [
    { name: 'Secret key', apiKey: 'sk-...yZDhr', created: 'Aug 19, 2023' },
    { name: 'Secret key', apiKey: 'sk-...yZDhr', created: 'Aug 19, 2023' },
    { name: 'Secret key', apiKey: 'sk-...yZDhr', created: 'Aug 19, 2023' },
    { name: 'Secret key', apiKey: 'sk-...yZDhr', created: 'Aug 19, 2023' },
    { name: 'Secret key', apiKey: 'sk-...yZDhr', created: 'Aug 19, 2023' },
        { name: 'Secret key', apiKey: 'sk-...yZDhr', created: 'Aug 19, 2023' },


  ];
  
  return (
    <div className="">
      <table className="table-auto w-full">
        <thead className="">
          <tr>
            <th className="text-left">Name</th>
            <th className="text-left">API Key</th>
            <th className="text-left">Created</th>
          </tr>
        </thead>
        <tbody>
        {tableData.map((rowData, index) => (
            <tr key={index} className="border-t border-gray-400 my-2"> 
              <td className="text-left">{rowData.name}</td>
              <td className="text-left">{rowData.apiKey}</td>
              <td className="text-left">{rowData.created}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
