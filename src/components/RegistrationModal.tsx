import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
}

// Тип для повідомлення
interface ToastState {
  type: 'success' | 'error';
  title: string;
  message: string;
}

export default function RegistrationModal({ isOpen, onClose, planName }: ModalProps) {
  const navigate = useNavigate();
  const [creds, setCreds] = useState({ email: '', password: '' });
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  // Стейт для красивого повідомлення
  const [toast, setToast] = useState<ToastState | null>(null);

  // Генеруємо випадкові дані при відкритті вікна
  useEffect(() => {
    if (isOpen) {
      const randomId = Math.floor(10000 + Math.random() * 90000);
      const password = `TRD-${Math.random().toString(36).slice(-6).toUpperCase()}`;
      
      setCreds({
        email: `student${randomId}@smartmoney.system`,
        password: password
      });
      setToast(null); // Скидаємо помилки при відкритті
    }
  }, [isOpen]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(`Login: ${creds.email}\nPass: ${creds.password}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLoginAndRedirect = async () => {
    setIsLoading(true);
    setToast(null);

    const newUser = {
      email: creds.email,
      password: creds.password
    };

    try {
      // 1. ВІДПРАВКА НА БЕКЕНД
      try {
        await axios.post('http://127.0.0.1:8000/course/register', newUser);
        console.log("✅ User registered on Python Backend");
      } catch (e) {
        console.warn("⚠️ Backend Error (Offline Mode)");
      }

      // 2. ЗБЕРЕЖЕННЯ В БРАУЗЕРІ
      const sessionUser = {
        id: Date.now(),
        email: newUser.email,
        password: newUser.password,
        name: "Trader " + newUser.email.split('@')[0].replace("student", ""),
        isPro: false 
      };
      
      localStorage.setItem('user', JSON.stringify(sessionUser));

      // 3. ПОКАЗУЄМО УСПІХ (TOAST)
      setToast({
        type: 'success',
        title: 'ACCESS GRANTED',
        message: 'Redirecting to secure dashboard...'
      });

      // 4. ЗАТРИМКА ПЕРЕД ПЕРЕХОДОМ (Щоб юзер побачив успіх)
      setTimeout(() => {
        onClose();
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error("Critical Error:", error);
      setToast({
        type: 'error',
        title: 'SYSTEM ERROR',
        message: 'Failed to create account. Try again.'
      });
      setIsLoading(false);
    } 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Затемнення фону */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity" onClick={onClose}></div>

      {/* --- TOAST NOTIFICATION (Спливаюче повідомлення) --- */}
      {toast && (
        <div className="absolute top-10 left-1/2 -translate-x-1/2 z-[110] w-full max-w-sm animate-in slide-in-from-top-5 duration-300">
           <div className={`p-4 rounded-xl border backdrop-blur-xl shadow-2xl flex items-start gap-4 ${
             toast.type === 'success' 
               ? 'bg-green-900/80 border-green-500/50 text-green-100' 
               : 'bg-red-900/80 border-red-500/50 text-red-100'
           }`}>
              <div className={`mt-1 text-xl ${toast.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                {toast.type === 'success' ? '🚀' : '⚠️'}
              </div>
              <div>
                <h4 className={`font-bold text-sm tracking-wider ${toast.type === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {toast.title}
                </h4>
                <p className="text-xs opacity-80 mt-1">{toast.message}</p>
              </div>
           </div>
        </div>
      )}

      {/* Модалка */}
      <div className="relative bg-[#0f0f13] border border-green-500/30 w-full max-w-lg rounded-2xl p-6 md:p-8 shadow-[0_0_50px_rgba(34,197,94,0.15)] transform transition-all scale-100">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-white transition">✕</button>
        
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 text-green-500 mb-4 border border-green-500/20 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.131A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.2-2.858.59-4.18M5.55 17.55l-1 -1"></path></svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">System ID Generated</h2>
          <p className="text-gray-400 text-xs uppercase tracking-widest">
            Тариф: <span className="text-green-400 font-bold">{planName}</span>
          </p>
        </div>

        {/* Блок з логіном/паролем */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-6 mb-6 relative group">
          <div className="space-y-4">
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Access ID (Login)</label>
              <div className="text-lg font-mono text-white tracking-wider select-all">{creds.email}</div>
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Secret Key (Password)</label>
              <div className="text-lg font-mono text-green-400 tracking-wider font-bold select-all">{creds.password}</div>
            </div>
          </div>
          
          <button 
            onClick={copyToClipboard}
            className="absolute top-4 right-4 bg-white/5 hover:bg-white/20 p-2 rounded-lg transition border border-white/5 group-hover:border-green-500/30"
            title="Копировать данные"
          >
            {copied ? <span className="text-green-500 text-xs font-bold">COPIED</span> : '📋'}
          </button>
        </div>

        {/* Попередження */}
        <div className="bg-amber-500/5 border border-amber-500/20 p-4 rounded-lg mb-6 flex gap-3 items-start">
            <div className="text-amber-500 text-lg mt-0.5">⚠️</div>
            <p className="text-xs text-gray-400 leading-relaxed font-mono">
                <span className="text-amber-500 font-bold">SECURITY WARNING:</span><br/>
                Сохраните эти данные. Восстановление доступа невозможно без Secret Key.
            </p>
        </div>

        <button 
          onClick={handleLoginAndRedirect}
          disabled={isLoading || toast?.type === 'success'} // Блокуємо кнопку, якщо вже успіх
          className="w-full bg-green-600 hover:bg-green-500 text-black font-bold py-4 rounded-xl text-lg transition shadow-[0_0_20px_rgba(34,197,94,0.2)] hover:shadow-[0_0_30px_rgba(34,197,94,0.4)] disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
        >
          {isLoading ? 'Processing...' : 'Confirm & Enter Dashboard'}
        </button>
      </div>
    </div>
  );
}