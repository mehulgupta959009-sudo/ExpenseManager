import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-66 mt-20 flex">
      <div className="fixed h-[calc(100vh-5rem)] w-50 bg-gradient-to-b from-indigo-900 to-purple-900 text-white shadow-2xl overflow-y-auto">
        <ul className="space-y-2 p-4">
          {/* Main Transactions Page */}
          <Link to="/">
            <li className="px-6 py-3 rounded-lg hover:bg-indigo-700 bg-indigo-700/60 text-white font-medium transition-all duration-200 cursor-pointer hover:pl-8 group">
              <span className="flex items-center space-x-3">
                <span className="text-xl">💰</span>
                <span>Transactions</span>
              </span>
            </li>
          </Link>

          {/* Dashboard */}
          <Link to="/dashboard">
            <li className="px-6 py-3 rounded-lg hover:bg-indigo-700 text-indigo-100 hover:text-white font-medium transition-all duration-200 cursor-pointer hover:pl-8 group">
              <span className="flex items-center space-x-3">
                <span className="text-xl">📊</span>
                <span>Dashboard</span>
              </span>
            </li>
          </Link>

          <hr className="my-4 border-indigo-700" />

          {/* Sign In / Auth */}
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
