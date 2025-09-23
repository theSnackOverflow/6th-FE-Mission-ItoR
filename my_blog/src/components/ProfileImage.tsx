import G from '../assets/components/profile-image/G.png';

type ProfileImageProps = {
  src?: string;
  alt?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  onClick?: () => void;
};

export default function ProfileImage({
  src,
  alt = 'profile image',
  size = 'md',
  onClick,
}: ProfileImageProps) {
  const sizeMap = {
    xs: 'w-5 h-5',
    sm: 'w-10 h-10',
    md: 'w-16 h-16',
    lg: 'w-[90px] h-[90px]',
  };

  const fallbackSizeMap = {
    xs: 'hidden',
    sm: 'w-[16px] h-[16px]',
    md: 'w-[36px] h-[36px]',
    lg: 'w-[50px] h-[50px]',
  };

  return (
    <div
      onClick={onClick}
      className={`${sizeMap[size]} bg-black rounded-full overflow-hidden flex items-center justify-center`}
    >
      {src ? (
        <img
          src={src}
          onError={(e) => (e.currentTarget.src = G)}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : size !== 'xs' ? (
        <img
          src={G}
          onError={(e) => (e.currentTarget.src = G)}
          alt={alt}
          className={`${fallbackSizeMap[size]} object-contain`}
        />
      ) : null}
    </div>
  );
}
