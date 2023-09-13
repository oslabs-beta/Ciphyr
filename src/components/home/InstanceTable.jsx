import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";

export default function InstaceTable() {
  const tableData = [
    { name: "Secret key", apiKey: "sk-...yZDhr", created: "Aug 19, 2023" },
    { name: "Secret key", apiKey: "sk-...yZDhr", created: "Aug 19, 2023" },
    { name: "Secret key", apiKey: "sk-...yZDhr", created: "Aug 19, 2023" },
    { name: "Secret key", apiKey: "sk-...yZDhr", created: "Aug 19, 2023" },
    { name: "Secret key", apiKey: "sk-...yZDhr", created: "Aug 19, 2023" },
    { name: "Secret key", apiKey: "sk-...yZDhr", created: "Aug 19, 2023" },
  ];

  return (
    <div className="">
      <table className=" table-auto w-full">
        <thead className="">
          <tr className="">
            <th className="py-2 text-left">Name</th>
            <th className="text-left">API Key</th>
            <th className="text-left">Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((rowData, index) => (
            <tr
              key={index}
              className="border-t border-slate-300 text-slate-700"
            >
              <td className="text-left py-2 w-2/4">{rowData.name}</td>
              <td className="text-left w-1/4">{rowData.apiKey}</td>
              <td className="text-left w-1/4">{rowData.created}</td>
              <td className="text-right w-1/4">
                <div className="flex space-x-3 ">
                  <span>
                    <button className='mx-1'>
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </span>
                  <span>
                    <button>
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
