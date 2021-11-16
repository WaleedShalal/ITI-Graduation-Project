import './App.scss';
import Cart from './components/Pages/Cart/Cart';
import Products from './components/Pages/Products/Products';
// import Home from './components/Pages/Home/Home';
import Header from './components/Parts/Header/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      {/* <Home /> */}
      <Products />
      <Cart />
    </div>
  );
}
export default App;
