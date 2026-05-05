import { ChevronDown } from "lucide-react";

export default function TimesheetPagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let page = 1; page <= totalPages; page += 1) {
        pages.push(page);
      }
    } else {
      pages.push(1, 2, 3, 4, 5);
      if (currentPage > 5 && currentPage < totalPages - 1) {
        pages.push("...", currentPage, "...");
      } else {
        pages.push("...");
      }
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex items-center justify-between mt-2">
      <div className="relative">
        <select
          value={itemsPerPage}
          onChange={(event) => {
            onItemsPerPageChange(Number(event.target.value));
            onPageChange(1);
          }}
          className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-1.5 text-sm text-gray-700 bg-white focus:outline-none cursor-pointer"
        >
          {[5, 10, 20].map((itemCount) => (
            <option key={itemCount} value={itemCount}>
              {itemCount} per page
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      </div>

      <div className="inline-flex items-stretch overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-base text-[#4A5565] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-white disabled:text-[#4A5565]"
        >
          Previous
        </button>

        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="flex items-center justify-center border-l border-gray-200 px-4 py-2 text-sm font-base text-[#4A5565] select-none"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`border-l border-gray-200 px-4 py-2 text-sm font-base transition-colors ${
                currentPage === page ? "bg-white text-[#1447E6]" : "text-[#4A5565] hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ),
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="border-l border-gray-200 px-3 py-2 text-sm font-base text-[#4A5565] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-white disabled:text-[#4A5565]"
        >
          Next
        </button>
      </div>
    </div>
  );
}
