import PolygonSVG from '@/assets/icons/polygon_1.svg?react';
import DeleteSVG from '@/assets/icons/delete_forever.svg?react';

const Menu = () => {
  return (
    <section className="flex flex-col justify-center items-center">
      <div className="w-[72px] h-[48px] drop-shadow-xl bg-white rounded-sm flex justify-center items-center">
        <DeleteSVG />
      </div>
      <PolygonSVG className="text-white" />
    </section>
  );
};

export default Menu;
