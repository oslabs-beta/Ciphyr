import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy } from '@fortawesome/free-regular-svg-icons';

export default function ApiModal(props) {

  const done = () => {
    props.toggleAPI();
    window.location.reload(false);
  }

  return (
    <>
      <div className='fixed w-screen h-screen bg-slate-500 opacity-50'></div>
      <div className='absolute inset-0 flex justify-center items-center z-10'>
        <div className='border bg-white flex flex-col p-8 rounded-md shadow-lg'>
          <h1 className='font-semibold text-lg mb-5'>Create new secret key</h1>
          <p className='w-30rem text-sm mb-4'>
            Please save this secret key somewhere safe and accessible. For
            security reasons,{' '}
            <strong>you won't be able to view it again</strong> through your
            Ciphyr account. If you lose this secret key, you'll need to generate
            a new one.
          </p>
          <div>
            <input
              value={props.apiKey}
              className='disabled italic no-underline text-slate-700 border rounded-md w-30rem mb-5 mt-3 px-3'
              type='text'
              placeholder='My Test Key'
            />
            <button
              onClick={() => navigator.clipboard.writeText(props.apiKey)}
              className='border border-white rounded-md bg-sky-600 hover:bg-sky-700 text-white py-1 px-2'
            >
              <FontAwesomeIcon icon={faCopy} />
            </button>
          </div>
          <div className="flex flex-row-reverse">
            <button
              onClick={done}
              className='border border-white rounded-md bg-sky-600 hover:bg-sky-700 text-white py-1 px-2'
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
