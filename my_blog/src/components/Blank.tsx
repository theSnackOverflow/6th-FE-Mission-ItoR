import clsx from 'clsx';

type BlankVariant = '20' | '32' | '64';

interface BlankProps {
  variant?: BlankVariant;
}

const heightMap: Record<BlankVariant, string> = {
  '20': 'h-5',
  '32': 'h-8',
  '64': 'h-16',
};

const Blank = ({ variant = '20' }: BlankProps) => {
  return (
    <section>
      <div className={clsx('w-full min-w-mobile ', heightMap[variant])}></div>
    </section>
  );
};

export default Blank;
