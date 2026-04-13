import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./routes/App.jsx";
import Expenses from "./routes/Expenses.jsx";
import AddExpense from "./routes/AddExpense.jsx";
import Dashboard from "./routes/Dashboard.jsx";
import { Provider } from "react-redux";
import itemsStore from "./store/index.js";
import Signup from "./routes/SignUpPage.jsx";
import SignIn from "./routes/SignIn.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Expenses /> },
      { path: "/addexpense", element: <AddExpense /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/signUp", element: <Signup /> },
      { path: "/signIn", element: <SignIn /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={itemsStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
