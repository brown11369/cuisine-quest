import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Layout from './pages/Layout';
import ClientLayout from './pages/client/ClientLayout';
import Home from "./pages/client/Home"
import RestaurntLayout from './pages/restaurant/RestaurantLayout';
import RestaurantDashboard from './pages/restaurant/RestaurantDashboard';
import Food from './pages/restaurant/Food';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import User from './pages/admin/User';
import Restaurants from './pages/client/Restaurants';
import Shop from './pages/client/Shop';
import Contact from './pages/client/Contact';
import UserAuth from './pages/client/UserAuth';
import Cart from './pages/client/Cart';
import { Provider } from 'react-redux';
import store from './redux/store';
import Order from './pages/client/Order';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        element: <ClientLayout />,
        children: [
          {
            index: true,
            element: <Home />
          },
          {
            path: "restaurants",
            element: <Restaurants/>
          },
          {
            path: "shop",
            element: <Shop/>
          },
          {
            path: "contact",
            element: <Contact/>
          },
          {
            path: "cart",
            element: <Cart/>
          },
          {
            path: "orders",
            element: <Order/>
          },
          {
            path: "authentication",
            element: <UserAuth/>
          },
        ]
      },
      {
        path: "restaurant-dashboard",
        element: <RestaurntLayout />,
        children: [
          {
            index: true,
            element: <RestaurantDashboard />
          },
          {
            path: 'food',
            element: <Food />
          },
        ]
      },
      {
        path: "admin-dashboard",
        element: <AdminLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboard />
          },
          {
            path: 'user',
            element: <User />
          },
        ]
      },
    ]
  }
])


function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}

export default App


{/* <BrowserRouter>
        <Routes>
          <Route path='*' element={<Error />}></Route>
          <Route path='/' element={<Home />}></Route>
          <Route path='/restaurant-sign' element={<Restaurantsign />}></Route>
          <Route path='/restaurants' element={<Restaurants />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/shop' element={<Shop />}></Route>
          <Route path='/blogs' element={<Blogs />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/order' element={<Order />}></Route>
          <Route path='/account' element={<Account />}></Route>
          <Route path='/foods' element={<Foodcard />}></Route>
          <Route path='/dashboard' element={
            <Restrict>
              <Dashboard />
            </Restrict>
          }>
            <Route path='/dashboard/overview' element={<Overview />} />
            <Route path='/dashboard/add' element={<Add />} />
            <Route path='/dashboard/action' element={<Action />} />
            <Route path='/dashboard/user' element={<User />} />
            <Route path='/dashboard/order' element={<RestOrder />} />
          </Route>
        </Routes>
      </BrowserRouter> */}
