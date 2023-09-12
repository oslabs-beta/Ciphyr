import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

export default function SuspiciousLog() {
  return (
    <>
      <div>
        <div className='absolute top-0 right-1 z-[2]'>
          <button>
            <FontAwesomeIcon className="" icon={faCircleXmark} />
          </button>
        </div>
        <div className='flex flex-col border rounded relative space-y-2 px-2 py-2'>
          <div id='logID'>ID:</div>
          <div id='depth'>Depth:</div>
          <div id='latency'>Latency:</div>
          <div id='see-more' className='flex flex-row-reverse'>
            <button>
              <FontAwesomeIcon className='' icon={faAnglesRight} fade />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
