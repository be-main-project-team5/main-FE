import { useState } from 'react';
import DefaultInput from './DefaultInput';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const iconStyles = 'text-gray-500 absolute bottom-2.75 z-10 right-3 h-6 w-6';

function PasswordInput() {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleClick = (): void => setIsHidden(prev => !prev);

  return (
    <div className="relative">
      <DefaultInput type={isHidden ? 'password' : 'text'} label="비밀번호" />
      {isHidden ? (
        <EyeIcon onClick={handleClick} className={iconStyles} />
      ) : (
        <EyeSlashIcon onClick={handleClick} className={iconStyles} />
      )}
    </div>
  );
}

export default PasswordInput;
