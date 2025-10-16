import clsx from 'clsx';

type titleVariant = '32' | '16';

interface TextProps {
  title?: string;
  titleVariant: titleVariant;
  mainText: string;
}

const Text = ({ title, titleVariant = '16', mainText }: TextProps) => {
  return (
    <section className="min-w-[550px] h-fit px-4 py-3 bg-white">
      <div className="w-full h-full flex flex-col gap-3 line-clamp-1">
        {/* 32 - Title & 16 - Title */}
        {title && (
          <div
            className={clsx(
              'font-medium whitespace-pre-line text-truncate',
              titleVariant === '32' ? 'text-2xl' : 'text-[1rem]',
            )}
          >
            {title}
          </div>
        )}

        {/* Main Text */}
        <div className="text-sm font-light text-gray-20 whitespace-pre-line line-clamp-2">
          {mainText}
        </div>
      </div>
    </section>
  );
};

export default Text;
