import { ChevronDown } from "lucide-react";

export default function TimesheetFilters({
  dateRange,
  status,
  monthOptions,
  onDateRangeChange,
  onStatusChange,
}) {
  return (
    <div className="flex gap-2 mb-6">
      <div className="relative">
        <select
          value={dateRange}
          onChange={(event) => onDateRangeChange(event.target.value)}
          className="appearance-none border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm text-gray-500 font-normal bg-white hover:border-gray-400 focus:outline-none cursor-pointer min-w-[130px]"
        >
          {monthOptions.map((option) => (
            <option key={option.value || "all"} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      </div>

      <div className="relative">
        <select
          value={status}
          onChange={(event) => onStatusChange(event.target.value)}
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
  );
}
