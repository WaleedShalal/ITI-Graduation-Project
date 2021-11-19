import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Parts/Header/Header';
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
import './App.scss';

function App() {
  return (
    <div className='App'>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Navigate to='/' />} />
        <Route path='profile' element={<Profile />} />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='products' element={<Products />} />
        <Route
          path='products/productdetails/:id'
          element={<ProductDetails />}
        />
        <Route path='cart/productdetails/:id' element={<ProductDetails />} />
        <Route path='cart' element={<Cart />} />
        <Route path='admin' element={<Admin />} />
        <Route path='productform/:id' element={<ProductForm />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}
export default App;
