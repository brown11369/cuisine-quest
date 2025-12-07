import {  createBrowserRouter } from "react-router-dom";

import Layout from "@/pages/Layout";
import ClientLayout from "./pages/client/ClientLayout";
import Home from "./pages/client/Home";
import RestaurntLayout from "@/pages/restaurant/RestaurantLayout";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import User from "./pages/admin/User";
import Restaurants from "./pages/client/Restaurants";
import Shop from "@/pages/client/Shop";
import Contact from "./pages/client/Contact";
import UserAuth from "./pages/client/UserAuth";
import Cart from "./pages/client/Cart";
import Order from "./pages/client/Order";
import Account from "./pages/client/Account";
import RestaurantAuth from "@/pages/restaurant/RestaurantAuth";
import AdminAuth from "@/pages/admin/AdminAuth";
import Overview from "@/pages/restaurant/Overview";
import Products from "@/pages/restaurant/Products";
import RestaurantOrder from "@/pages/restaurant/RestaurantOrder";
import Profile from "@/pages/restaurant/Profile";
import OrderComplete from "./pages/client/OrderComplete";
import OrderCancel from "./pages/client/OrderCancel";
// import Error from '@/pages/Error';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // errorElement: <Error />,
    children: [
      {
        element: <ClientLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "restaurants",
            element: <Restaurants />,
          },
          {
            path: "shop",
            element: <Shop />,
          },
          {
            path: "contact",
            element: <Contact />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "account",
            element: <Account />,
          },
          {
            path: "orders",
            element: <Order />,
          },
          {
            path: "orders/complete",
            element: <OrderComplete />,
          },
          {
            path: "orders/cancel",
            element: <OrderCancel />,
          },
          {
            path: "authentication",
            element: <UserAuth />,
          },
        ],
      },
      {
        path: "restaurant/authentication",
        element: <RestaurantAuth />,
      },
      {
        path: "restaurant",
        element: <RestaurntLayout />,
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: "overview",
            element: <Overview />,
          },
          {
            path: "products",
            element: <Products />,
          },
          {
            path: "orders",
            element: <RestaurantOrder />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "admin/authentication",
        element: <AdminAuth />,
      },
      {
        path: "admin-dashboard",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />,
          },
          {
            path: "user",
            element: <User />,
          },
        ],
      },
    ],
  },
]);