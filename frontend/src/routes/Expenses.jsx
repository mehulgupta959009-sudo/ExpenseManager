import { useDispatch, useSelector } from "react-redux";
import ExpenseView from "../components/ExpenseView";
import { fetchStatusActions } from "../store/fetchStatus";

function Expenses() {
  const dispatch = useDispatch();

  const expenses = useSelector((state) => {
    return state.items;
  });

  const reloadExpenses = () => {
    return dispatch(fetchStatusActions.markStatusChanged());
  };

  const totalAmount = expenses.reduce((sum, expense) => {
    return sum + (parseFloat(expense.amount) || 0);
  }, 0);

  return (
    <div className="w-full mt-26 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-black text-gray-900 mb-2">
                {expenses.length > 0 ? "All Expenses" : "No Expenses Yet"}
              </h1>
              <p className="text-gray-600 text-lg">
                {expenses.length > 0
                  ? `You have tracked ${expenses.length} expense${expenses.length !== 1 ? "s" : ""}`
                  : "Start tracking expenses to get started"}
              </p>
            </div>
            {expenses.length > 0 && (
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-4 w-full md:w-48">
                <p className="text-sm text-gray-600 font-semibold mb-2">
                  Total Amount
                </p>
                <p className="text-3xl font-black text-indigo-600">
                  ₹{totalAmount.toFixed(2)}
                </p>
              </div>
            )}
          </div>
          <button
            onClick={reloadExpenses}
            className="mt-4 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
          >
            Reload Expenses
          </button>
        </div>

        {expenses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {expenses.map((expense) => (
              <ExpenseView key={expense._id} expense={expense} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-dashed border-indigo-300">
            <svg
              className="w-16 h-16 text-indigo-400 mb-4"
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
              No expenses tracked yet
            </h2>
            <p className="text-gray-600 text-center max-w-sm">
              Start tracking your expenses by clicking the "Add Expense" button
              in the sidebar to get a better view of your spending
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Expenses;
