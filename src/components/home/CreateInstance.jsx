export default function Dashboard(props) {
  // label for instance table
  // will receive api key from db

  return (
    <div className="flex justify-center bg-gray-200 hover:bg-gray-300 rounded mt-5 w-15rem py-2 px-4">
      <button onClick={() => props.toggleModal()} className="">Create new instance</button>
    </div>
  );
}
