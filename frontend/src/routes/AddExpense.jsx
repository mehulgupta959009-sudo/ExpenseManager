import { useDispatch } from "react-redux";
import { itemToAdd } from "../services/managefetching";
import { fetchStatusActions } from "../store/fetchStatus";
import { useState } from "react";

function AddExpense() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    productName: "",
    amount: "",
    category: "other",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const categories = [
    { value: "food", label: "🍔 Food & Dining" },
    { value: "transport", label: "🚗 Transport" },
    { value: "utilities", label: "⚡ Utilities" },
    { value: "entertainment", label: "🎬 Entertainment" },
    { value: "shopping", label: "🛍️ Shopping" },
    { value: "health", label: "🏥 Health & Medical" },
    { value: "education", label: "📚 Education" },
    { value: "other", label: "📌 Other" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.productName || !formData.amount) {
      alert("Please fill in all required fields");
      return;
    }

    const expenseData = {
      productName: formData.productName,
      amount: formData.amount,
      category: formData.category,
      description: formData.description,
      date: formData.date,
    };

    try {
      const data = await itemToAdd(formData.productName, expenseData);
      if (data.refetch) {
        dispatch(fetchStatusActions.markStatusChanged());
        setFormData({
          productName: "",
          amount: "",
          category: "other",
          description: "",
          date: new Date().toISOString().split("T")[0],
        });
      }
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <div className="w-full mt-20 pb-10 flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <div className="max-w-2xl w-full px-4 sm:px-0">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              Add New Expense
            </h1>
            <p className="text-gray-600 text-lg">
              Track your spending and stay on budget
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Expense Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Expense Title <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
                type="text"
                name="productName"
                placeholder="e.g., Grocery shopping, Movie ticket"
                value={formData.productName}
                onChange={handleChange}
                required
              />
            </div>

            {/* Amount and Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Amount */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Amount <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-500 font-semibold text-lg">
                    ₹
                  </span>
                  <input
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
                    type="number"
                    name="amount"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Category
                </label>
                <select
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-900"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-900"
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500 resize-none"
                name="description"
                placeholder="Add any notes about this expense..."
                rows="3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center space-x-2"
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
              <span>Add Expense</span>
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg">
            <p className="text-sm text-indigo-700">
              💡 Tip: Categorizing your expenses helps you track spending
              patterns and identify areas to save money.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddExpense;
