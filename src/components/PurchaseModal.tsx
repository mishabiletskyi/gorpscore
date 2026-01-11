interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPlan: (plan: 'Self Study' | 'Mentorship') => void;
}

export default function PurchaseModal({ isOpen, onClose, onSelectPlan }: PurchaseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Затемнення фону */}
      <div 
        className="absolute inset-0 bg-black/90 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      ></div>

      {/* Контент модалки */}
      <div className="relative w-full max-w-4xl bg-[#0f0f13] border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-visible animate-in fade-in zoom-in duration-300">
        
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 z-10 text-gray-500 hover:text-white transition bg-black/50 w-8 h-8 rounded-full flex items-center justify-center"
        >
          ✕
        </button>

        {/* Ліва колонка - Self Study */}
        <div className="flex-1 p-8 border-b md:border-b-0 md:border-r border-white/10 flex flex-col hover:bg-white/5 transition duration-300">
          <h3 className="text-xl font-bold mb-2 text-white">Self Study</h3>
          <p className="text-gray-400 text-xs mb-6">База знаний для самостоятельной работы</p>
          <div className="text-3xl font-bold mb-6 text-white">$149 <span className="text-sm text-gray-500 font-normal line-through">$299</span></div>
          
          <ul className="space-y-3 mb-8 flex-1">
            <li className="flex items-center text-xs text-gray-300"><span className="text-green-500 mr-2">✓</span> Все уроки (46 модулей)</li>
            <li className="flex items-center text-xs text-gray-300"><span className="text-green-500 mr-2">✓</span> PDF методички</li>
            <li className="flex items-center text-xs text-gray-500"><span className="text-red-500 mr-2">✕</span> Поддержка автора</li>
          </ul>

          <button 
            onClick={() => onSelectPlan('Self Study')}
            className="w-full bg-white/10 hover:bg-white text-white hover:text-black font-bold py-3 rounded-xl transition border border-white/20"
          >
            Выбрать Self Study
          </button>
        </div>

        {/* Права колонка - Mentorship */}
        <div className="flex-1 p-8 bg-green-900/10 flex flex-col relative group">
          <div className="absolute top-0 right-0 bg-green-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl">RECOMMENDED</div>
          
          <h3 className="text-xl font-bold mb-2 text-white">Mentorship</h3>
          <p className="text-gray-400 text-xs mb-6">Работа с ментором до результата</p>
          <div className="text-3xl font-bold mb-6 text-green-400">$290 <span className="text-sm text-gray-500 font-normal line-through">$590</span></div>
          
          <ul className="space-y-3 mb-8 flex-1">
            <li className="flex items-center text-xs text-white"><span className="text-green-500 mr-2">✓</span> Все материалы курса</li>
            <li className="flex items-center text-xs text-white"><span className="text-green-500 mr-2">✓</span> <span className="text-green-400 font-bold mx-1">Личный аудит</span> стратегии</li>
            <li className="flex items-center text-xs text-white"><span className="text-green-500 mr-2">✓</span> Приоритетная поддержка</li>
          </ul>

          <button 
            onClick={() => onSelectPlan('Mentorship')}
            className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:to-green-400 text-white font-bold py-3 rounded-xl shadow-lg shadow-green-900/20 transition transform group-hover:scale-[1.02]"
          >
            Выбрать Mentorship
          </button>
        </div>

      </div>
    </div>
  );
}