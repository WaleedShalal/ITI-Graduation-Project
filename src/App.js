import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import { ToastContainer } from 'react-toastify';
import '../node_modules/react-toastify/dist/ReactToastify.css';
import Header from './components/Parts/Header/Header';
import WelcomePage from './components/Pages/WelcomePage/WelcomePage';
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import Home from './components/Pages/Home/Home';
import Profile from './components/Pages/Profile/Profile';
import Products from './components/Pages/Products/Products';
import Cart from './components/Pages/Cart/Cart';
import Admin from './components/Pages/Admin/Admin';
import NotFound from './components/Pages/NotFound/NotFound';
import ProductDetails from './components/Pages/ProductDetails/ProductDetails';
import ProductForm from './components/Pages/ProductForm/ProductForm';
import Messages from './components/Pages/Messages/MessagesView/Messages';
import PrivateRoute from './context/guard';
import EditProfile from './components/Pages/EditProfile/EditProfile';
import SearchPage from './components/Pages/SearchPage/SearchPage';
import './App.scss';

function App() {
  const { pathname } = useLocation();
  return (
    <div className='App'>
      <ToastContainer />
      {pathname !== '/login' &&
        pathname !== '/register' &&
        pathname !== '/welcome' && <Header />}
      <Routes>
        <Route exact path='/' element={<PrivateRoute />}>
          <Route exact path='/' element={<Home />} />
          <Route exact path='home' element={<Navigate to='/' />} />
          <Route exact path='profile/:id' element={<Profile />} />
          <Route exact path='edit' element={<EditProfile />} />
          <Route path='cart' element={<Cart />} />
          <Route path='admin' element={<Admin />} />
          <Route path='productform/:id' element={<ProductForm />} />
          <Route path='products/:id' element={<Products />} />
          <Route
            path='products/productdetails/:id'
            element={<ProductDetails />}
          />
          <Route path='cart/productdetails/:id' element={<ProductDetails />} />
          <Route path='/messages' element={<Messages />} />
        </Route>
        <Route path='welcome' element={<WelcomePage />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='search/:name' element={<SearchPage />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
