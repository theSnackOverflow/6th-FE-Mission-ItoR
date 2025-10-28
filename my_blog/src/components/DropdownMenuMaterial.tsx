import clsx from 'clsx';

type DropdownMenuMaterialProp = {
  text: string;
  className?: string;
  onClick?: () => void;
};

const DropdownMenuMaterial = ({
  text,
  className,
  onClick,
}: DropdownMenuMaterialProp) => {
  return (
    <section>
      <button
        onClick={onClick}
        className={clsx(
          'w-40 h-10 px-3 py-2 text-sm font-normal text-left bg-white hover:bg-gray-90',
          className,
        )}
      >
        <div>{text}</div>
      </button>
    </section>
  );
};
export default DropdownMenuMaterial;
