import './App.css';
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/Nav';
import Home from './pages/Home';
import Profile from './pages/Profile';

function App() {
  return (
    <>
      <header>
        <NavBar />
      </header>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
        </Routes>
    </>
  );
}

export default App;
