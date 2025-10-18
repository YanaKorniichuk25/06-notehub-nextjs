"use client";
import css from "./Pagination.module.css";

interface Props {
  pageCount: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ pageCount, currentPage, onPageChange }: Props) {
  const pages = Array.from({ length: pageCount }, (_, i) => i + 1);

  return (
    <div className={css.pagination}>
      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? css.active : ""}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
