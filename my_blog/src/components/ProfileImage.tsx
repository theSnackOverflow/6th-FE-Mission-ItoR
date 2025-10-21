import clsx from 'clsx';

type profileImageSize = 'xs' | 'sm' | 'md' | 'lg';

interface ProfileImageProps {
  src?: string;
  // alt?: string;
  size?: profileImageSize;
  onClick?: () => void;
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

const ProfileImage = ({ src, size = 'md', onClick }: ProfileImageProps) => {
  return (
    <div onClick={onClick}>
      {src ? (
        <img src={src} className={clsx('object-cover', sizeMap[size])} />
      ) : (
        <p
          className={clsx(
            'relative bg-black rounded-full text-white font-smooch font-normal',
            sizeMap[size],
            fontSizeMap[size],
          )}
        >
          <p
            className={clsx(
              'absolute top-1/2 -translate-y-1/2 left-5/12 -translate-x-2/5 ',
            )}
          >
            {size !== 'xs' ? 'G' : ''}
          </p>
        </p>
      )}
    </div>
  );
};

export default ProfileImage;
