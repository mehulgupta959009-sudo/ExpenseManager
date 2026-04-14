import { useSelector } from "react-redux";
import FavitemsView from "../components/FavItemsView";

function Favorites() {
  const itemDetails = useSelector((state) => {
    return state.favorites;
  });

  return (
    <div className="w-full mt-26 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            My Favorites
          </h1>
          <p className="text-gray-600 text-lg">
            You have {itemDetails.length} favorite
            {itemDetails.items.length !== 1 ? "s" : ""}
          </p>
        </div>

        {itemDetails.items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {itemDetails.items.map((item) => (
              <FavitemsView key={item._id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <svg
              className="w-16 h-16 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-500 text-center max-w-sm">
              Add items to your favorites to see them here. Click the heart icon
              on any item to add it!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
