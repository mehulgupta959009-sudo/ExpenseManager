import { useDispatch } from "react-redux";
import { favoritesActions } from "../store/favoritesSlice";

function FavitemsView({ item }) {
  const dispatch = useDispatch();

  function deleteitem() {
    dispatch(favoritesActions.deleteFavorite(item._id));
  }

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden w-72 h-80 m-4 flex flex-col border border-gray-100">
      <div className="bg-gradient-to-r from-pink-500 to-pink-600 h-24 flex items-end justify-center pb-4">
        <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
          <svg
            className="w-10 h-10 text-pink-600"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2 truncate">
            {item.productName}
          </h3>
          <p className="text-xs text-gray-500 font-mono break-all">
            ID: {item._id}
          </p>
        </div>

        <button
          onClick={deleteitem}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center space-x-2 mt-4"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
          </svg>
          <span>Remove from Favorites</span>
        </button>
      </div>
    </div>
  );
}

export default FavitemsView;
