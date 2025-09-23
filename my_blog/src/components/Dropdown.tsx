import { useState } from 'react';

interface DropdownMenuProps {
  variant?: 'arrow' | 'material';
  items: { label: string; onClick?: () => void }[];
}

function DropdownMenu({ variant = 'arrow', items }: DropdownMenuProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        메뉴 열기
      </button>

      {open &&
        (variant === 'arrow' ? (
          <div className="absolute mt-2 w-40 rounded-md shadow-lg bg-white">
            {/* 풍선툴팁 스타일 */}
            <div className="relative dropdown p-2">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={item.onClick}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="absolute mt-2 w-40 rounded-md border border-gray-300 shadow-md bg-white">
            <div className="p-2">
              {items.map((item, idx) => (
                <div
                  key={idx}
                  onClick={item.onClick}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {item.label}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default DropdownMenu;
