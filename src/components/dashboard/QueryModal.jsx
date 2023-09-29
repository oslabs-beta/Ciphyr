
export default function QueryModal(props) {

  return (
    <>
    <div></div>
      <div className='absolute inset-0 flex justify-center items-center z-10'>
        <div className='border bg-white flex flex-col p-8 rounded-md shadow-lg'>
          <h1 className='font-semibold text-lg w-96 mb-5'>Query</h1>
          <div>
            <pre className='text-lg w-48 mb-5' >{props.raw}</pre>
          </div>
          <div className="flex flex-row-reverse">
            <button
              onClick={() => props.toggleModal(!props.modal)}
              className='border border-white rounded-md bg-blue-500 hover:bg-blue-600 text-white py-1 px-2'
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  )
}