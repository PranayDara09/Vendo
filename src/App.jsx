import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/login.jsx';
import Home from './components/Home.jsx';
import Search from './components/Search.jsx';
import Profile from './components/Profile.jsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;