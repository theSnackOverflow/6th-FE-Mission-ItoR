import clsx from 'clsx';

interface PaginationItemProps {
  page: number;
  isActive?: boolean;
  onClick?: () => void;
}

const PaginationItem = ({ page, isActive, onClick }: PaginationItemProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'w-8 h-8 flex justify-center items-center px-[7px] py-[1px] text-sm font-roboto font-500 border rounded-xs cursor-pointer',
        isActive ? 'text-primary-6 bg-white border-primary-6 ' : '',
      )}
    >
      {page}
    </button>
  );
};

export { PaginationItem };

const PaginationPrev = () => {
  return <div></div>;
};

export { PaginationPrev };

const PaginationNext = () => {
  return <div></div>;
};

export { PaginationNext };
