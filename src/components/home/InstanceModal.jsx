import { useState } from 'react';

export default function InstanceModal(props) {
  const [input, setInput] = useState('');

  const sendInput = async () => {
    try {
      const response = await fetch('/api/instance/newInstance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ label: input }),
      });
      const parsed = await response.json();
      console.log('parsed:', parsed.apiKey);
      console.log(props);
      props.setApiKey(parsed.apiKey);
    } catch (err) {
      console.log(err);
    }
  };

  const create = () => {
    sendInput();
    props.toggleAPI();
    props.toggleModal();
  };

  return (
    <>
      <div className='fixed w-screen h-screen bg-slate-500 opacity-50'></div>
      <div className='absolute inset-0 flex justify-center items-center z-10'>
        <div className='border bg-white flex flex-col p-8 rounded-md shadow-lg'>
          <h1 className='font-semibold text-lg mb-3'>Create new secret key</h1>
          <label className='font-medium' htmlFor='name'>
            Name
          </label>
          <input
            onChange={(e) => setInput(e.target.value)}
            className='border rounded w-96 mt-2 mb-4 px-3'
            type='text'
            placeholder='My Test Key'
          />
          <div className='flex flex-row-reverse justify-items-end'>
            <button
              onClick={() => create()}
              className='rounded-md border border-white rounded bg-sky-600 hover:bg-sky-700 text-white py-1 px-2 ml-2 text-sm'
            >
              Create secret key
            </button>
            <button
              onClick={() => props.toggleModal()}
              className='border rounded bg-white text-primary border-primary py-1 px-2 text-sm
              hover:bg-slate-500
              hover:text-white
              hover:border-none
              '
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
