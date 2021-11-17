import Header from './components/Parts/Header/Header';
import Login from './components/Pages/Login/Login';
import Register from './components/Pages/Register/Register';
import Home from './components/Pages/Home/Home';
import Profile from './components/Pages/Profile/Profile';
import Products from './components/Pages/Products/Products';
import  NotFound  from './components/Pages/NotFound/NotFound';
import './App.scss';
function App() {
  return (
    <div className='App'>
      <Header />
      <Login />
      <Register />
      <Home/>
      <Profile />
      <Products />
      <NotFound />
    </div>
  );
}
export default App;
