import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./routes/App.jsx";
import Welcome from "./routes/Welcome.jsx";
import AddingItem from "./routes/AddingItem.jsx";
import Favorites from "./routes/Favorites.jsx";
import { Provider } from "react-redux";
import itemsStore from "./store/index.js";
import Signup from "./routes/SignUpPage.jsx";
import SignIn from "./routes/SignIn.jsx";
import Settings from "./routes/Settings.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Welcome /> },
      { path: "/additem", element: <AddingItem /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/signUp", element: <Signup /> },
      { path: "/signIn", element: <SignIn /> },
      { path: "/settings", element: <Settings /> },
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
