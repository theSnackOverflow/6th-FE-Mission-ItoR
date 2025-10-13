import PolygonSVG from '@/assets/icons/polygon_1.svg?react';

import DropdownMenuMaterial from './DropdownMenuMaterial';

const DropdownMenu = () => {
  return (
    <section className="relative">
      <div className="absolute -top-2 right-0 flex justify-end mr-1.5">
        <PolygonSVG className="text-white rotate-180" />
      </div>
      <div className="w-40 h-fit py-1 bg-white rounded-sm">
        <DropdownMenuMaterial text={'menu 1'} />
        <DropdownMenuMaterial text={'menu 1'} />
        <DropdownMenuMaterial text={'menu 1'} />
      </div>
    </section>
  );
};
export default DropdownMenu;
