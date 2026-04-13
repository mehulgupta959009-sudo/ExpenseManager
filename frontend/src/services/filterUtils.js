// Helper function to filter transactions based on filters
export const filterTransactions = (transactions, filters) => {
  if (!transactions || !Array.isArray(transactions)) {
    return [];
  }

  let filtered = transactions;

  // Filter by transaction type
  if (filters.transactionType !== "both") {
    filtered = filtered.filter((t) => t.type === filters.transactionType);
  }

  // Filter by time period
  const now = new Date();
  let startDate = new Date(0); // Beginning of time for 'all'

  switch (filters.timePeriod) {
    case "daily":
      startDate = new Date(filters.selectedDate);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(filters.selectedDate);
      endDate.setHours(23, 59, 59, 999);
      filtered = filtered.filter((t) => {
        const tDate = new Date(t.date);
        return tDate >= startDate && tDate <= endDate;
      });
      break;

    case "weekly":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 7);
      startDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter((t) => new Date(t.date) >= startDate);
      break;

    case "monthly":
      startDate = new Date(now);
      startDate.setDate(now.getDate() - 30);
      startDate.setHours(0, 0, 0, 0);
      filtered = filtered.filter((t) => new Date(t.date) >= startDate);
      break;

    case "all":
    default:
      // No additional filtering
      break;
  }

  return filtered;
};

// Get period label for display
export const getPeriodLabel = (timePeriod, selectedDate) => {
  switch (timePeriod) {
    case "daily":
      return new Date(selectedDate).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    case "weekly":
      return "Last 7 Days";
    case "monthly":
      return "Last 30 Days";
    case "all":
      return "All Time";
    default:
      return "All Time";
  }
};

// Calculate statistics for filtered transactions
export const calculateStats = (filtered) => {
  const expenses = filtered.filter((t) => t.type === "expense");
  const earnings = filtered.filter((t) => t.type === "earning");

  const totalExpenses = expenses.reduce(
    (sum, t) => sum + (parseFloat(t.amount) || 0),
    0,
  );
  const totalEarnings = earnings.reduce(
    (sum, t) => sum + (parseFloat(t.amount) || 0),
    0,
  );
  const netBalance = totalEarnings - totalExpenses;

  return {
    totalExpenses,
    totalEarnings,
    netBalance,
    totalTransactions: filtered.length,
    expenseCount: expenses.length,
    earningCount: earnings.length,
  };
};
