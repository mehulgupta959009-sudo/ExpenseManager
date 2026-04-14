import { useDispatch, useSelector } from "react-redux";
import ItemView from "../components/ItemView";
import { fetchStatusActions } from "../store/fetchStatus";

function Welcome() {
  const dispatch = useDispatch();

  const items = useSelector((state) => {
    return state.items;
  });

  const reloadItems = () => {
    return dispatch(fetchStatusActions.markStatusChanged());
  };

  return (
    <div className="w-full mt-26 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            {items.length > 0 ? "All Items" : "No Items Available"}
          </h1>
          <button onClick={reloadItems}>Reload Items</button>
          <p className="text-gray-600 text-lg">
            {items.length > 0
              ? `You have ${items.length} item${items.length !== 1 ? "s" : ""} in your collection`
              : "Start adding items to get started"}
          </p>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {items.map((item) => (
              <ItemView key={item._id} item={item} />
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
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No items yet
            </h2>
            <p className="text-gray-500 text-center max-w-sm">
              Create your first item by clicking the "Add Item" button in the
              sidebar
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Welcome;
