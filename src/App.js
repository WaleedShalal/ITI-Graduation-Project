import './App.scss';
import Products from './components/Pages/Products/Products';
// import Home from './components/Pages/Home/Home';
import Header from './components/Parts/Header/Header';

function App() {
  return (
    <div className='App'>
      <Header />
      {/* <Home /> */}
      <Products />
    </div>
  );
}
export default App;
