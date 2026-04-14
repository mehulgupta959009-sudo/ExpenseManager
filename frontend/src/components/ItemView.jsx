import { useDispatch } from "react-redux";
import { favoritesActions } from "../store/favoritesSlice";
import { itemsActions } from "../store/itemsSlice";
import { addToFav } from "../services/managefetching";

function ItemView({ item }) {
  const dispatch = useDispatch();

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

  return (
    <div className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 mb-3 flex items-center">
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 w-16 h-16 flex items-center justify-center flex-shrink-0">
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
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <div className="flex-1 px-6 py-4">
        <h3 className="text-base font-bold text-gray-800 mb-1 truncate">
          {item.expenseReason} - ${item.price} ({item.itemType})
        </h3>
        <p className="text-xs text-gray-500 font-mono truncate">
          ID: {item._id}
        </p>
      </div>

      <div className="flex gap-2 pr-4 flex-shrink-0">
        <button
          onClick={addtoFavoritesHandler}
          className="bg-gradient-to-r from-pink-500 to-pink-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-pink-600 hover:to-pink-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 whitespace-nowrap text-sm"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>Favorite</span>
        </button>

        <button
          onClick={deleteHandler}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 whitespace-nowrap text-sm"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}

export default ItemView;
