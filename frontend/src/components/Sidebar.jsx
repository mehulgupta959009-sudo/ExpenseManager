import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-80 mt-20 flex">
      <div className="fixed h-[calc(100vh-5rem)] w-65 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl border-r border-slate-700">
        <div className="p-4">
          <h2 className="text-xl font-bold text-slate-100 mb-8 px-4">Menu</h2>
          <ul className="space-y-2">
            <Link to="/">
              <li
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer flex items-center space-x-3 group ${
                  isActive("/")
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <span
                  className={`transition-transform duration-300 ${
                    isActive("/") ? "scale-110" : "group-hover:scale-110"
                  }`}
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
                      d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h3m10-11l2 3m-2-3V9m0 0h3a1 1 0 011 1v10M9 9h3m-3 0h.008v.008H9V9z"
                    />
                  </svg>
                </span>
                <span>Home</span>
              </li>
            </Link>

            <Link to="/additem">
              <li
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer flex items-center space-x-3 group ${
                  isActive("/additem")
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <span
                  className={`transition-transform duration-300 ${
                    isActive("/additem") ? "scale-110" : "group-hover:scale-110"
                  }`}
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
                </span>
                <span>Add Transaction</span>
              </li>
            </Link>

            <Link to="/favorites">
              <li
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer flex items-center space-x-3 group ${
                  isActive("/favorites")
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <span
                  className={`transition-transform duration-300 ${
                    isActive("/favorites")
                      ? "scale-110"
                      : "group-hover:scale-110"
                  }`}
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
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                  </svg>
                </span>
                <span>Transactions</span>
              </li>
            </Link>

            <Link to="/signIn">
              <li
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer flex items-center space-x-3 group ${
                  isActive("/signIn")
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <span
                  className={`transition-transform duration-300 ${
                    isActive("/signIn") ? "scale-110" : "group-hover:scale-110"
                  }`}
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2"
                    />
                  </svg>
                </span>
                <span>Sign In</span>
              </li>
            </Link>
            <Link to="/settings">
              <li
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 cursor-pointer flex items-center space-x-3 group ${
                  isActive("/settings")
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                }`}
              >
                <span
                  className={`transition-transform duration-300 ${
                    isActive("/settings")
                      ? "scale-110"
                      : "group-hover:scale-110"
                  }`}
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
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v2a2 2 0 01-2 2H7a2 2 0 01-2-2v-2"
                    />
                  </svg>
                </span>
                <span>Settings</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}

export default Sidebar;
