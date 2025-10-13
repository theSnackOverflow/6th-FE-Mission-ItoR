import PolygonSVG from '@/assets/icons/polygon_1.svg?react';
import DeleteSVG from '@/assets/icons/delete_forever.svg?react';

const Menu = () => {
  return (
    <section className="flex flex-col justify-center items-center">
      <div
        className="w-[72px] h-12 px-4 py-1 
                  flex justify-center items-center 
                bg-white rounded-sm shadow-lg"
      >
        <DeleteSVG />
      </div>
      <PolygonSVG className="text-white" />
    </section>
  );
};

export default Menu;
