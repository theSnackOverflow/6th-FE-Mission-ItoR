import PolygonSVG from '@/assets/icons/polygon_1.svg?react';
import DropdownMenuMaterial from './DropdownMenuMaterial';
import clsx from 'clsx';

interface dropdownMenuProps {
  className?: string;
  menuItems: { text: string; className?: string; onClick?: () => void }[];
}

const DropdownMenu = ({ className, menuItems }: dropdownMenuProps) => {
  return (
    <section
      className={clsx(
        'absolute shadow-[0_2px_8px_0_rgba(0,0,0,0.10)]',
        className,
      )}
    >
      <div className="absolute -top-2 right-0 flex justify-end mr-1.5">
        <PolygonSVG className="text-white rotate-180" />
      </div>
      <div className="w-40 h-fit py-1 bg-white rounded-sm">
        {menuItems.map((item, idx) => (
          <DropdownMenuMaterial key={idx} {...item} />
        ))}
      </div>
    </section>
  );
};
export default DropdownMenu;
