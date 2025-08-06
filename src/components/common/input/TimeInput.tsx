import { useEffect, useRef, useState } from 'react';
import DefaultInput from './DefaultInput';
import { ClockIcon } from '@heroicons/react/24/outline';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';

const iconStyles = 'text-gray-500 absolute bottom-2.75 z-10 right-3 h-6 w-6';

function TimeInput() {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        e.target instanceof Node &&
        !ref.current.contains(e.target)
      ) {
        setIsFocus(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <DefaultInput
        onClick={() => setIsFocus(true)}
        value={
          selectedHour || selectedMinute
            ? `${selectedHour ? selectedHour.padStart(2, '0') : '__'} : ${selectedMinute ? selectedMinute.padStart(2, '0') : '__'}`
            : ''
        }
        readOnly
        type="text"
        label="시간"
      />
      <ClockIcon className={iconStyles} />
      {isFocus && (
        <div className="flex w-full justify-center">
          <div className="absolute z-100 flex w-fit gap-[8px] bg-white p-5 shadow-lg">
            <div className="flex flex-col gap-[4px]">
              <span className="text-base font-medium text-gray-700">Hour</span>
              <input
                type="number"
                min={0}
                max={23}
                className="rounded-[6px] bg-gray-100 pt-4 pr-0.5 pb-5 pl-3 text-center text-4xl leading-none font-bold text-gray-800"
                value={selectedHour || ':'}
                onChange={e => setSelectedHour(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-[4px]">
              <span className="text-base font-medium text-gray-700">
                Minute
              </span>
              <input
                type="number"
                min={0}
                max={59}
                value={selectedMinute || ':'}
                onChange={e => setSelectedMinute(e.target.value)}
                className="rounded-[6px] bg-gray-100 pt-4 pr-0.5 pb-5 pl-3 text-center text-4xl leading-none font-bold text-gray-800"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeInput;
