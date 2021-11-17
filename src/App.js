import Header from './components/Parts/Header/Header';
import Home from './components/Pages/Home/Home';
import Profile from './components/Pages/Profile/Profile';

import './App.scss';
import Register from './components/Pages/Register/Register';
function App() {
  return (
    <div className='App'>
      <Header />
      <Profile />
      <Register />
    </div>
  );
}
export default App;
