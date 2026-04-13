import { useSelector } from "react-redux";

function Dashboard() {
  const transactions = useSelector((state) => state.items);

  // Separate expenses and earnings
  const expenses = transactions.filter((t) => t.type === "expense");
  const earnings = transactions.filter((t) => t.type === "earning");

  // Calculate stats
  const totalExpenses = expenses.reduce(
    (sum, t) => sum + (parseFloat(t.amount) || 0),
    0,
  );
  const totalEarnings = earnings.reduce(
    (sum, t) => sum + (parseFloat(t.amount) || 0),
    0,
  );
  const netBalance = totalEarnings - totalExpenses;

  // Category breakdown
  const getCategoryBreakdown = (items) => {
    const breakdown = {};
    items.forEach((item) => {
      const category = item.category || "other";
      breakdown[category] =
        (breakdown[category] || 0) + parseFloat(item.amount || 0);
    });
    return Object.entries(breakdown)
      .map(([category, amount]) => ({
        category,
        amount,
        percentage:
          items.length > 0 ? ((amount / totalExpenses) * 100).toFixed(1) : 0,
      }))
      .sort((a, b) => b.amount - a.amount);
  };

  const expenseBreakdown = getCategoryBreakdown(expenses);
  const earningBreakdown = getCategoryBreakdown(earnings);

  // Get icons
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

  // Get color for progress bars
  const getColor = (percentage) => {
    if (percentage >= 50) return "bg-red-500";
    if (percentage >= 30) return "bg-orange-500";
    if (percentage >= 15) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Monthly trend (simple)
  const getMonthlyBreakdown = () => {
    const months = {};
    transactions.forEach((t) => {
      const date = new Date(t.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      if (!months[monthKey]) {
        months[monthKey] = { expenses: 0, earnings: 0 };
      }
      if (t.type === "expense") {
        months[monthKey].expenses += parseFloat(t.amount || 0);
      } else {
        months[monthKey].earnings += parseFloat(t.amount || 0);
      }
    });
    return Object.entries(months)
      .sort()
      .slice(-6)
      .map(([month, data]) => ({
        month: new Date(month + "-01").toLocaleDateString("en-US", {
          month: "short",
          year: "numeric",
        }),
        ...data,
      }));
  };

  const monthlyData = getMonthlyBreakdown();

  // Recent transactions (last 5)
  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div className="w-full mt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-black text-gray-900 mb-2">
            📊 Financial Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Overview of your financial activity
          </p>
        </div>

        {transactions.length === 0 ? (
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
              No data to display
            </h2>
            <p className="text-gray-600 text-center max-w-sm">
              Add some transactions to see your financial dashboard and insights
            </p>
          </div>
        ) : (
          <>
            {/* Main Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
              {/* Total Expenses */}
              <div className="bg-gradient-to-br from-red-50 to-rose-50 border-2 border-red-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 font-semibold text-xs mb-1 uppercase">
                      Total Expenses
                    </p>
                    <p className="text-3xl font-black text-red-600">
                      ₹{totalExpenses.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {expenses.length} transactions
                    </p>
                  </div>
                  <div className="text-4xl">💸</div>
                </div>
              </div>

              {/* Total Earnings */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 font-semibold text-xs mb-1 uppercase">
                      Total Earnings
                    </p>
                    <p className="text-3xl font-black text-green-600">
                      ₹{totalEarnings.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {earnings.length} transactions
                    </p>
                  </div>
                  <div className="text-4xl">💵</div>
                </div>
              </div>

              {/* Net Balance */}
              <div
                className={`bg-gradient-to-br ${
                  netBalance >= 0
                    ? "from-blue-50 to-cyan-50 border-blue-200"
                    : "from-orange-50 to-amber-50 border-orange-200"
                } border-2 rounded-xl p-6`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 font-semibold text-xs mb-1 uppercase">
                      Net Balance
                    </p>
                    <p
                      className={`text-3xl font-black ${
                        netBalance >= 0 ? "text-blue-600" : "text-orange-600"
                      }`}
                    >
                      ₹{netBalance.toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {netBalance >= 0 ? "Surplus" : "Deficit"}
                    </p>
                  </div>
                  <div className="text-4xl">
                    {netBalance >= 0 ? "📈" : "📉"}
                  </div>
                </div>
              </div>

              {/* Average Transaction */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 font-semibold text-xs mb-1 uppercase">
                      Average Transaction
                    </p>
                    <p className="text-3xl font-black text-purple-600">
                      ₹
                      {transactions.length > 0
                        ? (
                            (totalExpenses + totalEarnings) /
                            transactions.length
                          ).toFixed(2)
                        : "0"}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Total: {transactions.length}
                    </p>
                  </div>
                  <div className="text-4xl">📊</div>
                </div>
              </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
              {/* Expense Categories */}
              {expenses.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    💸 Expenses by Category
                  </h2>
                  <div className="space-y-4">
                    {expenseBreakdown.map((cat, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {getIcon("expense", cat.category)}
                            </span>
                            <span className="font-semibold text-gray-900 capitalize">
                              {cat.category}
                            </span>
                          </div>
                          <span className="font-bold text-red-600">
                            ₹{cat.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${getColor(parseFloat(cat.percentage))}`}
                            style={{ width: `${cat.percentage}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {cat.percentage}% of expenses
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Earning Categories */}
              {earnings.length > 0 && (
                <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    💰 Earnings by Category
                  </h2>
                  <div className="space-y-4">
                    {earningBreakdown.map((cat, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">
                              {getIcon("earning", cat.category)}
                            </span>
                            <span className="font-semibold text-gray-900 capitalize">
                              {cat.category}
                            </span>
                          </div>
                          <span className="font-bold text-green-600">
                            ₹{cat.amount.toFixed(2)}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full bg-green-500"
                            style={
                              totalEarnings > 0
                                ? {
                                    width: `${(cat.amount / totalEarnings) * 100}%`,
                                  }
                                : { width: "0%" }
                            }
                          ></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {totalEarnings > 0
                            ? ((cat.amount / totalEarnings) * 100).toFixed(1)
                            : "0"}
                          % of earnings
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Monthly Trend */}
            {monthlyData.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-10">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  📈 Monthly Trend
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {monthlyData.map((month, idx) => {
                    const maxAmount = Math.max(
                      ...monthlyData.map((m) =>
                        Math.max(m.expenses, m.earnings),
                      ),
                    );
                    return (
                      <div
                        key={idx}
                        className="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-4"
                      >
                        <p className="font-semibold text-gray-900 mb-4">
                          {month.month}
                        </p>
                        <div className="space-y-3">
                          {/* Expenses Bar */}
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                Expenses
                              </span>
                              <span className="text-sm font-bold text-red-600">
                                ₹{month.expenses.toFixed(0)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-300 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-red-500"
                                style={
                                  maxAmount > 0
                                    ? {
                                        width: `${(month.expenses / maxAmount) * 100}%`,
                                      }
                                    : { width: "0%" }
                                }
                              ></div>
                            </div>
                          </div>

                          {/* Earnings Bar */}
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium text-gray-700">
                                Earnings
                              </span>
                              <span className="text-sm font-bold text-green-600">
                                ₹{month.earnings.toFixed(0)}
                              </span>
                            </div>
                            <div className="w-full bg-gray-300 rounded-full h-2">
                              <div
                                className="h-2 rounded-full bg-green-500"
                                style={
                                  maxAmount > 0
                                    ? {
                                        width: `${(month.earnings / maxAmount) * 100}%`,
                                      }
                                    : { width: "0%" }
                                }
                              ></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Recent Transactions */}
            {recentTransactions.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  🕐 Recent Transactions
                </h2>
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div
                      key={transaction._id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                    >
                      <div className="flex items-center gap-4"></div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900">
                          {transaction.productName}
                        </p>
                        <p className="text-sm text-gray-500">
                          {transaction.category} •{" "}
                          {new Date(transaction.date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold text-lg ${
                            transaction.type === "expense"
                              ? "text-red-600"
                              : "text-green-600"
                          }`}
                        >
                          {transaction.type === "expense" ? "-" : "+"}₹
                          {parseFloat(transaction.amount).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500 capitalize">
                          {transaction.type}
                        </p>
                      </div>
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
