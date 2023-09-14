export default function Dashboard(props) {
  // label for instance table
  // will receive api key from db

  return (
    <div className="flex justify-center border border-slate-400 hover:bg-white hover:border-primary hover:text-primary font:semi-bold rounded mt-5 w-15rem py-2 px-4 text-slate-800">
      <button onClick={() => props.toggleModal()} className="">
        Create new instance
      </button>
    </div>
  );
}
