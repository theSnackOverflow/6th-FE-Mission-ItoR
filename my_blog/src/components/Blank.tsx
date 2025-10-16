import clsx from 'clsx';

type blankVariant = '20' | '32' | '64';

interface blankProps {
  variant?: blankVariant;
}

const heightMap: Record<blankVariant, string> = {
  '20': 'h-5',
  '32': 'h-8',
  '64': 'h-16',
};

const Blank = ({ variant = '20' }: blankProps) => {
  return (
    <section>
      <div
        className={clsx('w-full min-w-mobile bg-white', heightMap[variant])}
      ></div>
    </section>
  );
};

export default Blank;
