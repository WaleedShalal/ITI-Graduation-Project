
import Header from './components/Parts/Header/Header';
import Home from './components/Pages/Home/Home';
import Profile from './components/Pages/Profile/Profile';
import  NotFound  from './components/Pages/NotFound/NotFound';

import './App.scss';
function App() {
  return (
    <div className='App'>
      <Header />
      <NotFound />
    </div>
  );
}
export default App;
