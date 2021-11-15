import logo from './logo.svg';
import './App.scss';
import Home from './components/Pages/Home/Home';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Home />
        <span className='btn btn-primary'>
          <i class='fas fa-thumbs-up'></i>
        </span>
      </header>
    </div>
  );
}

export default App;
