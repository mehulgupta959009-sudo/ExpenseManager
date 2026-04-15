import { useDispatch, useSelector } from "react-redux";
import ItemView from "../components/ItemView";
import { fetchStatusActions } from "../store/fetchStatus";
import { Link } from "react-router-dom";
import { TrendingUp, PieChart, Zap, Lock } from "lucide-react";

function Welcome() {
  const dispatch = useDispatch();

  const items = useSelector((state) => {
    return state.items;
  });

  const reloadItems = () => {
    return dispatch(fetchStatusActions.markStatusChanged());
  };

  return (
    <center className=" mt-20 w-full min-h-[calc(100vh-86px)] bg-gradient-to-br from-blue-50 via-white to-indigo-50 p-8">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full   text-5xl  text-slate-900 mb-6 leading-tight mb-6">
            Welcome to Expense Manager
          </h2>
          <h1 className="text-5xl font-black text-slate-900 mb-6 leading-tight">
            Take Control of Your <span className="text-blue-600">Finances</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
            Track, analyze, and manage your expenses with ease. Make smarter
            financial decisions with our powerful tools.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/signup">
              <button className="px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition shadow-lg hover:shadow-xl">
                Sign Up
              </button>
            </Link>
            <Link to="/signin">
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl border-2 border-blue-600 hover:bg-blue-50 transition shadow-lg hover:shadow-xl">
                Create Account
              </button>
            </Link>
          </div>

          {/* Divider */}
          <div className="flex items-center justify-center gap-4 mb-16">
            <div className="h-px bg-slate-300 flex-1"></div>
            <span className="text-slate-500 text-sm font-medium">
              Or continue as guest
            </span>
            <div className="h-px bg-slate-300 flex-1"></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition border border-slate-200">
            <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
              <TrendingUp className="text-blue-600 h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Track Expenses
            </h3>
            <p className="text-sm text-slate-600">
              Easily log and categorize all your expenses in one place
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition border border-slate-200">
            <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-4">
              <PieChart className="text-emerald-600 h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Smart Analytics
            </h3>
            <p className="text-sm text-slate-600">
              Visualize spending patterns with detailed charts and reports
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition border border-slate-200">
            <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
              <Zap className="text-amber-600 h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Quick Actions
            </h3>
            <p className="text-sm text-slate-600">
              Add expenses in seconds with our streamlined interface
            </p>
          </div>

          {/* Feature 4 */}
          <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition border border-slate-200">
            <div className="h-12 w-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
              <Lock className="text-rose-600 h-6 w-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">
              Secure & Private
            </h3>
            <p className="text-sm text-slate-600">
              Your financial data is encrypted and always protected
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 text-white shadow-lg">
            <div className="text-4xl font-black mb-2">1000+</div>
            <p className="text-blue-100">Active Users</p>
          </div>
          <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl p-8 text-white shadow-lg">
            <div className="text-4xl font-black mb-2">$50M+</div>
            <p className="text-emerald-100">Tracked Expenses</p>
          </div>
          <div className="bg-gradient-to-br from-amber-600 to-amber-700 rounded-2xl p-8 text-white shadow-lg">
            <div className="text-4xl font-black mb-2">50K+</div>
            <p className="text-amber-100">Monthly Transactions</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-12 shadow-lg border border-slate-200 mb-16">
          <h2 className="text-3xl font-black text-slate-900 text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-black text-blue-600">1</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Sign Up</h3>
              <p className="text-slate-600">
                Create your free account in seconds with just an email
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-3xl text-slate-300">→</div>
            </div>

            {/* Step 2 */}
            <div className="text-center md:col-span-1">
              <div className="h-16 w-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-black text-emerald-600">2</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Log Expenses
              </h3>
              <p className="text-slate-600">
                Add your expenses with categories and descriptions
              </p>
            </div>

            {/* Arrow */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-3xl text-slate-300">→</div>
            </div>

            {/* Step 3 */}
            <div className="text-center md:col-span-1">
              <div className="h-16 w-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-black text-amber-600">3</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Analyze & Save
              </h3>
              <p className="text-slate-600">
                View insights and manage your spending effectively
              </p>
            </div>
          </div>
        </div>

        {/* Items Display
        {items.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-black text-slate-900">
                  {items.length > 0
                    ? "Recent Transactions"
                    : "No Transactions Available"}
                </h2>
                <p className="text-slate-600 mt-2">
                  {items.length > 0
                    ? `You have ${items.length} transaction${items.length !== 1 ? "s" : ""} in your collection`
                    : "Start adding transactions to get started"}
                </p>
              </div>
              <button
                onClick={reloadItems}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
              >
                Reload Transactions
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
              {items.slice(0, 6).map((item) => (
                <ItemView key={item._id} item={item} />
              ))}
            </div>
          </div>
        )} */}

        {/* Empty State
        {items.length === 0 && (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-16 text-center">
            <div className="inline-block bg-slate-100 rounded-full p-4 mb-6">
              <svg
                className="w-12 h-12 text-slate-400"
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
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">
              No Transactions yet
            </h2>
            <p className="text-slate-600 max-w-sm mx-auto mb-6">
              Create your first transaction by clicking the "Add Transaction"
              button in the sidebar
            </p>
            <Link to="/additem">
              <button className="px-6 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition inline-block">
                Add Your First Transaction
              </button>
            </Link>
          </div>
        )} */}

        {/* Footer CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-12 text-center text-white mt-16">
          <h2 className="text-3xl font-black mb-4">Ready to get started?</h2>
          <p className="text-lg text-blue-100 mb-8">
            Join thousands of users managing their finances smartly
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <button className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-100 transition">
                Sign Up Now
              </button>
            </Link>
            <Link to="/signin">
              <button className="px-8 py-3 bg-blue-700 text-white font-bold rounded-xl hover:bg-blue-800 transition border-2 border-white">
                Create Free Account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </center>
  );
}

export default Welcome;
