import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDown, ChevronDown } from "lucide-react";
import Footer from "./Footer";

const STATUS_LABELS = {
  completed: { label: "COMPLETED", color: "bg-green-100 text-green-700" },
  incomplete: { label: "INCOMPLETE", color: "bg-yellow-100 text-yellow-700" },
  missing: { label: "MISSING", color: "bg-pink-100 text-pink-700" },
};

const MOCK_DATA = [
  { week: 1, date: "1 - 5 January, 2024", status: "completed", startDate: "2024-01-01", endDate: "2024-01-05" },
  { week: 2, date: "8 - 12 January, 2024", status: "completed", startDate: "2024-01-08", endDate: "2024-01-12" },
  { week: 3, date: "15 - 19 January, 2024", status: "incomplete", startDate: "2024-01-15", endDate: "2024-01-19" },
  { week: 4, date: "22 - 26 January, 2024", status: "completed", startDate: "2024-01-22", endDate: "2024-01-26" },
  { week: 5, date: "28 January - 1 February, 2024", status: "missing", startDate: "2024-01-28", endDate: "2024-02-01" },
  { week: 6, date: "5 - 9 February, 2024", status: "completed", startDate: "2024-02-05", endDate: "2024-02-09" },
  { week: 7, date: "12 - 16 February, 2024", status: "missing", startDate: "2024-02-12", endDate: "2024-02-16" },
  { week: 8, date: "19 - 23 February, 2024", status: "incomplete", startDate: "2024-02-19", endDate: "2024-02-23" },
  { week: 9, date: "26 Feb - 1 March, 2024", status: "completed", startDate: "2024-02-26", endDate: "2024-03-01" },
  { week: 10, date: "4 - 8 March, 2024", status: "completed", startDate: "2024-03-04", endDate: "2024-03-08" },
];

// Pagination component
function Pagination({ currentPage, totalItems, itemsPerPage, onPageChange, onItemsPerPageChange }) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
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
      {/* Items per page */}
      <div className="relative">
        <select
          value={itemsPerPage}
          onChange={(e) => { onItemsPerPageChange(Number(e.target.value)); onPageChange(1); }}
          className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-1.5 text-sm text-gray-700 bg-white focus:outline-none cursor-pointer"
        >
          {[5, 10, 20].map((n) => (
            <option key={n} value={n}>{n} per page</option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      </div>

      {/* Page controls */}
      <div className="inline-flex items-stretch overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm font-base text-[#4A5565] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-white disabled:text-[#4A5565]"
        >
          Previous
        </button>

        {getPageNumbers().map((page, idx) =>
          page === "..." ? (
            <span key={`ellipsis-${idx}`} className="flex   items-center justify-center border-l border-gray-200 px-4 py-2 text-sm font-base text-[#4A5565] select-none">...</span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={` border-l border-gray-200 px-4 py-2 text-sm font-base transition-colors ${
                currentPage === page
                  ? "bg-white text-[#1447E6]"
                  : "text-[#4A5565] hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className=" border-l border-gray-200 px-3 py-2 text-sm font-base text-[#4A5565] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:bg-white disabled:text-[#4A5565]"
        >
          Next
        </button>
      </div>
    </div>
  );
}

// Sort arrow icon
function SortIcon() {
  return (
    <ArrowDown className="inline-block ml-3  h-3 w-6 text-[#6B7280]" aria-hidden="true" />
  );
}

export default function TimesheetTable() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Filter
  const filtered = MOCK_DATA.filter((row) => {
    const statusMatch = !status || row.status === status;
    const monthMatch = !dateRange || row.startDate.startsWith(dateRange);
    return statusMatch && monthMatch;
  });

  // Paginate
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filtered.slice(startIndex, startIndex + itemsPerPage);

  const handleStatusChange = (val) => {
    setStatus(val);
    setCurrentPage(1);
  };

  const handleDateRangeChange = (val) => {
    setDateRange(val);
    setCurrentPage(1);
  };

  const handleActionClick = (row) => {
    const mode = row.status === "missing" ? "create" : row.status === "incomplete" ? "update" : "view";
    navigate("/week", {
      state: {
        mode,
        week: row,
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50  flex flex-col items-center pt-6 px-6">
      <div className="w-full max-w-7xl bg-white rounded-lg shadow-sm border border-gray-100 px-4 py-4">
        {/* Header */}
        <h2 className="text-2xl font-bold text-gray-900 mb-5">Your Timesheets</h2>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          {/* Date Range */}
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => handleDateRangeChange(e.target.value)}
              className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm text-gray-500 font-normal bg-white hover:border-gray-400 focus:outline-none cursor-pointer min-w-[130px]"
            >
              <option value="">Date Range</option>
              <option value="2024-01">January</option>
              <option value="2024-02">February</option>
              <option value="2024-03">March</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>

          {/* Status */}
          <div className="relative">
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value)}
              className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm text-gray-600 bg-white hover:border-gray-400 focus:outline-none cursor-pointer min-w-[110px]"
            >
              <option value="">Status</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
              <option value="missing">Missing</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-5">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-32">
                  WEEK # <SortIcon />
                </th>
                <th className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  DATE <SortIcon />
                </th>
                <th className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-44">
                  STATUS <SortIcon />
                </th>
                <th className="py-3 px-5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide w-32">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-sm text-gray-500">No timesheets found</td>
                </tr>
              ) : (
                paginatedData.map((row) => {
                  const s = STATUS_LABELS[row.status];
                  const actionLabel = row.status === "missing" ? "Create" : row.status === "incomplete" ? "Update" : "View";
                  return (
                    <tr key={row.week} className="hover:bg-gray-50 transition-colors">
                      <td className="py-3.5 px-5 text-sm font-normal text-gray-900">{row.week}</td>
                      <td className="py-3.5 px-5 text-sm text-gray-500">{row.date}</td>
                      <td className="py-3.5 px-5">
                        <span className={`inline-block px-3 py-1 text-xs font-medium rounded-md ${s.color}`}>
                          {s.label}
                        </span>
                      </td>
                      <td className="py-3.5 px-5 text-right">
                        <button
                          onClick={() => handleActionClick(row)}
                          className="text-blue-500 hover:text-blue-600 text-base font-normal"
                        >
                          {actionLabel}
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={filtered.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
        />
      </div>

      {/* Footer — outside the white card, on the gray page background */}
     <Footer/>
    </div>
  );
}