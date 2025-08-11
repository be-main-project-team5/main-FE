import 'react-day-picker/style.css';

import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline';
import { useRef, useState } from 'react';
import {
  type ChevronProps,
  DayPicker,
  getDefaultClassNames,
} from 'react-day-picker';

import { useClickOutside } from '@/hooks/useClickOutside';

import DefaultInput from './DefaultInput';
import { iconStyle } from './input.styles';
import type { InputProps } from './input.types';

function CustomChevron({ orientation, ...rest }: ChevronProps) {
  return orientation === 'left' ? (
    <ChevronLeftIcon {...rest} className="h-5 w-5 text-fuchsia-500" />
  ) : (
    <ChevronRightIcon {...rest} className="h-5 w-5 text-fuchsia-500" />
  );
}

function DateInput({ label, className, ...rest }: InputProps) {
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>();
  const defaultClassNames = getDefaultClassNames();
  const ref = useRef<HTMLDivElement>(null);

  useClickOutside(ref, setIsFocus);

  return (
    <div ref={ref} className="relative" {...rest}>
      <DefaultInput
        onClick={() => setIsFocus(true)}
        value={selectedDate?.toLocaleDateString()}
        readOnly
        type="text"
        label={label}
        className={className}
        {...rest}
      />
      <CalendarDaysIcon className={iconStyle} />
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
