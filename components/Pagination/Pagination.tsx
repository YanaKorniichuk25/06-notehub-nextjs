"use client";

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
    <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
      {pages.map((page) => (
        <button
          key={page}
          style={{ fontWeight: page === currentPage ? "bold" : "normal" }}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
}
