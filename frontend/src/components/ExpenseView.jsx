import { useDispatch } from "react-redux";
import { itemsActions } from "../store/itemsSlice";

function ExpenseView({ expense }) {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(itemsActions.removeitem(expense._id));
  };

  const getCategoryColor = (category) => {
    const colors = {
      food: "from-orange-500 to-orange-600",
      transport: "from-blue-500 to-blue-600",
      utilities: "from-yellow-500 to-yellow-600",
      entertainment: "from-pink-500 to-pink-600",
      shopping: "from-purple-500 to-purple-600",
      health: "from-red-500 to-red-600",
      education: "from-indigo-500 to-indigo-600",
      other: "from-gray-500 to-gray-600",
    };
    return colors[category?.toLowerCase()] || colors.other;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      food: "🍔",
      transport: "🚗",
      utilities: "⚡",
      entertainment: "🎬",
      shopping: "🛍️",
      health: "🏥",
      education: "📚",
      other: "📌",
    };
    return icons[category?.toLowerCase()] || icons.other;
  };

  const categoryColor = getCategoryColor(expense.category);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-72 h-96 m-4 flex flex-col border border-gray-100 hover:border-indigo-200">
      <div
        className={`bg-gradient-to-r ${categoryColor} h-28 flex items-end justify-between pb-6 px-6`}
      >
        <div>
          <p className="text-white text-sm font-semibold opacity-90">
            {expense.category || "Other"}
          </p>
          <p className="text-4xl font-black text-white">
            {getCategoryIcon(expense.category)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-white text-xs font-semibold opacity-75">Amount</p>
          <p className="text-2xl font-bold text-white">
            ₹{parseFloat(expense.amount || 0).toFixed(2)}
          </p>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
            {expense.productName || expense.description || "Untitled"}
          </h3>

          {expense.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {expense.description}
            </p>
          )}

          <div className="space-y-2 text-xs text-gray-500">
            {expense.date && (
              <p className="flex items-center">
                <span className="font-semibold text-gray-600 mr-2">📅</span>
                {new Date(expense.date).toLocaleDateString()}
              </p>
            )}
            {expense.category && (
              <p className="flex items-center">
                <span className="font-semibold text-gray-600 mr-2">🏷️</span>
                {expense.category}
              </p>
            )}
            <p className="font-mono break-all text-gray-400">
              ID: {expense._id?.slice(0, 8)}...
            </p>
          </div>
        </div>

        <button
          onClick={deleteHandler}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
          <span>Delete Expense</span>
        </button>
      </div>
    </div>
  );
}

export default ExpenseView;
