import { useRef, useState } from 'react';
import DefaultInput from './DefaultInput';
import { ClockIcon } from '@heroicons/react/24/outline';
import { iconStyle, timeStyle } from './input.styles';
import type { InputProps } from './input.types';
import { useClickOutside } from '@/hooks/useClickOutside';

function TimeInput({ label, className, ...rest }: InputProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [selectedHour, setSelectedHour] = useState<string | null>(null);
  const [selectedMinute, setSelectedMinute] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, setIsFocus);

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
        label={label}
        className={className}
        {...rest}
      />
      <ClockIcon className={iconStyle} />
      {isFocus && (
        <div className="flex w-full justify-center">
          <div className="absolute z-100 flex w-fit gap-[8px] bg-white p-5 shadow-lg">
            <div className="flex flex-col gap-[4px]">
              <span className="text-base font-medium text-gray-700">Hour</span>
              <input
                type="number"
                min={0}
                max={23}
                className={timeStyle}
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
                className={timeStyle}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TimeInput;
