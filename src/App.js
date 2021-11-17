import Header from './components/Parts/Header/Header';
import Home from './components/Pages/Home/Home';
import Profile from './components/Pages/Profile/Profile';
import  NotFound  from './components/Pages/NotFound/NotFound';
import Register from './components/Pages/Register/Register';
import Login from './components/Pages/Login/Login';
import './App.scss';
function App() {
  return (
    <div className='App'>
      <Header />
      <Home/>
      <Profile />
      <Register />
      <Login />
      <NotFound />
    </div>
  );
}
export default App;
