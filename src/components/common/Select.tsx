import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface SelectProps {
  list: string[];
  placeholder?: string;
}

export default function Select({
  list,
  placeholder = '옵션을 선택하세요',
}: SelectProps) {
  const [currentValue, setCurrentValue] = useState<string>(placeholder);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const handleOnChangeSelectValue = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.dataset.value;
    if (value) {
      setCurrentValue(value);
      setShowOptions(false);
    }
    e.stopPropagation();
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        selectRef.current &&
        e.target instanceof Node &&
        !selectRef.current.contains(e.target)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectRef]);

  return (
    <div
      className="relative rounded-lg border-1 border-gray-200 bg-white px-3 py-3 text-sm text-gray-500 before:absolute before:top-1 before:right-3 before:text-lg before:content-['⌵']"
      onClick={() => setShowOptions(prev => !prev)}
      ref={selectRef}
    >
      <label className="">{currentValue}</label>
      {showOptions && (
        <ul className="absolute top-12 left-0 w-full rounded-lg border-1 border-gray-200 bg-white p-1">
          {list.map((data, index) => (
            <li
              key={index}
              className={clsx(
                'px-8 py-3 text-black hover:bg-gray-50',
                data === currentValue && 'font-semibold',
                index === 0 && 'rounded-t-md',
                index === list.length - 1 && 'rounded-b-md',
              )}
              data-value={data}
              onClick={handleOnChangeSelectValue}
            >
              {data}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
