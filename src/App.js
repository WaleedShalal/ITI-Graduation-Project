import './App.scss';
import Admin from './components/Pages/Admin/Admin';
import Products from './components/Pages/Products/Products';
// import Home from './components/Pages/Home/Home';
import Header from './components/Parts/Header/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      {/* <Home /> */}
      <Products />
      <Admin />
    </div>
  );
}
export default App;
