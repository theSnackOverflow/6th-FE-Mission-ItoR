import PolygonSVG from '@/assets/icons/polygon_1.svg?react';
import DeleteSVG from '@/assets/icons/delete_forever.svg?react';

interface MenuProps {
  top: number;
  left: number;
  onDelete: () => void;
  onClose: () => void;
}

const Menu = ({ top, left, onDelete, onClose }: MenuProps) => {
  return (
    <section
      className="absolute top-0 z-50 flex flex-col justify-center items-center"
      style={{ top: top, left: left }}
    >
      <div
        className="w-[72px] h-12 px-4 py-1 
                  flex justify-center items-center 
                bg-white rounded-sm shadow-lg"
      >
        <DeleteSVG
          className="hover:text-negative cursor-pointer"
          onClick={() => {
            onDelete();
            onClose();
          }}
        />
      </div>
      <PolygonSVG className="text-white" />
    </section>
  );
};

export default Menu;
