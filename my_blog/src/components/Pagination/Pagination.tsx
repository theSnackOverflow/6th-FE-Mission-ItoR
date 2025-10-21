import { useState } from 'react';
import { PaginationItem, PaginationArrow } from './PaginationItem';

interface PaginationProps {
  totalPages: number;
  initialPage?: number;
  onChange?: (page: number) => void;
}

const Pagination = ({
  totalPages,
  initialPage = 1,
  onChange,
}: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    onChange?.(page);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* 이전 버튼 */}
      <PaginationArrow
        direction="prev"
        state={currentPage === 1 ? 'disabled' : 'normal'}
        onClick={() => handlePageChange(currentPage - 1)}
        page={0}
      />

      {/* 페이지 번호 버튼 */}
      {Array.from({ length: totalPages }, (_, i) => (
        <PaginationItem
          key={i + 1}
          page={i + 1}
          state={i + 1 === currentPage ? 'normal' : 'normal'}
          isPressed={i + 1 === currentPage}
          onClick={() => handlePageChange(i + 1)}
        />
      ))}

      {/* 다음 버튼 */}
      <PaginationArrow
        direction="next"
        state={currentPage === totalPages ? 'disabled' : 'normal'}
        onClick={() => handlePageChange(currentPage + 1)}
        page={0}
      />
    </div>
  );
};

export default Pagination;
