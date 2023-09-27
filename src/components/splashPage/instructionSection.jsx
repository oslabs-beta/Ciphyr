import ciphyrLogo from "../../assets/ciphyrLogo.png";


export default function InstructionSection() {
  return (
    <section className="flex flex-col items-center border border-sky-800 mx-36 ">
      <div className="flex flex-row  border-emerald-400 w-full my-4 py-6">
        <aside className="w-1/2 flex justify-center border-2 border-dashed mx-2 my-2">
          <img src={ciphyrLogo} className="w-48" />
        </aside>
        <div className="w-1/2  border-dashed mx-2 my-2 flex justify-center items-center">
          <div className="text-xl">NPM install Ciphyr</div>
        </div>
      </div>
      <div className="flex flex-row  border-emerald-400 w-full mx-4 my-4 py-6">
        <div className="w-1/2 border-dashed mx-2 my-2 flex justify-center items-center">
          <div className="text-xl">Plug in config</div>
        </div>
        <aside className="w-1/2 flex justify-center border-2 border-dashed mx-2 my-2">
          <img src={ciphyrLogo} className="w-48" />
        </aside>
      </div>
      <div className="flex flex-row  border-emerald-400 w-full mx-4 my-4 py-6">
        <aside className="w-1/2 flex justify-center border-2 border-dashed mx-2 my-2">
          <img src={ciphyrLogo} className="w-48" />
        </aside>
        <div className="w-1/2  border-dashed mx-2 my-2 flex justify-center items-center">
          <a className="text-xl">Create an account</a>
        </div>
      </div>
    </section>
  );
}
