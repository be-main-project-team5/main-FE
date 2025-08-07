import { useState } from 'react';
import DefaultInput from './DefaultInput';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { iconStyle } from './InputStyles';
import type { InputProps } from './types';

function PasswordInput({ label }: InputProps) {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleClick = (): void => setIsHidden(prev => !prev);

  return (
    <div className="relative">
      <DefaultInput type={isHidden ? 'password' : 'text'} label={label} />
      {isHidden ? (
        <EyeIcon onClick={handleClick} className={iconStyle} />
      ) : (
        <EyeSlashIcon onClick={handleClick} className={iconStyle} />
      )}
    </div>
  );
}

export default PasswordInput;
