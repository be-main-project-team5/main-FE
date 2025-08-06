import { useState } from 'react';
import Input from './Input';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const iconStyles =
  'absolute top-1/2 right-0 z-10 mr-3 h-6 w-6 -translate-y-1/2';

function PasswordInput() {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const handleClick = (): void => setIsHidden(prev => !prev);

  return (
    <div className="relative">
      <Input
        type={isHidden ? 'password' : 'text'}
        placeholder="비밀번호 input"
      />
      {isHidden ? (
        <EyeIcon onClick={handleClick} className={iconStyles} />
      ) : (
        <EyeSlashIcon onClick={handleClick} className={iconStyles} />
      )}
    </div>
  );
}

export default PasswordInput;
