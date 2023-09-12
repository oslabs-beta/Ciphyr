import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

export default function ApiModal(props) {

  return (
    <div className="absolute inset-0 flex justify-center items-center z-10">
    <div className='border bg-white flex flex-col p-8 rounded-md shadow-lg'>
      <h1 className='font-semibold text-lg mb-5'>Create new secret key</h1>
      <p>Please save this secret key somewhere safe and accessible. For security reasons, <strong>you won't be able to view it again</strong> </p>
      <div>
      <input className='border rounded-md w-96 mb-5 px-3' type='text' placeholder='My Test Key'/>
      <button onClick={() => navigator.clipboard.writeText('copied API key')} className='border border-white rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1 px-2'><FontAwesomeIcon icon={faCopy} /></button>
      </div>
      <div>
      <button onClick={() => props.toggleAPI()} className='border border-white rounded-md bg-emerald-600 hover:bg-emerald-700 text-white py-1 px-2'>Done</button>
      </div>
    </div>
  </div>
  )
}