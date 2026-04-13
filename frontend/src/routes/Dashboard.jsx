import { useSelector } from "react-redux";

function Dashboard() {
  const expenses = useSelector((state) => state.items);

  // Calculate total amount
  const totalAmount = expenses.reduce((sum, expense) => {
    return sum + (parseFloat(expense.amount) || 0);
  }, 0);

  // Calculate category breakdown
  const categoryBreakdown = {};
  expenses.forEach((expense) => {
    const category = expense.category || "other";
    categoryBreakdown[category] =
      (categoryBreakdown[category] || 0) + parseFloat(expense.amount || 0);
  });

  // Calculate average expense
  const averageExpense =
    expenses.length > 0 ? (totalAmount / expenses.length).toFixed(2) : 0;

  // Find highest and lowest expenses
  const sortedExpenses = [...expenses].sort(
    (a, b) => parseFloat(b.amount) - parseFloat(a.amount),
  );
  const highestExpense = sortedExpenses[0];
  const lowestExpense = sortedExpenses[sortedExpenses.length - 1];

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

  const getCategoryColor = (category) => {
    const colors = {
      food: "bg-orange-100 text-orange-700 border-orange-300",
      transport: "bg-blue-100 text-blue-700 border-blue-300",
      utilities: "bg-yellow-100 text-yellow-700 border-yellow-300",
      entertainment: "bg-pink-100 text-pink-700 border-pink-300",
      shopping: "bg-purple-100 text-purple-700 border-purple-300",
      health: "bg-red-100 text-red-700 border-red-300",
      education: "bg-indigo-100 text-indigo-700 border-indigo-300",
      other: "bg-gray-100 text-gray-700 border-gray-300",
    };
    return colors[category?.toLowerCase()] || colors.other;
  };

  const topCategories = Object.entries(categoryBreakdown)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: ((amount / totalAmount) * 100).toFixed(1),
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5);

  return (
    <div className="w-full mt-26 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            Expense Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Get insights into your spending habits
          </p>
        </div>

        {expenses.length === 0 ? (
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
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-700 mb-2">
              No data yet
            </h2>
            <p className="text-gray-600 text-center max-w-sm">
              Start adding expenses to see your dashboard statistics and
              insights
            </p>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Total Amount */}
              <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 font-semibold text-sm mb-1">
                      Total Spent
                    </p>
                    <p className="text-3xl font-black text-indigo-600">
                      ₹{totalAmount.toFixed(2)}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-200 rounded-lg flex items-center justify-center text-2xl">
                    💰
                  </div>
                </div>
              </div>

              {/* Number of Expenses */}
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 font-semibold text-sm mb-1">
                      Total Expenses
                    </p>
                    <p className="text-3xl font-black text-purple-600">
                      {expenses.length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-200 rounded-lg flex items-center justify-center text-2xl">
                    📊
                  </div>
                </div>
              </div>

              {/* Average Expense */}
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 font-semibold text-sm mb-1">
                      Average Amount
                    </p>
                    <p className="text-3xl font-black text-blue-600">
                      ₹{averageExpense}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center text-2xl">
                    📈
                  </div>
                </div>
              </div>

              {/* Categories Count */}
              <div className="bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 font-semibold text-sm mb-1">
                      Categories
                    </p>
                    <p className="text-3xl font-black text-green-600">
                      {Object.keys(categoryBreakdown).length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-200 rounded-lg flex items-center justify-center text-2xl">
                    🏷️
                  </div>
                </div>
              </div>
            </div>

            {/* Category Breakdown */}
            {topCategories.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                {/* Top Categories */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Top Spending Categories
                  </h2>
                  <div className="space-y-4">
                    {topCategories.map((cat, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <span className="text-xl">
                              {getCategoryIcon(cat.category)}
                            </span>
                            <span className="font-semibold text-gray-900 capitalize">
                              {cat.category}
                            </span>
                          </div>
                          <span className="text-sm font-bold text-indigo-600">
                            {cat.percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full transition-all duration-500"
                            style={{ width: `${cat.percentage}%` }}
                          ></div>
                        </div>
                        <p className="text-sm text-gray-600">
                          ₹{cat.amount.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Highest and Lowest */}
                <div className="space-y-6">
                  {highestExpense && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Highest Expense
                      </h3>
                      <div
                        className={`p-4 rounded-lg border-2 ${getCategoryColor(highestExpense.category)}`}
                      >
                        <p className="text-sm font-semibold mb-2">
                          {getCategoryIcon(highestExpense.category)}{" "}
                          {highestExpense.productName}
                        </p>
                        <p className="text-2xl font-black">
                          ₹{parseFloat(highestExpense.amount).toFixed(2)}
                        </p>
                        {highestExpense.date && (
                          <p className="text-xs text-gray-600 mt-2">
                            {new Date(highestExpense.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {lowestExpense && lowestExpense !== highestExpense && (
                    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">
                        Lowest Expense
                      </h3>
                      <div
                        className={`p-4 rounded-lg border-2 ${getCategoryColor(lowestExpense.category)}`}
                      >
                        <p className="text-sm font-semibold mb-2">
                          {getCategoryIcon(lowestExpense.category)}{" "}
                          {lowestExpense.productName}
                        </p>
                        <p className="text-2xl font-black">
                          ₹{parseFloat(lowestExpense.amount).toFixed(2)}
                        </p>
                        {lowestExpense.date && (
                          <p className="text-xs text-gray-600 mt-2">
                            {new Date(lowestExpense.date).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* All Categories */}
            {Object.keys(categoryBreakdown).length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  All Categories
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {Object.entries(categoryBreakdown)
                    .map(([category, amount]) => ({
                      category,
                      amount,
                      count: expenses.filter(
                        (e) => (e.category || "other") === category,
                      ).length,
                    }))
                    .sort((a, b) => b.amount - a.amount)
                    .map((cat, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg border-2 text-center ${getCategoryColor(
                          cat.category,
                        )}`}
                      >
                        <p className="text-2xl mb-2">
                          {getCategoryIcon(cat.category)}
                        </p>
                        <p className="font-semibold capitalize text-sm mb-1">
                          {cat.category}
                        </p>
                        <p className="text-lg font-black">
                          ₹{cat.amount.toFixed(2)}
                        </p>
                        <p className="text-xs opacity-75 mt-1">
                          {cat.count} {cat.count === 1 ? "item" : "items"}
                        </p>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
