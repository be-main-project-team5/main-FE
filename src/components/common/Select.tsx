import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';

interface SelectProps {
  list: string[];
  placeholder?: string;
  size?: 'primary' | 'small';
  className?: string;
}

export default function Select({
  list,
  placeholder = '옵션을 선택하세요',
  size = 'primary',
  className,
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
      className={clsx(
        "relative rounded-lg border-1 border-gray-200 bg-white text-sm text-gray-500 before:absolute before:right-3 before:text-lg before:content-['⌵']",
        size === 'primary' && 'px-3 py-3 before:top-1',
        size === 'small' && 'px-2 py-2 before:top-0',
        className,
      )}
      onClick={() => setShowOptions(prev => !prev)}
      ref={selectRef}
    >
      <label className="">{currentValue}</label>
      {showOptions && (
        <ul
          className={clsx(
            'absolute left-0 z-100 w-full rounded-lg border-1 border-gray-200 bg-white p-1',
            size === 'primary' && 'top-12',
            size === 'small' && 'top-10',
          )}
        >
          {list.map((data, index) => (
            <li
              key={index}
              className={clsx(
                'text-black hover:bg-gray-50',
                data === currentValue && 'font-semibold',
                size === 'primary' && 'px-8 py-3',
                size === 'small' && 'px-2 py-2',
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
