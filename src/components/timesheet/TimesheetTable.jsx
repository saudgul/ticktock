import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer";
import API from "../../services/api";
import TimesheetFilters from "./TimesheetFilters";
import TimesheetPagination from "./TimesheetPagination";
import TimesheetSortIcon from "./TimesheetSortIcon";
import { MONTH_OPTIONS, STATUS_LABELS } from "./constants";

function isMonthSelected(week, monthKey) {
  if (!monthKey) {
    return true;
  }

  const [year, month] = monthKey.split("-").map(Number);
  const monthStart = new Date(year, month - 1, 1);
  const monthEnd = new Date(year, month, 0);
  const weekStart = new Date(week.startDate);
  const weekEnd = new Date(week.endDate);

  return weekStart <= monthEnd && weekEnd >= monthStart;
}


export default function TimesheetTable() {
  const navigate = useNavigate();
  const [dateRange, setDateRange] = useState("");
  const [status, setStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError("");

    API.getTimesheets({ status })
      .then((response) => {
        if (!active) {
          return;
        }

        const filteredRows = response.data.filter((week) => isMonthSelected(week, dateRange));
        setRows(filteredRows);
      })
      .catch((requestError) => {
        if (!active) {
          return;
        }

        setError(requestError.message || "Failed to load timesheets");
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [dateRange, status]);

  const filtered = rows;

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

        <TimesheetFilters
          dateRange={dateRange}
          status={status}
          monthOptions={MONTH_OPTIONS}
          onDateRangeChange={handleDateRangeChange}
          onStatusChange={handleStatusChange}
        />

        {/* Table */}
        <div className="border border-gray-200 rounded-lg overflow-hidden mb-5">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-32">
                  WEEK # <TimesheetSortIcon />
                </th>
                <th className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  DATE <TimesheetSortIcon />
                </th>
                <th className="py-3 px-5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide w-44">
                  STATUS <TimesheetSortIcon />
                </th>
                <th className="py-3 px-5 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide w-32">
                  ACTIONS
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-sm text-gray-500">Loading timesheets...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={4} className="py-10 text-center text-sm text-red-500">{error}</td>
                </tr>
              ) : paginatedData.length === 0 ? (
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
        <TimesheetPagination
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