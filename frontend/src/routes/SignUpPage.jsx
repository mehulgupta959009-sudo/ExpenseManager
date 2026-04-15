import { Link } from "react-router-dom";
import { postLogin } from "../services/managefetching";
import { useDispatch } from "react-redux";
import { uiStatusActions } from "../store/uiStatusSlice";

function Signup() {
  const dispatch = useDispatch();

  const loginHandler = (email, password) => {
    postLogin(email, password).then((res) => {
      console.log(res);
      if (res.validation === "success") {
        dispatch(uiStatusActions.Loggedin());
      }
    });
  };

  return (
    <div className="w-full mt-20 pb-10 flex items-center justify-center min-h-[calc(100vh-5rem)]">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg p-8 border border-gray-200">
          <h1 className="text-3xl font-black text-gray-900 mb-2">Sign Up</h1>
          <p className="text-gray-600 mb-8">
            Create your account to get started
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              loginHandler(e.target.email.value, e.target.password.value);
              e.target.email.value = "";
              e.target.password.value = "";
            }}
            className="space-y-5"
          >
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
                type="email"
                name="email"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <input
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors text-gray-900 placeholder-gray-500"
                type="password"
                name="password"
                required
              />
            </div>

            <button
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95"
              type="submit"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signin"
                className="text-blue-600 font-semibold hover:text-blue-700"
              >
                Sign In here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
