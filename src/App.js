import Header from './components/Parts/Header/Header';
// import Home from './components/Pages/Home/Home';
// import Profile from './components/Pages/Profile/Profile';

import './App.scss';
import Login from './components/Pages/Login/Login';
function App() {
  return (
    <div className='App'>
      <Header />
      {/* <Profile /> */}
      <Login />
    </div>
  );
}
export default App;
