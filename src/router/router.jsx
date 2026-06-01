import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import CartPage from "../pages/CartPage";
import ErrorPage from "../pages/error/ErrorPage";
import HomePage from "../pages/HomePage";
import ShopPage from "../pages/ShopPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "shop", element: <ShopPage /> },
      { path: "cart", element: <CartPage /> },
    ],
  },
]);

export default router;
