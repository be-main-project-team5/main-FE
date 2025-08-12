import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import type { NavigateAction } from 'react-big-calendar';

import { Button } from '../Button';

interface CalendarToolbarProps {
  label: string;
  onNavigate: (action: NavigateAction, newDate?: Date) => void;
}

function CalendarToolbar({ label, onNavigate }: CalendarToolbarProps) {
  return (
    <div className="flex w-full justify-between py-5">
      <Button
        size="sm"
        variant="outline"
        onClick={() => onNavigate('TODAY')}
        className="group border-none hover:border-none hover:bg-gray-300"
      >
        <span className="px-2.5 text-sm font-medium text-gray-400 group-hover:text-white">
          TODAY
        </span>
      </Button>
      <span className="text-lg font-semibold text-gray-700">{label}</span>
      <div className="flex w-fit gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onNavigate('PREV')}
          className="group border-none hover:border-none hover:bg-gray-300"
        >
          <ArrowLeftIcon className="size-5 text-gray-400 group-hover:text-white" />
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onNavigate('NEXT')}
          className="group border-none hover:border-none hover:bg-gray-300"
        >
          <ArrowRightIcon className="size-5 text-gray-400 group-hover:text-white" />
        </Button>
      </div>
    </div>
  );
}

export default CalendarToolbar;
