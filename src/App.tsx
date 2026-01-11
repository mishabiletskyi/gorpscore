import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Offer from './pages/Offer';
import Privacy from './pages/Privacy';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Routes>
      {/* Головна сторінка (Лендінг) */}
      <Route path="/" element={<Home />} />
      
      {/* Юридичні сторінки (для модерації) */}
      <Route path="/offer" element={<Offer />} />
      <Route path="/privacy" element={<Privacy />} />
      
      {/* Сторінка входу */}
      <Route path="/login" element={<Login />} />
      
      {/* Кабінет студента (захищений) */}
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;