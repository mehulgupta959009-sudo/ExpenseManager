import { useDispatch, useSelector } from "react-redux";
import { fetchStatusActions } from "../store/fetchStatus";
import { itemsActions } from "../store/itemsSlice";
import {
  itemToAdd,
  deleteItem as deleteItemAPI,
} from "../services/managefetching";
import { useState } from "react";
import FilterBar from "../components/FilterBar";
import {
  filterTransactions,
  calculateStats,
  getPeriodLabel,
} from "../services/filterUtils";

function Transactions() {
  const dispatch = useDispatch();
  const transactions = useSelector((state) => state.items);
  const filters = useSelector((state) => state.filters);
  const [activeTab, setActiveTab] = useState("view"); // 'view' or 'add'
  const [formType, setFormType] = useState("expense"); // 'expense' or 'earning'
  const [formData, setFormData] = useState({
    productName: "",
    amount: "",
    category: "other",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const expenseCategories = [
    { value: "food", label: "🍔 Food & Dining" },
    { value: "transport", label: "🚗 Transport" },
    { value: "utilities", label: "⚡ Utilities" },
    { value: "entertainment", label: "🎬 Entertainment" },
    { value: "shopping", label: "🛍️ Shopping" },
    { value: "health", label: "🏥 Health & Medical" },
    { value: "education", label: "📚 Education" },
    { value: "other", label: "📌 Other" },
  ];

  const earningCategories = [
    { value: "salary", label: "💼 Salary" },
    { value: "freelance", label: "💻 Freelance" },
    { value: "investment", label: "📈 Investment" },
    { value: "bonus", label: "🎁 Bonus" },
    { value: "gift", label: "🎉 Gift" },
    { value: "refund", label: "🔄 Refund" },
    { value: "business", label: "🏪 Business" },
    { value: "other", label: "📌 Other" },
  ];

  const categories =
    formType === "expense" ? expenseCategories : earningCategories;

  const handleFormChange = (e) => {
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

    const transactionData = {
      productName: formData.productName,
      amount: formData.amount,
      category: formData.category,
      description: formData.description,
      date: formData.date,
      type: formType,
    };

    try {
      const data = await itemToAdd(formData.productName, transactionData);
      if (data.refetch) {
        dispatch(fetchStatusActions.markStatusChanged());
        setFormData({
          productName: "",
          amount: "",
          category: "other",
          description: "",
          date: new Date().toISOString().split("T")[0],
        });
        setActiveTab("view");
      }
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Failed to add transaction. Please try again.");
    }
  };

  const deleteTransaction = async (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      try {
        const result = await deleteItemAPI(id);
        if (result.success) {
          dispatch(itemsActions.removeitem(id));
        }
      } catch (error) {
        console.error("Error deleting transaction:", error);
        alert("Failed to delete transaction");
      }
    }
  };

  const reloadTransactions = () => {
    dispatch(fetchStatusActions.markStatusChanged());
  };

  // Filter transactions based on filters
  const filteredTransactions = filterTransactions(transactions, filters);
  const stats = calculateStats(filteredTransactions);
  const periodLabel = getPeriodLabel(filters.timePeriod, filters.selectedDate);

  const getIcon = (type, category) => {
    if (type === "expense") {
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
    } else {
      const icons = {
        salary: "💼",
        freelance: "💻",
        investment: "📈",
        bonus: "🎁",
        gift: "🎉",
        refund: "🔄",
        business: "🏪",
        other: "📌",
      };
      return icons[category?.toLowerCase()] || icons.other;
    }
  };

  const getColor = (type) => {
    return type === "expense"
      ? "from-red-500 to-rose-600"
      : "from-green-500 to-emerald-600";
  };

  const getAmountColor = (type) => {
    return type === "expense" ? "text-red-600" : "text-green-600";
  };

  const getAmountPrefix = (type) => {
    return type === "expense" ? "-" : "+";
  };

  return (
    <div className="w-full mt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            💰 Money Manager
          </h1>
          <p className="text-gray-600 text-lg">
            Track your expenses and earnings in one place
          </p>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("view")}
            className={`pb-2 px-4 font-semibold transition-all ${
              activeTab === "view"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            📊 View Transactions
          </button>
          <button
            onClick={() => setActiveTab("add")}
            className={`pb-2 px-4 font-semibold transition-all ${
              activeTab === "add"
                ? "text-indigo-600 border-b-2 border-indigo-600"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            ➕ Add Transaction
          </button>
        </div>

        {/* View Tab */}
        {activeTab === "view" && (
          <>
            {/* Filters */}
            <FilterBar />

            {/* Stats Cards */}
            {filteredTransactions.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
                {/* Total Expenses */}
                <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 font-semibold text-xs mb-1 capitalize">
                        Expenses
                      </p>
                      <p className="text-2xl font-black text-red-600">
                        ₹{stats.totalExpenses.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-3xl">💸</div>
                  </div>
                </div>

                {/* Total Earnings */}
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 font-semibold text-xs mb-1 capitalize">
                        Earnings
                      </p>
                      <p className="text-2xl font-black text-green-600">
                        ₹{stats.totalEarnings.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-3xl">💵</div>
                  </div>
                </div>

                {/* Net Balance */}
                <div
                  className={`bg-gradient-to-br ${
                    stats.netBalance >= 0
                      ? "from-blue-50 to-cyan-50 border-blue-200"
                      : "from-orange-50 to-amber-50 border-orange-200"
                  } border-2 rounded-xl p-4`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 font-semibold text-xs mb-1 capitalize">
                        Net Balance
                      </p>
                      <p
                        className={`text-2xl font-black ${
                          stats.netBalance >= 0
                            ? "text-blue-600"
                            : "text-orange-600"
                        }`}
                      >
                        ₹{stats.netBalance.toFixed(2)}
                      </p>
                    </div>
                    <div className="text-3xl">
                      {stats.netBalance >= 0 ? "📈" : "📉"}
                    </div>
                  </div>
                </div>

                {/* Total Transactions */}
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-600 font-semibold text-xs mb-1 capitalize">
                        Transactions
                      </p>
                      <p className="text-2xl font-black text-purple-600">
                        {stats.totalTransactions}
                      </p>
                    </div>
                    <div className="text-3xl">📝</div>
                  </div>
                </div>
              </div>
            )}

            {/* Reload Button */}
            <button
              onClick={reloadTransactions}
              className="mb-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
            >
              🔄 Reload Transactions
            </button>

            {/* Transactions List */}
            {filteredTransactions.length > 0 ? (
              <div className="space-y-3">
                {filteredTransactions.map((transaction) => (
                  <div
                    key={transaction._id}
                    className="bg-white rounded-lg border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
                  >
                    <div className="flex items-center gap-4 p-4">
                      {/* Icon */}
                      <div
                        className={`h-14 w-14 rounded-lg bg-gradient-to-br ${getColor(
                          transaction.type,
                        )} flex items-center justify-center text-xl flex-shrink-0`}
                      >
                        {getIcon(transaction.type, transaction.category)}
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900 truncate">
                            {transaction.productName || "Untitled"}
                          </h3>
                          <span className="text-xs font-semibold text-gray-500 capitalize whitespace-nowrap bg-gray-100 px-2 py-1 rounded">
                            {transaction.type}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-sm text-gray-600 flex-wrap">
                          <span className="capitalize font-medium">
                            {transaction.category || "other"}
                          </span>
                          {transaction.date && (
                            <span className="flex items-center gap-1">
                              📅{" "}
                              {new Date(transaction.date).toLocaleDateString()}
                            </span>
                          )}
                          {transaction.description && (
                            <span className="text-gray-500 truncate">
                              {transaction.description}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Amount & Delete */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        <p
                          className={`text-2xl font-black ${getAmountColor(
                            transaction.type,
                          )}`}
                        >
                          {getAmountPrefix(transaction.type)}₹
                          {parseFloat(transaction.amount || 0).toFixed(2)}
                        </p>
                        <button
                          onClick={() => deleteTransaction(transaction._id)}
                          className="px-3 py-1.5 bg-red-500 hover:bg-red-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 active:scale-95"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border-2 border-dashed border-indigo-300">
                <svg
                  className="w-20 h-20 text-indigo-400 mb-4"
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
                  No transactions yet
                </h2>
                <p className="text-gray-600 text-center max-w-sm mb-6">
                  Start tracking your finances by adding your first transaction
                </p>
                <button
                  onClick={() => setActiveTab("add")}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-all"
                >
                  ➕ Add Transaction now
                </button>
              </div>
            )}
          </>
        )}

        {/* Add Tab */}
        {activeTab === "add" && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-200">
              <div className="mb-8">
                <h2 className="text-3xl font-black text-gray-900 mb-4">
                  Add New Transaction
                </h2>

                {/* Type Selector */}
                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setFormType("expense");
                      setFormData((prev) => ({ ...prev, category: "other" }));
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-lg transition-all ${
                      formType === "expense"
                        ? "bg-red-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    💸 Expense
                  </button>
                  <button
                    onClick={() => {
                      setFormType("earning");
                      setFormData((prev) => ({ ...prev, category: "other" }));
                    }}
                    className={`flex-1 py-3 px-4 rounded-lg font-bold text-lg transition-all ${
                      formType === "earning"
                        ? "bg-green-500 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    💰 Earning
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {formType === "expense" ? "Expense" : "Income"} Title{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
                    type="text"
                    name="productName"
                    placeholder={
                      formType === "expense"
                        ? "e.g., Grocery shopping, Movie ticket"
                        : "e.g., Monthly salary, Freelance project"
                    }
                    value={formData.productName}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                {/* Amount and Category */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-700 pr-2">
                        ₹
                      </span>
                      <input
                        className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
                        type="number"
                        name="amount"
                        placeholder="0.00"
                        value={formData.amount}
                        onChange={handleFormChange}
                        step="0.01"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-900 bg-white"
                      name="category"
                      value={formData.category}
                      onChange={handleFormChange}
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
                    Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none transition-colors text-gray-900"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    required
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
                    placeholder="Add any additional notes..."
                    rows="4"
                    value={formData.description}
                    onChange={handleFormChange}
                  />
                </div>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className={`flex-1 py-4 px-6 rounded-lg font-bold text-lg text-white transition-all shadow-md hover:shadow-lg active:scale-95 ${
                      formType === "expense"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    {formType === "expense" ? "💸" : "💰"} Add{" "}
                    {formType === "expense" ? "Expense" : "Income"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab("view")}
                    className="flex-1 py-4 px-6 rounded-lg font-bold text-lg text-gray-700 bg-gray-200 hover:bg-gray-300 transition-all"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Transactions;
