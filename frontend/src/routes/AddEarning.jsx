import { useDispatch } from "react-redux";
import { itemToAdd } from "../services/managefetching";
import { fetchStatusActions } from "../store/fetchStatus";
import { useState } from "react";

function AddEarning() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    productName: "",
    amount: "",
    category: "salary",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const categories = [
    { value: "salary", label: "💼 Salary" },
    { value: "freelance", label: "💻 Freelance" },
    { value: "investment", label: "📈 Investment" },
    { value: "bonus", label: "🎁 Bonus" },
    { value: "gift", label: "🎉 Gift" },
    { value: "refund", label: "🔄 Refund" },
    { value: "business", label: "🏪 Business" },
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

    const earningData = {
      productName: formData.productName,
      amount: formData.amount,
      category: formData.category,
      description: formData.description,
      date: formData.date,
      type: "earning",
    };

    try {
      const data = await itemToAdd(formData.productName, earningData);
      if (data.refetch || data.data) {
        dispatch(fetchStatusActions.markStatusChanged());
        setFormData({
          productName: "",
          amount: "",
          category: "salary",
          description: "",
          date: new Date().toISOString().split("T")[0],
        });
        alert("Earning added successfully!");
      }
    } catch (error) {
      console.error("Error adding earning:", error);
      alert("Failed to add earning");
    }
  };

  return (
    <div className="w-full mt-20 pb-10 flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <div className="max-w-2xl w-full px-4 sm:px-0">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-gray-900 mb-2">
              Add New Earning
            </h1>
            <p className="text-gray-600 text-lg">
              Track your income and financial growth
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Earning Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Earning Title <span className="text-red-500">*</span>
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
                type="text"
                name="productName"
                placeholder="e.g., Monthly salary, Project payment"
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
                    className="w-full pl-8 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
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
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-gray-900"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-gray-900"
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500 resize-none"
                name="description"
                placeholder="Add any notes about this earning..."
                rows="3"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold py-3 rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 flex items-center justify-center space-x-2"
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
              <span>Add Earning</span>
            </button>
          </form>

          {/* Info Box */}
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700">
              💡 Tip: Categorizing your earnings helps you track income sources
              and plan better.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddEarning;
