type DropdownMenuMaterialProp = {
  text: string;
  onClick?: () => void;
};

const DropdownMenuMaterial = ({ text, onClick }: DropdownMenuMaterialProp) => {
  return (
    <section>
      <button
        onClick={onClick}
        className="w-40 h-10 px-3 py-2 
                  text-sm font-normal text-left
                bg-white hover:bg-gray-90"
      >
        <div>{text}</div>
      </button>
    </section>
  );
};
export default DropdownMenuMaterial;
