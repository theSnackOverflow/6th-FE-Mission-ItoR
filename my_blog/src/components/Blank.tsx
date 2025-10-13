import clsx from 'clsx';

type blankVariant = '20' | '32' | '64';

interface BlankProps {
  variant?: blankVariant;
}

const Blank = ({ variant = '20' }: BlankProps) => {
  const heightMap: Record<blankVariant, string> = {
    '20': 'h-5',
    '32': 'h-8',
    '64': 'h-16',
  };

  return (
    <section>
      <div className={clsx('w-[688px] bg-white', heightMap[variant])}></div>
    </section>
  );
};

export default Blank;
