import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../store/filterSlice";

function FilterBar() {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
      <h3 className="text-lg font-bold text-gray-900 mb-4">Filters</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Time Period Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Time Period
          </label>
          <select
            value={filters.timePeriod}
            onChange={(e) =>
              dispatch(filterActions.setTimePeriod(e.target.value))
            }
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-900"
          >
            <option value="all">All Time</option>
            <option value="daily">Daily (Today)</option>
            <option value="weekly">Weekly (Last 7 Days)</option>
            <option value="monthly">Monthly (Last 30 Days)</option>
          </select>
        </div>

        {/* Transaction Type Filter */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Type
          </label>
          <select
            value={filters.transactionType}
            onChange={(e) =>
              dispatch(filterActions.setTransactionType(e.target.value))
            }
            className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-900"
          >
            <option value="both">Both (Expenses & Earnings)</option>
            <option value="expense">Expenses Only</option>
            <option value="earning">Earnings Only</option>
          </select>
        </div>

        {/* Date Picker (for daily view) */}
        {filters.timePeriod === "daily" && (
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Select Date
            </label>
            <input
              type="date"
              value={filters.selectedDate}
              onChange={(e) =>
                dispatch(filterActions.setSelectedDate(e.target.value))
              }
              className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none text-gray-900"
            />
          </div>
        )}
      </div>

      {/* Reset Button */}
      <button
        onClick={() => dispatch(filterActions.resetFilters())}
        className="mt-4 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition-all duration-200"
      >
        Reset Filters
      </button>
    </div>
  );
}

export default FilterBar;
