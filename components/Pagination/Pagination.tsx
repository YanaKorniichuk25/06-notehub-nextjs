"use client";

import ReactPaginate from "react-paginate";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      pageCount={pageCount}
      onPageChange={(selected) => onPageChange(selected.selected + 1)}
      forcePage={currentPage - 1}
      previousLabel="←"
      nextLabel="→"
      breakLabel="..."
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      containerClassName="pagination"
      activeClassName="active"
    />
  );
}
