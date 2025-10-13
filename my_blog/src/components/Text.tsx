import clsx from 'clsx';

type titleVariant = '32' | '16';

interface TextProps {
  title?: string;
  titleVariant: titleVariant;
  mainText: string;
}

const Text = ({ title, titleVariant, mainText }: TextProps) => {
  return (
    <section className="w-[688px] h-fit px-4 py-3 bg-white">
      <div className="w-full h-full flex flex-col gap-3">
        {/* 32 - Title & 16 - Title */}
        <div
          className={clsx(
            'font-medium whitespace-pre-line',
            titleVariant === '32' ? 'text-2xl' : 'text-[1rem]',
          )}
        >
          {title}
        </div>

        {/* Main Text */}
        <div className="text-sm font-light text-[#333] whitespace-pre-line">
          {mainText}
        </div>
      </div>
    </section>
  );
};

export default Text;
