"use client";

import css from "./Pagination.module.css";

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
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <ul className={css.pagination}>
      {pages.map((page) => (
        <li
          key={page}
          className={page === currentPage ? css.active : ""}
          onClick={() => onPageChange(page)}
        >
          <a>{page}</a>
        </li>
      ))}
    </ul>
  );
}
