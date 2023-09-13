import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';

export default function SuspiciousLog(props) {
  return (
    <>
      <div>
        <div className='absolute top-0 right-1 z-[2]'>
          <button>
            <FontAwesomeIcon className="" icon={faCircleXmark} />
          </button>
        </div>
        <div className='flex text-sm flex-col border shadow rounded relative space-y-1 px-2 py-2'>
          <div id='logID'>ID: {props.id}</div>
          <div id='depth'>Depth: {props.depth}</div>
          <div id='latency'>Latency: {props.latency}</div>
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
