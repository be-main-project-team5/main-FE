import { useState } from 'react';
import Input from './input';
import ToggleButton from './ToggleButton';
import { Button } from './Button';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function Modal() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="relative flex max-w-100 flex-col items-center gap-2 rounded-xl px-6 py-8 shadow-lg">
      <XMarkIcon className={'absolute top-4 right-4 w-5'} />
      <h2 className="my-2 text-xl font-semibold">일정 등록</h2>
      <div className="flex w-full flex-col gap-2">
        <Input type="date" label="날짜" />
        <Input type="time" label="시간" />
        <Input type="text" label="장소" />
        <Input type="textarea" label="설명" />
        <div className="mr-[2px] flex items-center justify-between">
          <p>공개 여부</p>
          <ToggleButton
            checked={isOn}
            onChange={nextState => setIsOn(nextState)}
          />
        </div>
      </div>
      <Button>저장하기</Button>
    </div>
  );
}
