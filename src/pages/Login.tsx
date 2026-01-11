import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // 1. ВІДПРАВЛЯЄМО ДАНІ НА БЕКЕНД
      // Замість читання файлу, ми просимо сервер перевірити пароль
      const response = await axios.post('http://127.0.0.1:8000/course/check-status', {
        email: email,
        password: password
      });

      // 2. ЯКЩО УСПІХ (Сервер повернув 200 OK)
      const userData = response.data.user;

      // Зберігаємо юзера в пам'ять
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Переходимо в кабінет
      navigate('/dashboard');

    } catch (err: any) {
      // 3. ОБРОБКА ПОМИЛОК
      if (err.response && err.response.status === 401) {
        setError('Неверный Email или Пароль');
      } else if (err.code === "ERR_NETWORK") {
        setError('Сервер недоступен. Запустите Python backend.');
      } else {
        setError('Ошибка входа. Попробуйте позже.');
        console.error(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0f] flex items-center justify-center p-4 font-sans text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-green-600 rounded-full blur-[150px] opacity-10 -z-10" />

      <div className="glass w-full max-w-md p-8 rounded-2xl border border-white/10 shadow-2xl relative">
        <Link to="/" className="absolute top-4 right-4 text-gray-500 hover:text-white transition">✕</Link>
        
        <div className="text-center mb-8">
            <Link to="/" className="text-2xl font-extrabold tracking-tighter cursor-pointer block mb-2">
                GORPS<span className="text-green-500">CORE</span>
            </Link>
            <p className="text-gray-400 text-sm">Вход в личный кабинет студента</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm text-center animate-pulse">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              placeholder="Введите ваш email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Пароль</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-green-500 transition"
              placeholder="Введите пароль"
              required
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-3 rounded-xl hover:shadow-[0_0_20px_rgba(34,197,94,0.4)] transition duration-300 disabled:opacity-50"
          >
            {isLoading ? 'Проверка...' : 'Войти в систему'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          Забыли пароль? <a href="#" className="text-green-500 hover:underline">Напишите в поддержку</a>
        </div>
      </div>
    </div>
  );
}