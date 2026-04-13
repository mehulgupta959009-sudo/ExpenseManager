import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-66 mt-20 flex">
      <div className="fixed h-[calc(100vh-5rem)] w-50 bg-gradient-to-b from-indigo-900 to-purple-900 text-white shadow-2xl">
        <ul className="space-y-2 p-4">
          <Link to="/">
            <li className="px-6 py-3 rounded-lg hover:bg-indigo-700 bg-indigo-700/60 text-white font-medium transition-all duration-200 cursor-pointer hover:pl-8 group">
              <span className="flex items-center space-x-3">
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
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>All Expenses</span>
              </span>
            </li>
          </Link>

          <Link to="/addexpense">
            <li className="px-6 py-3 rounded-lg hover:bg-indigo-700 text-indigo-100 hover:text-white font-medium transition-all duration-200 cursor-pointer hover:pl-8 group">
              <span className="flex items-center space-x-3">
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
              </span>
            </li>
          </Link>

          <Link to="/dashboard">
            <li className="px-6 py-3 rounded-lg hover:bg-indigo-700 text-indigo-100 hover:text-white font-medium transition-all duration-200 cursor-pointer hover:pl-8 group">
              <span className="flex items-center space-x-3">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
                <span>Dashboard</span>
              </span>
            </li>
          </Link>

          <Link to="/signIn">
            <li className="px-6 py-3 rounded-lg hover:bg-indigo-700 text-indigo-100 hover:text-white font-medium transition-all duration-200 cursor-pointer hover:pl-8 group">
              <span className="flex items-center space-x-3">
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
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2"
                  />
                </svg>
                <span>Sign In</span>
              </span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}

export default Sidebar;
