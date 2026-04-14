import { useDispatch } from "react-redux";
import { itemToAdd } from "../services/managefetching";
import { fetchStatusActions } from "../store/fetchStatus";

function AddingItem() {
  const dispatch = useDispatch();

  const addingitemHandler = (itemName) => {
    itemToAdd(itemName).then((data) => {
      console.log(data);
      dispatch(data.refetch && fetchStatusActions.markStatusChanged());
    });
  };

  return (
    <div className="w-full mt-20 pb-10 flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h1 className="text-3xl font-black text-gray-900 mb-2">
            Add New Item
          </h1>
          <p className="text-gray-600 mb-8">
            Create a new item in your collection
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              addingitemHandler(e.target.productName.value);
              e.target.productName.value = "";
            }}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Item Name
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
                type="text"
                name="productName"
                placeholder="Enter item name..."
                required
              />
            </div>

            <button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center space-x-2"
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
              <span>Add Item</span>
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              💡 Tip: Give your item a descriptive name so you can easily find
              it later.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddingItem;
