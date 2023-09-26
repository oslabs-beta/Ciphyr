export default function Alerts() {
  return (
    <>
      <div className='bg-white h-full'>
        <div className='p-6'>
          <h1 className='font-semibold text-2xl'>Alert settings</h1>
          <p className='text-sm text-slate-500 border-b mt-2 pb-3'>
            Select the kinds of alerts you get about your queries.
          </p>
          <div className='flex'>
            <div className='mt-8 w-1/4 mr-10'>
              <p className='text-sm text-slate-700 font-semibold'>
                Query alerts
              </p>
              <p className='text-sm text-slate-500 pb-3'>
                Get alerts to see suspicious queries in your instance when
                you're not online. You can turn these off.
              </p>
            </div>
            <div className='flex flex-col mt-8'>
              <div className='flex'>
                <div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox' value='' className='sr-only peer' />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className='mb-3'>
                  <p className='text-sm text-slate-700 font-semibold ml-3'>
                    Depth
                  </p>
                  <p className='text-sm text-slate-500 pb-3 ml-3'>
                    Get notified when a query reaches certain depth
                  </p>
                </div>
                <div className=''>
                  <input
                    className='border-2 rounded-md w-16 pl-1'
                    type='text'
                    placeholder='10'
                  />
                </div>
              </div>
              <div className='flex'>
                <div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox' value='' className='sr-only peer' />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className='mb-3'>
                  <p className='text-sm text-slate-700 font-semibold ml-3'>
                    Latency
                  </p>
                  <p className='text-sm text-slate-500 pb-3 ml-3'>
                    Get notified when latency ceiling reached
                  </p>
                </div>
              </div>
              <div className='flex'>
                <div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox' value='' className='sr-only peer' />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className='mb-3'>
                  <p className='text-sm text-slate-700 font-semibold ml-3'>
                    Errors
                  </p>
                  <p className='text-sm text-slate-500 pb-3 ml-3'>
                    Get notified when a query reaches certain depth
                  </p>
                </div>
              </div>
            </div>

          </div>
          <div className='flex border-t mt-10'>
            <div className='mt-8 w-1/4 mr-10'>
              <p className='text-sm text-slate-700 font-semibold'>
                Push notifications
              </p>
              <p className='text-sm text-slate-500 pb-3'>
                Get push notifications in-app to see whats going on when you're online.
              </p>
            </div>
            <div className='flex flex-col mt-8'>
              <div className='flex'>
                <div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox' value='' className='sr-only peer' />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className='mb-3'>
                  <p className='text-sm text-slate-700 font-semibold ml-3'>
                    Reminders
                  </p>
                  <p className='text-sm text-slate-500 pb-3 ml-3'>
                    Updates to remind you of reminders you may have missed
                  </p>
                </div>
              </div>
              <div className='flex'>
                <div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox' value='' className='sr-only peer' />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className='mb-3'>
                  <p className='text-sm text-slate-700 font-semibold ml-3'>
                    Latency
                  </p>
                  <p className='text-sm text-slate-500 pb-3 ml-3'>
                    Get notified when latency ceiling reached
                  </p>
                </div>
              </div>
              <div className='flex'>
                <div>
                  <label className='relative inline-flex items-center cursor-pointer'>
                    <input type='checkbox' value='' className='sr-only peer' />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className='mb-3'>
                  <p className='text-sm text-slate-700 font-semibold ml-3'>
                    Errors
                  </p>
                  <p className='text-sm text-slate-500 pb-3 ml-3'>
                    Get notified when a query reaches certain depth
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
