import { useDispatch } from "react-redux";
import { favoritesActions } from "../store/favoritesSlice";
import { itemsActions } from "../store/itemsSlice";
import { addToFav } from "../services/managefetching";

function ItemView({ item }) {
  const dispatch = useDispatch();

  // Determine if it's an expense or earned based on itemType or price
  const isExpense =
    item.itemType?.toLowerCase().includes("expense") ||
    item.itemType?.toLowerCase().includes("spent");
  const isEarned =
    item.itemType?.toLowerCase().includes("earned") ||
    item.itemType?.toLowerCase().includes("income");

  const deleteHandler = () => {
    dispatch(itemsActions.removeitem(item._id));
  };

  const addtoFavoritesHandler = () => {
    addToFav(item._id).then((data) => {
      console.log(data.success);
      if (data.success) {
        dispatch(favoritesActions.markStatusChanged());
      }
    });
  };

  const getCategoryColor = () => {
    if (isExpense)
      return {
        bg: "bg-red-500",
        label: "Expense",
        textColor: "text-red-600",
        borderColor: "border-red-100 hover:border-red-200",
      };
    if (isEarned)
      return {
        bg: "bg-emerald-500",
        label: "Income",
        textColor: "text-emerald-600",
        borderColor: "border-emerald-100 hover:border-emerald-200",
      };
    return {
      bg: "bg-blue-500",
      label: "Transaction",
      textColor: "text-blue-600",
      borderColor: "border-blue-100 hover:border-blue-200",
    };
  };

  const category = getCategoryColor();

  return (
    <div
      className={`w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border ${category.borderColor} mb-2 flex items-center px-4 py-3`}
    >
      {/* Icon */}
      <div
        className={`${category.bg} w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 mr-4`}
      >
        {isExpense ? (
          <svg
            className="w-5 h-5 text-white"
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
        ) : isEarned ? (
          <svg
            className="w-5 h-5 text-white"
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
        ) : (
          <svg
            className="w-5 h-5 text-white"
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
        )}
      </div>

      {/* Category Badge */}
      <span
        className={`px-3 py-1 rounded-full text-xs font-bold ${category.textColor} ${
          isExpense ? "bg-red-50" : isEarned ? "bg-emerald-50" : "bg-blue-50"
        } mr-3 flex-shrink-0`}
      >
        {category.label}
      </span>

      {/* Description */}
      <div className="flex-1 min-w-0 mr-3">
        <h3 className="text-sm font-semibold text-slate-900 truncate">
          {item.expenseReason}
        </h3>
        <p className="text-xs text-slate-500 truncate">{item.itemType}</p>
      </div>

      {/* Price */}
      <div
        className={`flex-shrink-0 text-lg font-black mr-4 ${
          isExpense
            ? "text-red-600"
            : isEarned
              ? "text-emerald-600"
              : "text-blue-600"
        }`}
      >
        {isExpense || !isEarned ? "-" : "+"} ${item.price}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 flex-shrink-0">
        <button
          onClick={addtoFavoritesHandler}
          className={`p-2 rounded-lg transition-all duration-200 hover:shadow-sm active:scale-95 ${
            isExpense
              ? "bg-red-50 text-red-600 hover:bg-red-100"
              : isEarned
                ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                : "bg-blue-50 text-blue-600 hover:bg-blue-100"
          }`}
          title="Mark as Important"
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
              d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
            />
          </svg>
        </button>

        <button
          onClick={deleteHandler}
          className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-all duration-200 hover:shadow-sm active:scale-95"
          title="Delete"
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default ItemView;
