import { useSelector } from "react-redux";
import FavitemsView from "../components/FavItemsView";
import { Link } from "react-router-dom";

function Favorites() {
  const itemDetails = useSelector((state) => {
    return state.favorites;
  });

  const logStatus = useSelector((state) => {
    return state.uiStatus;
  });

  // Calculate totals from items
  const calculateTotals = () => {
    if (!itemDetails.items || itemDetails.items.length === 0) {
      return { totalExpense: 0, totalIncome: 0, netBalance: 0 };
    }

    const totalExpense = itemDetails.items
      .filter(
        (item) =>
          item.itemType?.toLowerCase().includes("expense") ||
          item.itemType?.toLowerCase().includes("spent"),
      )
      .reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

    const totalIncome = itemDetails.items
      .filter(
        (item) =>
          item.itemType?.toLowerCase().includes("earning") ||
          item.itemType?.toLowerCase().includes("income"),
      )
      .reduce((sum, item) => sum + (parseFloat(item.price) || 0), 0);

    const netBalance = totalIncome - totalExpense;

    return { totalExpense, totalIncome, netBalance };
  };

  const { totalExpense, totalIncome, netBalance } = calculateTotals();

  if (logStatus.login === false) {
    return (
      <div className="w-full mt-20 pb-10 flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="max-w-md w-full px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-black text-slate-900 mb-3">
            Sign in Required
          </h1>
          <p className="text-slate-600 mb-8 text-lg">
            Please log in to view your transaction history.
          </p>
          <Link
            to="/signup"
            className="inline-block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            Go to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-20 pb-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-black text-slate-900 mb-2">
                Transactions
              </h1>
              <p className="text-slate-600 text-lg">
                {itemDetails.items && itemDetails.items.length > 0
                  ? `${itemDetails.items.length} transaction${itemDetails.items.length !== 1 ? "s" : ""} saved`
                  : "No transactions yet"}
              </p>
            </div>
            <Link
              to="/additem"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add New
            </Link>
          </div>
        </div>

        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Total Expense Card */}
            <div className="bg-gradient-to-br from-red-50 to-rose-50 rounded-xl p-6 border border-red-200 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-red-900">
                  Total Spent
                </h3>
                <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 13H5v6h14v-6z"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-black text-red-600">
                ${totalExpense.toFixed(2)}
              </p>
              <p className="text-xs text-red-700 mt-2">Money spent</p>
            </div>

            {/* Total Income Card */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-6 border border-emerald-200 shadow-md hover:shadow-lg transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-emerald-900">
                  Total Earned
                </h3>
                <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <svg
                    className="w-6 h-6 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-3xl font-black text-emerald-600">
                ${totalIncome.toFixed(2)}
              </p>
              <p className="text-xs text-emerald-700 mt-2">Money earned</p>
            </div>

            {/* Net Balance Card */}
            <div
              className={`bg-gradient-to-br rounded-xl p-6 border shadow-md hover:shadow-lg transition-all ${
                netBalance >= 0
                  ? "from-blue-50 to-cyan-50 border-blue-200"
                  : "from-orange-50 to-amber-50 border-orange-200"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-semibold text-slate-900">
                  Net Balance
                </h3>
                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    netBalance >= 0 ? "bg-blue-100" : "bg-orange-100"
                  }`}
                >
                  <svg
                    className={`w-6 h-6 ${
                      netBalance >= 0 ? "text-blue-600" : "text-orange-600"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
              </div>
              <p
                className={`text-3xl font-black ${
                  netBalance >= 0 ? "text-blue-600" : "text-orange-600"
                }`}
              >
                ${netBalance.toFixed(2)}
              </p>
              <p
                className={`text-xs mt-2 ${
                  netBalance >= 0 ? "text-blue-700" : "text-orange-700"
                }`}
              >
                {netBalance >= 0 ? "You're in surplus" : "You're in deficit"}
              </p>
            </div>
          </div>
        </div>

        {itemDetails.items && itemDetails.items.length > 0 ? (
          <div className="space-y-3">
            {itemDetails.items.map((item) => (
              <FavitemsView key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl border-2 border-dashed border-slate-300">
            <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
              <svg
                className="w-8 h-8 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-700 mb-2">
              No transactions yet
            </h2>
            <p className="text-slate-500 mb-6 text-center max-w-sm">
              Start tracking your expenses and income by adding your first
              transaction.
            </p>
            <Link
              to="/additem"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              Add First Transaction
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
