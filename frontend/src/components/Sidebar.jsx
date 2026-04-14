import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="w-66 mt-20 flex">
      <div className="fixed h-[calc(100vh-5rem)] w-50 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl">
        <ul className="space-y-2 p-4">
          <Link to="/">
            <li className="px-6 py-3 rounded-lg hover:bg-gray-700 bg-gray-700/50 text-white font-medium transition-all duration-200 cursor-pointer hover:pl-8 group">
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
                    d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h3m10-11l2 3m-2-3V9m0 0h3a1 1 0 011 1v10M9 9h3m-3 0h.008v.008H9V9z"
                  />
                </svg>
                <span>Home</span>
              </span>
            </li>
          </Link>

          <Link to="/additem">
            <li className="px-6 py-3 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white font-medium transition-all duration-200 cursor-pointer hover:pl-8 group">
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
                <span>Add Item</span>
              </span>
            </li>
          </Link>

          <Link to="/favorites">
            <li className="px-6 py-3 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white font-medium transition-all duration-200 cursor-pointer hover:pl-8 group">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>Favorites</span>
              </span>
            </li>
          </Link>

          <Link to="/signIn">
            <li className="px-6 py-3 rounded-lg hover:bg-gray-700 text-gray-300 hover:text-white font-medium transition-all duration-200 cursor-pointer hover:pl-8 group">
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
