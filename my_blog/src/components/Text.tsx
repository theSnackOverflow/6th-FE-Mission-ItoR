import clsx from 'clsx';

type titleVariant = '32' | '16';

interface TextProps {
  title?: string;
  titleVariant: titleVariant;
  mainText: string;
}

const Text = ({ title, titleVariant = '16', mainText }: TextProps) => {
  return (
    <section className="w-full min-w-[260px] h-fit px-4 py-3 bg-white flex-1">
      <div className="w-full h-fit flex flex-col gap-3">
        {/* 32 - Title & 16 - Title */}
        {title && (
          <div
            className={clsx(
              'font-medium whitespace-pre-line line-clamp-1',
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
