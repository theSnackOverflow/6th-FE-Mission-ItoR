import { useState } from 'react';
import Pagination from '../../components/Pagination/Pagination';

const TestForPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <main className="flex flex-col items-center justify-center h-screen gap-6 bg-[#E2DCFF]">
      <h1 className="text-lg font-semibold">현재 페이지: {currentPage}</h1>
      <Pagination
        totalPages={5}
        initialPage={1}
        onChange={(page) => setCurrentPage(page)}
      />
    </main>
  );
};

export { TestForPagination };
