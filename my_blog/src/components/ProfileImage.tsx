import clsx from 'clsx';

import AddProfileImg from '../assets/icons/add-profile-image.svg?react';
import { useRef } from 'react';

type profileImageSize = 'xs' | 'sm' | 'md' | 'lg';

interface ProfileImageProps {
  src?: string;
  // alt?: string;
  size?: profileImageSize;
  isEdit?: boolean;
  onClick?: () => void;
  onUpload?: (file: File) => void;
}

const sizeMap: Record<profileImageSize, string> = {
  xs: 'w-5 h-5',
  sm: 'w-10 h-10',
  md: 'w-16 h-16',
  lg: 'w-[90px] h-[90px]',
};

const fontSizeMap: Record<profileImageSize, string> = {
  xs: '',
  sm: 'text-[16px]',
  md: 'text-[36px]',
  lg: 'text-[50px]',
};

const ProfileImage = ({
  src,
  size = 'md',
  isEdit = false,
  onClick,
  onUpload,
}: ProfileImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    onUpload?.(file);
  };

  return (
    <div className="relative w-fit" onClick={onClick}>
      {src ? (
        <img
          src={src}
          className={clsx('object-cover rounded-full', sizeMap[size])}
        />
      ) : (
        <p
          className={clsx(
            'relative bg-black rounded-full text-white font-smooch font-normal',
            sizeMap[size],
            fontSizeMap[size],
          )}
        >
          <span
            className={clsx(
              'absolute top-1/2 -translate-y-1/2 left-5/12 -translate-x-2/5 ',
            )}
          >
            {size !== 'xs' ? 'G' : ''}
          </span>
        </p>
      )}
      {isEdit && (
        <button
          className="absolute bottom-0 right-0 bg-black border-2 border-white rounded-full"
          onClick={handleClickUpload}
        >
          <AddProfileImg className="text-white" />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChangeFile}
          />
        </button>
      )}
    </div>
  );
};

export default ProfileImage;
