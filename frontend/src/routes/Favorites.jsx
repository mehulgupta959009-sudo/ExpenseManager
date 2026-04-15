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
