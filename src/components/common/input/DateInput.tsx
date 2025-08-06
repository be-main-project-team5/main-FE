import { useEffect, useRef, useState } from 'react';
import DefaultInput from './DefaultInput';
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import {
  type ChevronProps,
  DayPicker,
  getDefaultClassNames,
} from 'react-day-picker';
import 'react-day-picker/style.css';

const iconStyles = 'text-gray-500 absolute bottom-2.75 z-10 right-3 h-6 w-6';

const CustomChevron = ({ orientation, ...rest }: ChevronProps) => {
  return orientation === 'left' ? (
    <ChevronLeftIcon {...rest} className="h-5 w-5 text-fuchsia-500" />
  ) : (
    <ChevronRightIcon {...rest} className="h-5 w-5 text-fuchsia-500" />
  );
};

function DateInput() {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const defaultClassNames = getDefaultClassNames();
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
        value={selectedDate?.toLocaleDateString()}
        readOnly
        type="text"
        label="날짜"
      />
      <CalendarDaysIcon className={iconStyles} />
      {isFocus && (
        <div className="flex w-full justify-center">
          <div className="absolute w-fit">
            <DayPicker
              animate
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={{ before: new Date() }}
              classNames={{
                today: `text-fuchsia-500`,
                selected: `bg-fuchsia-400 text-white rounded-full`,
                root: `${defaultClassNames.root} shadow-lg p-5 bg-white z-100`,
              }}
              components={{
                Chevron: CustomChevron,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default DateInput;
