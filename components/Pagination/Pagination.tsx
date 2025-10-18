import css from "./Pagination.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  setCurrentPage,
}: Props) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className={css.pagination}>
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(currentPage - 1)}
        className={css.prev}
      >
        Prev
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={page === currentPage ? css.active : ""}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(currentPage + 1)}
        className={css.next}
      >
        Next
      </button>
    </div>
  );
}
