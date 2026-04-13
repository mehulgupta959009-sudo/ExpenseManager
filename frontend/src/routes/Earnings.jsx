import { useDispatch, useSelector } from "react-redux";
import { fetchStatusActions } from "../store/fetchStatus";
import { itemsActions } from "../store/itemsSlice";
import FilterBar from "../components/FilterBar";
import {
  filterTransactions,
  calculateStats,
  getPeriodLabel,
} from "../services/filterUtils";

function Earnings() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.items);
  const filters = useSelector((state) => state.filters);

  const reloadTransactions = () => {
    return dispatch(fetchStatusActions.markStatusChanged());
  };

  const deleteEarning = (id) => {
    dispatch(itemsActions.removeitem(id));
  };

  // Filter to show only earnings
  const earnings = transactions.filter((t) => t.type === "earning");
  const filteredEarnings = filterTransactions(earnings, {
    ...filters,
    transactionType: "earning",
  });
  const stats = calculateStats(filteredEarnings);
  const periodLabel = getPeriodLabel(filters.timePeriod, filters.selectedDate);

  return (
    <div className="w-full mt-26 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            {earnings.length > 0 ? "All Earnings" : "No Earnings Yet"}
          </h1>
          <p className="text-gray-600 text-lg">
            {earnings.length > 0
              ? `Total earnings tracked: ₹${earnings.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0).toFixed(2)}`
              : "Start tracking your earnings to get started"}
          </p>
        </div>

        {/* Filters */}
        <FilterBar />

        {/* Stats Cards */}
        {filteredEarnings.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* Total Earnings */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-semibold text-sm mb-1">
                    Earnings ({periodLabel})
                  </p>
                  <p className="text-3xl font-black text-green-600">
                    ₹{stats.totalEarnings.toFixed(2)}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center text-2xl">
                  💰
                </div>
              </div>
            </div>

            {/* Earning Count */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-semibold text-sm mb-1">
                    Total Transactions
                  </p>
                  <p className="text-3xl font-black text-blue-600">
                    {stats.earningCount}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center text-2xl">
                  📊
                </div>
              </div>
            </div>

            {/* Average Earning */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 font-semibold text-sm mb-1">
                    Average Earning
                  </p>
                  <p className="text-3xl font-black text-purple-600">
                    ₹
                    {stats.earningCount > 0
                      ? (stats.totalEarnings / stats.earningCount).toFixed(2)
                      : "0"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center text-2xl">
                  📈
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Reload Button */}
        <button
          onClick={reloadTransactions}
          className="mb-6 px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
        >
          Reload Earnings
        </button>

        {/* Earnings List */}
        {filteredEarnings.length > 0 ? (
          <div className="space-y-3">
            {filteredEarnings.map((earning) => (
              <div
                key={earning._id}
                className="bg-white rounded-lg border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
              >
                <div className="flex items-center gap-4 p-4">
                  {/* Icon */}
                  <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-2xl flex-shrink-0">
                    💵
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <h3 className="text-lg font-bold text-gray-900 truncate">
                        {earning.productName ||
                          earning.description ||
                          "Untitled"}
                      </h3>
                      <span className="text-xs font-semibold text-gray-500 capitalize whitespace-nowrap">
                        {earning.category || "other"}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      {earning.date && (
                        <span className="flex items-center gap-1">
                          📅 {new Date(earning.date).toLocaleDateString()}
                        </span>
                      )}
                      {earning.description && (
                        <span className="text-gray-500 truncate">
                          {earning.description}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Amount and Delete */}
                  <div className="flex flex-col items-end gap-2 flex-shrink-0">
                    <p className="text-2xl font-black text-green-600">
                      +₹{parseFloat(earning.amount || 0).toFixed(2)}
                    </p>
                    <button
                      onClick={() => deleteEarning(earning._id)}
                      className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg border-2 border-dashed border-green-300">
            <svg
              className="w-20 h-20 text-green-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No earnings tracked yet
            </h2>
            <p className="text-gray-600 text-center max-w-sm">
              Start tracking your earnings by clicking the "Add Earning" button
              in the sidebar to get a better view of your income
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Earnings;
