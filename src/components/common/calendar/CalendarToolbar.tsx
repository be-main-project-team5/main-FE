import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

import { Button } from '../Button';

interface CalendarToolbarProps {
  year: number;
  month: number;
  handleMovePrevMonth: () => void;
  handleMoveNextMonth: () => void;
  handleMoveCurrentMonth: () => void;
}

function CalendarToolbar({
  year,
  month,
  handleMovePrevMonth,
  handleMoveNextMonth,
  handleMoveCurrentMonth,
}: CalendarToolbarProps) {
  return (
    <div className="flex w-full justify-between py-5">
      <Button
        size="sm"
        variant="outline"
        onClick={handleMoveCurrentMonth}
        className="group border-none hover:border-none hover:bg-gray-300"
      >
        <span className="px-2.5 text-sm font-medium text-gray-400 group-hover:text-white">
          TODAY
        </span>
      </Button>
      <span className="text-xl font-semibold text-gray-700">
        {year}년 {month}월
      </span>
      <div className="flex w-fit gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handleMovePrevMonth}
          className="group border-none hover:border-none hover:bg-gray-300"
        >
          <ArrowLeftIcon className="size-5 text-gray-400 group-hover:text-white" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={handleMoveNextMonth}
          className="group border-none hover:border-none hover:bg-gray-300"
        >
          <ArrowRightIcon className="size-5 text-gray-400 group-hover:text-white" />
        </Button>
      </div>
    </div>
  );
}

export default CalendarToolbar;
