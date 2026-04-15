import { useDispatch, useSelector } from "react-redux";
import { itemToAdd } from "../services/managefetching";
import { fetchStatusActions } from "../store/fetchStatus";
import { Link } from "react-router-dom";

function AddingItem() {
  const dispatch = useDispatch();

  const addingitemHandler = (e) => {
    itemToAdd(e).then((data) => {
      console.log(data);
      dispatch(fetchStatusActions.markStatusChanged());
    });
  };
  const logStatus = useSelector((state) => {
    return state.uiStatus;
  });

  if (logStatus.login === false) {
    return (
      <div className="w-full mt-20 pb-10 flex items-center justify-center min-h-[calc(100vh-5rem)]">
        <div className="max-w-md w-full px-4">
          <div className="text-center">
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
              Please log in to add new transactions to your account.
            </p>
            <Link
              to="/signup"
              className="inline-block w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              Go to Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-20 pb-10 flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <div className="max-w-md w-full px-4">
        <div className="bg-white rounded-2xl shadow-xl p-10 border border-slate-200 backdrop-blur-sm">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-900 mb-2">
              Add Transaction
            </h1>
            <p className="text-slate-600">Track your expense or income</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addingitemHandler(e);
              e.target.expenseReason.value = "";
              e.target.price.value = "";
              e.target.itemType.value = "";
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Description
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-slate-900 placeholder-slate-400 bg-slate-50"
                type="text"
                name="expenseReason"
                placeholder="e.g., Grocery shopping"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Amount
              </label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-500 font-semibold">
                  $
                </span>
                <input
                  className="w-full pl-8 pr-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-slate-900 placeholder-slate-400 bg-slate-50"
                  type="number"
                  name="price"
                  placeholder="0.00"
                  step="0.01"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">
                Type
              </label>
              <div className="flex gap-4">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="itemType"
                    value="expense"
                    className="h-5 w-5 text-red-500 cursor-pointer"
                    required
                  />
                  <span className="ml-3 text-sm font-medium text-slate-700 group-hover:text-slate-900">
                    Expense
                  </span>
                </label>
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="itemType"
                    value="earning"
                    className="h-5 w-5 text-emerald-500 cursor-pointer"
                    required
                  />
                  <span className="ml-3 text-sm font-medium text-slate-700 group-hover:text-slate-900">
                    Income
                  </span>
                </label>
              </div>
            </div>

            <button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 flex items-center justify-center gap-2 mt-8"
              type="submit"
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
              <span>Add Transaction</span>
            </button>
          </form>

          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-xl">
            <p className="text-sm text-blue-800 font-medium">
              ✓ Transactions are saved to your account instantly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddingItem;
