import Modal from './Modal';
import Input from '../input';
import ToggleButton from '../ToggleButton';
import { useState } from 'react';
import { Button } from '../Button';

interface ScheduleFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function ScheduleFormModal({
  isOpen,
  onClose,
  title,
}: ScheduleFormModalProps) {
  const [isOn, setIsOn] = useState(false);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title={title}>
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
        <Button onClick={onClose}>저장하기</Button>
      </Modal>
    </>
  );
}
