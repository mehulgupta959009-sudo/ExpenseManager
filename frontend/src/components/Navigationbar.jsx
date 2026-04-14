import { Link } from "react-router-dom";
import { uiStatusActions } from "../store/uiStatusSlice";
import { useDispatch } from "react-redux";

function Navigationbar() {
  const dispatch = useDispatch();
  const handler = () => {
    dispatch(uiStatusActions.hideSideBar());
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={handler}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-700 transition-all duration-200 group"
              aria-label="Toggle sidebar"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <a
              href="/"
              className="flex items-center space-x-2 group cursor-pointer"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-white font-black text-lg">TP</span>
              </div>
              <span className="hidden sm:block text-xl font-black text-white group-hover:text-blue-400 transition-colors">
                TimePass
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a
              href="/"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              About
            </a>
            <a
              href="#projects"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Projects
            </a>
            <a
              href="#services"
              className="text-gray-300 hover:text-white text-sm font-medium transition-colors"
            >
              Services
            </a>
          </div>

          <Link to="/signUp">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigationbar;
