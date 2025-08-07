import { useState } from 'react';
import clsx from 'clsx';

interface ToggleProps {
  checked?: boolean;
  onChange: () => void;
}

export default function ToggleButton({
  checked = false,
  onChange,
}: ToggleProps) {
  const [isOn, setIsOn] = useState<boolean>(checked);

  const toggleHandler = () => {
    setIsOn(!isOn);
    onChange();
  };

  return (
    <>
      <button
        type="button"
        className="relative cursor-pointer overflow-hidden rounded-full outline-3 outline-fuchsia-400"
        onClick={toggleHandler}
      >
        <div
          className={clsx(
            'h-4 w-8 transition-colors duration-300 ease-in-out',
            isOn ? 'bg-fuchsia-400' : 'bg-white',
          )}
        />
        <div
          className={clsx(
            'absolute top-0.75 left-1 h-2.5 w-2.5 rounded-full transition-all duration-300 ease-in-out',
            isOn ? 'translate-x-3.5 bg-white' : 'translate-x-0 bg-fuchsia-400',
          )}
        />
      </button>
    </>
  );
}
