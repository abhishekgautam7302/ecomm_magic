
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import Policy from './Pages/Policy';
import PageNotFound from './Pages/PageNotFound';
import AboutUs from './Pages/AboutUs';
import ContactUs from './Pages/ContactUs';
import Login from './Pages/Auth/Login';
import SignUp from './Pages/Auth/SignUp';
import Dashboard from './Pages/User/Dashboard';
import PrivateRoute from './components/Routes/Private';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import AdminRoute from './components/Routes/AdminRoute';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import Users from './Pages/Admin/Users';
import Orders from './Pages/User/Orders';
import Profile from './Pages/User/Profile';
import ProductView from './Pages/Admin/ProductView';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import Search from './Pages/Search';
import ProductDetails from './Pages/ProductDetails';
import Categories from './Pages/Categories';
import CategoryProduct from './Pages/CategoryProduct';
import CartPage from './Pages/CartPage';
import MainPage from './Pages/MainPage';
import OrdersUsers from './Pages/Admin/OrdersUsers';
import Services from './Pages/Admin/Services';
import ProfileUpdate from './Pages/User/ProfileUpdate';

function App() {
  return (
    <div>
      <Routes>
        <Route path='/main' element={<MainPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='/category/:slug' element={<CategoryProduct />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/product/:slug' element={<ProductDetails />} />
        <Route path='/login' element={<Login />} />
        <Route path='/search' element={<Search />} />
        <Route path='/signup' element={<SignUp />} />

        {/*==================User Protected route==================*/}

        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/orders' element={<Orders />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='profile/update' element={<ProfileUpdate />} />

        </Route>

        {/* ====================Admin Protected route=================== */}
        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path='admin' element={<AdminDashboard />} />
          <Route path='admin/create-category' element={<CreateCategory />} />
          <Route path='admin/create-product' element={<CreateProduct />} />
          <Route path='admin/products' element={<ProductView />} />
          <Route path='admin/product/:slug' element={<UpdateProduct />} />
          <Route path='admin/orders' element={<OrdersUsers />} />
          <Route path='admin/services' element={<Services />} />
          <Route path='admin/users' element={<Users />} />
        </Route>


        <Route path='/forgot-Passowrd' element={<ForgotPassword />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
