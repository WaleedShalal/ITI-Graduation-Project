import Header from './components/Parts/Header/Header';
import Home from './components/Pages/Home/Home';
import Profile from './components/Pages/Profile/Profile';
import  NotFound  from './components/Pages/NotFound/NotFound';

import './App.scss';
import Register from './components/Pages/Register/Register';
function App() {
  return (
    <div className='App'>
      <Header />
      <Profile />
      <Register />
      <NotFound />
    </div>
  );
}
export default App;
