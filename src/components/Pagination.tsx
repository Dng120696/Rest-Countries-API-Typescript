function Pagination({
  totalPages,
  startPage,
  onPageChange,
}: {
  totalPages: number;
  startPage: number;
  onPageChange(page: number): void;
}) {
  return (
    <>
      {totalPages > 1 && (
        <div
          className="flex items-center text-center justify-center
         flex-wrap gap-5 text-2xl"
        >
          <button
            onClick={() => onPageChange(startPage - 1)}
            disabled={startPage === 1}
            className={`rounded-lg py-2 px-4 font-bold  ${
              startPage === 1
                ? "bg-gray-200   dark:bg-gray-300 text-gray-400  cursor-not-allowed "
                : "bg-gray-200 dark:bg-gray-500 dark:text-gray-200 text-gray-600 "
            }`}
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
              className={` px-4 py-2   rounded-lg font-medium ${
                index + 1 === startPage
                  ? "font-bold text-gray-200 dark:text-gray-600 bg-gray-500 dark:bg-gray-200   "
                  : " bg-gray-200  dark:text-gray-200 dark:bg-gray-500"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(startPage + 1)}
            disabled={startPage === totalPages}
            className={`rounded-lg py-2 px-4 font-bold   ${
              startPage === totalPages
                ? "bg-gray-200   dark:bg-gray-300 text-gray-400  cursor-not-allowed "
                : "bg-gray-200 dark:bg-gray-500 dark:text-gray-200 text-gray-600 "
            }`}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}

export default Pagination;
