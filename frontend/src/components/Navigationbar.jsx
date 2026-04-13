import { Link } from "react-router-dom";
import { uiStatusActions } from "../store/uiStatusSlice";
import { useDispatch } from "react-redux";

function Navigationbar() {
  const dispatch = useDispatch();
  const handler = () => {
    dispatch(uiStatusActions.hideSideBar());
  };

  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center space-x-4">
            <button
              onClick={handler}
              className="p-2 rounded-lg text-white hover:bg-indigo-600 transition-all duration-200 group"
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
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <span className="text-indigo-600 font-black text-lg">💰</span>
              </div>
              <span className="hidden sm:block text-xl font-black text-white group-hover:text-indigo-100 transition-colors">
                ExpenseHub
              </span>
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-indigo-100 text-sm font-medium transition-colors"
            >
              Expenses
            </Link>
            <Link
              to="/dashboard"
              className="text-white hover:text-indigo-100 text-sm font-medium transition-colors"
            >
              Dashboard
            </Link>
            <a
              href="#about"
              className="text-white hover:text-indigo-100 text-sm font-medium transition-colors"
            >
              Help
            </a>
          </div>

          <Link to="/signUp">
            <button className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold px-6 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg active:scale-95">
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navigationbar;
