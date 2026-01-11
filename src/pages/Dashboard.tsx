import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { courseModules, getVideoUrl, getPdfUrl } from '../data/courseContent';
import type { Lesson } from '../data/courseContent'; 
import PdfViewer from '../components/PdfViewer';
import PurchaseModal from '../components/PurchaseModal'; // <--- Імпортуємо нову модалку

export default function Dashboard() {
  const navigate = useNavigate();
  
  // --- STATE ---
  const [activeLesson, setActiveLesson] = useState<Lesson>(courseModules[0].lessons[0]);
  const [user, setUser] = useState<any>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  
  // Стейт для модалки покупки
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  
  // Стейт для красивих повідомлень (Toast)
  const [toast, setToast] = useState<{message: string, type: 'success' | 'info'} | null>(null);

  // --- EFFECTS ---
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
    }
  }, [navigate]);

  // Авто-приховування тоста через 3 секунди
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  // --- HANDLERS ---
  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const handleOpenPurchaseModal = () => {
    setShowPurchaseModal(true);
  };

  const handlePlanSelection = (plan: 'Self Study' | 'Mentorship') => {
    setShowPurchaseModal(false);
    
    // Імітація переходу на оплату
    setToast({ 
      message: `Переход на оплату: ${plan}... (Cryptomus)`, 
      type: 'success' 
    });

    // Тут буде логіка редіректу, наприклад:
    // window.location.href = `https://cryptomus.com/pay/...`
  };

  if (!user) return null;

  const hasAccess = activeLesson.isFree || user.isPro;
  const hasPdf = activeLesson.pdfFileName && activeLesson.pdfFileName !== "";

  return (
    <div className="min-h-screen bg-[#0b0b0f] font-sans text-white flex overflow-hidden relative">
      
      {/* --- TOAST NOTIFICATION (Красива заміна alert) --- */}
      {toast && (
        <div className="fixed top-6 right-6 z-[200] animate-in slide-in-from-top-5 duration-300">
          <div className={`px-6 py-4 rounded-xl border shadow-2xl backdrop-blur-md flex items-center gap-3 ${
            toast.type === 'success' 
              ? 'bg-green-500/10 border-green-500/20 text-green-400' 
              : 'bg-blue-500/10 border-blue-500/20 text-blue-400'
          }`}>
             <span className="text-xl">{toast.type === 'success' ? '🚀' : 'ℹ️'}</span>
             <span className="font-bold text-sm">{toast.message}</span>
          </div>
        </div>
      )}

      {/* --- PURCHASE MODAL --- */}
      <PurchaseModal 
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onSelectPlan={handlePlanSelection}
      />

      {/* --- SIDEBAR --- */}
      <aside 
        className={`${isSidebarOpen ? 'w-80' : 'w-0'} bg-[#0f0f13] border-r border-white/5 flex flex-col h-screen transition-all duration-300 relative z-20 shrink-0`}
      >
        <div className="p-6 border-b border-white/5 flex justify-between items-center shrink-0">
            <Link to="/" className="text-xl font-extrabold tracking-tighter text-white no-underline">
                TRADING<span className="text-green-500">.SYSTEM</span>
            </Link>
        </div>

        <div className="p-4 bg-white/5 m-4 rounded-xl border border-white/5 shrink-0">
            <div className="flex justify-between items-start">
                <div className="overflow-hidden">
                    <div className="font-bold truncate text-sm mb-1">{user.name}</div>
                    <div className="text-xs text-gray-400 truncate">{user.email}</div>
                </div>
                <div className={`text-[10px] font-bold px-2 py-1 rounded ml-2 ${user.isPro ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                    {user.isPro ? 'PRO' : 'DEMO'}
                </div>
            </div>
        </div>

        <div className="flex-1 overflow-y-auto px-2 space-y-6 pb-20 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
            {courseModules.map((mod, modIndex) => (
                <div key={modIndex}>
                    <h3 className="text-[10px] font-bold text-gray-500 uppercase mb-2 px-4 tracking-wider sticky top-0 bg-[#0f0f13] py-2 z-10">
                        {mod.title}
                    </h3>
                    <div className="space-y-1">
                        {mod.lessons.map((lesson) => {
                            const isLocked = !lesson.isFree && !user.isPro;
                            const isActive = activeLesson.id === lesson.id;
                            
                            return (
                                <button
                                    key={lesson.id}
                                    onClick={() => setActiveLesson(lesson)}
                                    className={`w-full text-left px-4 py-3 rounded-lg flex justify-between items-center transition group relative ${
                                        isActive
                                            ? 'bg-green-600/10 text-green-500 border border-green-600/20' 
                                            : 'hover:bg-white/5 text-gray-400 hover:text-white'
                                    }`}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] flex-shrink-0 ${isActive ? 'bg-green-500 text-black' : 'bg-white/10'}`}>
                                            {isLocked ? '🔒' : '▶'}
                                        </div>
                                        <span className="text-sm truncate">{lesson.title}</span>
                                    </div>
                                    {lesson.pdfFileName && (
                                      <span className="text-[10px] opacity-50 ml-1" title="Есть методичка">📄</span>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
        </div>

        <div className="p-4 border-t border-white/5 bg-[#0f0f13] shrink-0">
            <button onClick={handleLogout} className="w-full py-2 text-xs text-gray-500 hover:text-white transition">Выйти из системы</button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative bg-[#0b0b0f]">
        
        <div className="p-4 md:hidden flex items-center bg-[#0f0f13] border-b border-white/5 shrink-0">
            <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="text-white mr-4 text-xl">☰</button>
            <span className="font-bold">Кабинет</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8 scrollbar-thin scrollbar-thumb-gray-800">
            <div className="max-w-5xl mx-auto pb-20">
                
                <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
                    <span className="uppercase tracking-widest text-xs font-bold text-green-500">Урок {activeLesson.id}</span> 
                    <span>/</span> 
                    <span className="text-gray-300">{activeLesson.title}</span>
                </div>

                {/* VIDEO PLAYER */}
                <div className="aspect-video bg-black rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden group mb-8">
                    {!hasAccess ? (
                        <div className="absolute inset-0 z-10 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-6">
                            <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center text-2xl mb-4">🔒</div>
                            <h2 className="text-2xl font-bold mb-2 text-white">Видео доступно в PRO версии</h2>
                            <p className="text-gray-400 mb-6 max-w-md">
                                В этом уроке разбираются ключевые механики входа в сделку. Получите полный доступ ко всем 46 урокам.
                            </p>
                            <button 
                                onClick={handleOpenPurchaseModal} // <--- ВІДКРИВАЄ МОДАЛКУ
                                className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-xl shadow-[0_0_20px_rgba(34,197,94,0.4)] transition transform hover:scale-105"
                            >
                                Открыть доступ
                            </button>
                        </div>
                    ) : (
                        <video 
                            key={activeLesson.videoFileName}
                            controls 
                            controlsList="nodownload" 
                            className="w-full h-full object-cover"
                            autoPlay={false}
                        >
                            <source src={getVideoUrl(activeLesson.videoFileName)} type="video/mp4" />
                            Ваш браузер не поддерживает видео.
                        </video>
                    )}
                </div>

                <div className="mb-10 border-b border-white/10 pb-6">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2 text-white">{activeLesson.title}</h1>
                    <div className="flex gap-4 text-sm text-gray-400">
                        <span>⏱ Длительность: {activeLesson.duration}</span>
                        {hasPdf && <span>📄 Методичка прилагается</span>}
                    </div>
                </div>

                {/* PDF VIEWER */}
                {hasPdf ? (
                    <div className="mb-12">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-white">
                            <span>📚</span> Методические материалы
                        </h3>

                        <div className="bg-[#1a1a20] rounded-xl p-1 border border-white/5">
                            <PdfViewer 
                                fileUrl={getPdfUrl(activeLesson.pdfFileName as string)}
                                isLocked={!hasAccess}
                                onUnlock={handleOpenPurchaseModal} // <--- ТУТ ТЕЖ ВІДКРИВАЄ МОДАЛКУ
                            />
                        </div>
                        
                        <p className="text-center text-gray-500 text-xs mt-4">
                            {hasAccess 
                                ? "Вы можете читать онлайн или скачать файл для печати." 
                                : "Предпросмотр документа. Полный текст доступен после оплаты."}
                        </p>
                    </div>
                ) : null}

            </div>
        </div>
      </main>
    </div>
  );
}