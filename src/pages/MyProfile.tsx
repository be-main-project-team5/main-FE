import { useState } from 'react';

import FavoriteIdols from '@/components/mypage/FavoriteIdols';
import Profile from '@/components/mypage/Profile';
import ProfileEdit from '@/components/mypage/ProfileEdit';

export default function MyProfile() {
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const toggleEditMode = () => {
    setIsEditingProfile(prev => !prev);
  };

  return (
    <>
      {isEditingProfile ? (
        <ProfileEdit onCancelEdit={toggleEditMode} />
      ) : (
        <>
          <Profile onEditClick={toggleEditMode} />
          <FavoriteIdols />
        </>
      )}
    </>
  );
}
