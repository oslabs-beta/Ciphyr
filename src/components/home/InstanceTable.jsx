import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";
import EmptyInstanceMessage from "../common/EmptyInstanceMessage";
import { useState, useEffect } from "react";

export default function InstaceTable() {
  const [data, setData] = useState([]);

  const getData = async () => {
    const response = await fetch("/api/instance");
    const data = await response.json();
    setData(data.reverse());
    console.log(data);
  };

  useEffect(() => {
    getData();
  }, []);

  // const tableData = [
  //   { name: "Secret key", apiKey: "sk-...yZDhr", created: "Aug 19, 2023" },
  //   { name: "Secret key", apiKey: "sk-...yZDhr", created: "Aug 19, 2023" },
  //   { name: "Secret key", apiKey: "sk-...yZDhr", created: "Aug 19, 2023" },
  //   { name: "Secret key", apiKey: "sk-...yZDhr", created: "Aug 19, 2023" },
  //   { name: "Secret key", apiKey: "sk-...yZDhr", created: "Aug 19, 2023" },
  //   { name: "Secret key", apiKey: "sk-...yZDhr", created: "Aug 19, 2023" },
  // ];

  return (
    <>
      {data.length === 0 ? (
        <EmptyInstanceMessage />
      ) : (
        <div className="h-56 bg-white overflow-scroll">
          <table className="table-auto w-full">
            <thead className="">
              <tr className="">
                <th className="py-2 text-left">Name</th>
                <th className="text-left">API Key</th>
                <th className="text-left">Created</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.map((rowData) => (
                <tr
                  key={rowData.id}
                  className="border-t border-slate-300 text-slate-700"
                >
                  <td className="text-left py-2 w-1/4">{rowData.label}</td>
                  <td className="text-left w-1/2">{rowData.api_key}</td>
                  <td className="text-left w-1/4">
                    {rowData.created_on.slice(0, 10)}
                  </td>
                  <td className="text-right w-1/4">
                    <div className="flex justify-center items-center space-x-3 ">
                      <span>
                        <button className="mx-1">
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </button>
                      </span>
                      <span>
                        <button className="hover:bg-slate-200 p-1 rounded-md">
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
      )}
    </>
  );
}
