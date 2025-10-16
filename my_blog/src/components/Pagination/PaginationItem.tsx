import clsx from 'clsx';

import VectorIcon from '@/assets/icons/navigate_before.svg?react';

type stateVariant = 'normal' | 'disabled';

interface PaginationItemProps {
  page: number;
  state?: stateVariant;
  isPressed?: boolean;
  onClick?: () => void;
}

interface PaginationArrowProps extends PaginationItemProps {
  direction?: 'prev' | 'next';
}

const PaginationItem = ({
  page,
  state = 'normal',
  isPressed = false,
  onClick,
}: PaginationItemProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-8 h-8 flex justify-center items-center px-[7px] py-[1px] text-sm font-roboto font-normal border rounded-xs ',
        state === 'disabled'
          ? 'text-black opacity-25 bg-neutral-3 border-neutral-5'
          : isPressed
            ? 'text-primary-6 bg-white border-primary-6'
            : 'text-black opacity-80 border-neutral-1 bg-neutral-1',
      )}
    >
      {page}
    </button>
  );
};

export { PaginationItem };

const PaginationArrow = ({
  state,
  isPressed = false,
  direction,
  onClick,
}: PaginationArrowProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-8 h-8 flex justify-center items-center bg-neutral-1 border rounded-xs ',
        state === 'disabled'
          ? 'text-neutral-5 border-neutral-5'
          : isPressed
            ? 'text-primary-6 border-primary-6'
            : 'text-black opacity-80 border-neutral-5',
      )}
    >
      <VectorIcon
        className={clsx(
          'w-6 h-6 cursor-pointer',
          direction === 'prev' ? '' : 'rotate-180',
        )}
      />
    </button>
  );
};

export { PaginationArrow };
