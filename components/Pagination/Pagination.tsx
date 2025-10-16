import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onPageChange,
}) => (
  <div>
    <button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
      Prev
    </button>
    <span>
      {page} / {totalPages}
    </span>
    <button
      disabled={page >= totalPages}
      onClick={() => onPageChange(page + 1)}
    >
      Next
    </button>
  </div>
);

export default Pagination;
