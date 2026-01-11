import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';
import RegistrationModal from '../components/RegistrationModal';

// --- ДАНІ ПРОГРАМИ (РОЗШИРЕНІ ДО 6 МОДУЛІВ) ---
const curriculumData = [
  {
    module: "МОДУЛЬ 01",
    title: "Basic Concepts & Structure",
    items: [
      "Логика движения цены (Delivery Algorithm)",
      "Рыночная структура: Swing vs Internal",
      "Работа с TradingView и инструментарием",
      "Premium & Discount массивы"
    ]
  },
  {
    module: "МОДУЛЬ 02",
    title: "Institutional Tools",
    items: [
      "Order Block (OB) & Breaker Block",
      "Imbalance (FVG) и неэффективность",
      "Ликвидность: Pools, Inducement, Traps",
      "Работа с уровнями Фибоначчи"
    ]
  },
  {
    module: "МОДУЛЬ 03",
    title: "Psychology & Analysis",
    items: [
      "Фундаментальный анализ и новости",
      "Кластерный анализ объемов",
      "Психология трейдера и FOMO",
      "Риск-менеджмент и расчет позиции"
    ]
  },
  {
    module: "МОДУЛЬ 04",
    title: "Advanced Strategies (PRO)",
    items: [
      "Мультиструктура и синхронизация таймфреймов",
      "Wyckoff Logic: Accumulation & Distribution",
      "Supply & Demand зоны",
      "Сэтапы высокой вероятности"
    ]
  },
  {
    module: "МОДУЛЬ 05",
    title: "Algorithms & Execution",
    items: [
      "Логика запуска алгоритма (IPDA)",
      "Работа в POI (Point of Interest)",
      "Модели входа: SMT Divergence, MMXM",
      "Алгоритм сопровождения сделки"
    ]
  },
  {
    module: "МОДУЛЬ 06",
    title: "Live Trading & Backtest",
    items: [
      "Сессии Backtest: отработка на истории",
      "Live-торговля и принятие решений",
      "Разбор убыточных сделок",
      "Финальный экзамен и создание торгового плана"
    ]
  }
];

const faqData = [
  {
    q: "Подходит ли курс новичкам?",
    a: "Да. Мы начинаем с фундаментальных понятий. Программа построена от простого к сложному, чтобы сформировать правильное понимание рынка с нуля."
  },
  {
    q: "Какой нужен депозит для старта?",
    a: "Мы настоятельно рекомендуем начинать обучение на демо-счете. Наша цель — научить вас сохранять капитал, а затем приумножать его."
  },
  {
    q: "Актуальна ли информация в 2025?",
    a: "Абсолютно. Мы разбираем механику рынка, которая не меняется десятилетиями. Это не 'схемы заработка', а чтение алгоритмов доставки цены."
  },
  {
    q: "Как проходит наставничество?",
    a: "В тарифе Mentorship я лично провожу аудит вашей торговой системы, проверяю журнал сделок и помогаю скорректировать психологические барьеры."
  }
];

export default function Home() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [openModule, setOpenModule] = useState<number | null>(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Self Study');

  const openRegistration = (plan: string) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="overflow-x-hidden font-sans text-white bg-[#0b0b0f]">
      
      {/* NAVBAR */}
      <nav className="fixed w-full z-50 glass border-b-0 bg-[#0b0b0f]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div 
            className="text-2xl font-extrabold tracking-tighter cursor-pointer" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            GORPS<span className="text-green-500">CORE</span>
          </div>
          
          <div className="hidden md:flex space-x-8 text-gray-400 text-sm font-medium">
            <button onClick={() => scrollToSection('about')} className="hover:text-white transition">О курсе</button>
            <button onClick={() => scrollToSection('curriculum')} className="hover:text-white transition">Программа</button>
            <button onClick={() => scrollToSection('pricing')} className="hover:text-white transition">Тарифы</button>
          </div>
          
          <Link 
            to="/login" 
            className="border border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-6 py-2 rounded-full text-sm font-bold transition duration-300"
          >
            LMS Вход
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <header className="relative pt-40 pb-20 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[800px] h-[500px] bg-green-600 rounded-full blur-[120px] opacity-10 -z-10" />
        
        <div className="max-w-4xl mx-auto" data-aos="fade-up">
          <div className="inline-block px-4 py-1 mb-6 text-xs font-bold tracking-widest text-green-400 uppercase bg-green-900/20 rounded-full border border-green-900/50">
            Обучающая экосистема 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight">
            Алгоритмический трейдинг <br />
            и логика <span className="text-green-500 drop-shadow-[0_0_15px_rgba(34,197,94,0.5)]">GORPSCORE</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Комплексная программа подготовки проп-трейдеров. От понимания ликвидности до получения финансирования.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
                onClick={() => scrollToSection('pricing')}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-10 py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] transition duration-300"
            >
                Получить доступ
            </button>
            <button 
                onClick={() => scrollToSection('curriculum')}
                className="bg-white/5 border border-white/10 text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition duration-300"
            >
                Изучить программу
            </button>
          </div>
        </div>
        
        {/* STATS STRIP */}
        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto border-y border-white/5 py-8 bg-[#0f0f13]/50 backdrop-blur-sm">
            <div data-aos="fade-up" data-aos-delay="0">
                <div className="text-3xl md:text-4xl font-extrabold text-white">45</div>
                <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">Видео уроков</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="100">
                <div className="text-3xl md:text-4xl font-extrabold text-green-500">100+</div>
                <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">Часов контента</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="200">
                <div className="text-3xl md:text-4xl font-extrabold text-white">PDF</div>
                <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">Методички к урокам</div>
            </div>
            <div data-aos="fade-up" data-aos-delay="300">
                <div className="text-3xl md:text-4xl font-extrabold text-white">24/7</div>
                <div className="text-xs uppercase tracking-widest text-gray-500 mt-1">LMS Доступ</div>
            </div>
        </div>
      </header>

      {/* NEW SECTION: ECOSYSTEM */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
                <div data-aos="fade-right">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Больше чем просто курс</h2>
                    <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                        Мы не продаем "сигналы" или "кнопку бабло". Мы предоставляем полную академическую базу для понимания того, как работают финансовые рынки на микро- и макро-уровнях.
                    </p>
                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 font-bold shrink-0">01</div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Структурированная LMS</h3>
                                <p className="text-gray-400 text-sm mt-1">Собственная платформа обучения. Никаких Google Drive ссылок. Удобный личный кабинет.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 font-bold shrink-0">02</div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Live Backtesting</h3>
                                <p className="text-gray-400 text-sm mt-1">Десятки часов записи живой торговли и тестов на истории. Вы увидите реальное применение логики, а не сухую теорию.</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 font-bold shrink-0">03</div>
                            <div>
                                <h3 className="text-xl font-bold text-white">Digital Library</h3>
                                <p className="text-gray-400 text-sm mt-1">Каждый теоретический модуль сопровождается детальной PDF-методичкой для закрепления материала.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="relative" data-aos="fade-left">
                     {/* Декоративний блок імітації кабінету */}
                    <div className="aspect-[4/3] bg-[#1a1a20] rounded-2xl border border-white/10 p-6 relative shadow-2xl overflow-hidden group">
                        <div className="absolute inset-0 bg-green-500/5 group-hover:bg-green-500/10 transition duration-500"></div>
                        <div className="h-full flex flex-col justify-between relative z-10">
                            <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                <div className="w-32 h-4 bg-white/10 rounded"></div>
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                                    <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="w-3/4 h-8 bg-white/10 rounded"></div>
                                <div className="w-1/2 h-4 bg-white/5 rounded"></div>
                                <div className="w-full h-32 bg-green-500/10 rounded-lg border border-green-500/20 flex items-center justify-center text-green-500">
                                    Chart Analysis...
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </section>

      {/* CURRICULUM SECTION */}
      <section id="curriculum" className="py-24 px-6 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center">Программа обучения</h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
              6 модулей, 45 уроков. От базовой структуры до продвинутых алгоритмических моделей входа.
          </p>

          <div className="space-y-4">
            {curriculumData.map((mod, index) => (
              <div 
                key={index} 
                className="glass rounded-xl overflow-hidden transition-all duration-300"
                onClick={() => setOpenModule(openModule === index ? null : index)}
              >
                <div className="p-6 flex justify-between items-center cursor-pointer hover:bg-white/5 transition">
                  <div className="flex items-center gap-4">
                    <span className="bg-green-500/10 text-green-500 px-3 py-1 rounded text-xs font-bold whitespace-nowrap">
                      {mod.module}
                    </span>
                    <h3 className="text-lg md:text-xl font-bold truncate">{mod.title}</h3>
                  </div>
                  <div className={`text-2xl text-gray-500 transition-transform duration-300 ${openModule === index ? 'rotate-45 text-white' : ''}`}>
                    +
                  </div>
                </div>
                
                <div 
                  className={`px-6 transition-all duration-300 ease-in-out ${openModule === index ? 'max-h-96 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <ul className="space-y-3 text-gray-300 text-sm border-t border-white/5 pt-4">
                    {mod.items.map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="text-green-500 font-mono mt-0.5">/</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RESULTS SECTION */}
      <section id="results" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-16 text-center">Результаты системы</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="glass p-8 rounded-2xl border border-white/5 hover:border-green-500/30 transition duration-300" data-aos="fade-up">
                    <div className="text-green-500 text-4xl mb-4 font-mono">+$4,230</div>
                    <div className="text-xl font-bold mb-2">Месячный PnL</div>
                    <p className="text-gray-400 text-sm leading-relaxed">Студент: Александр К.<br/>Депозит: $10,000<br/>Риск на сделку: 1%</p>
                </div>
                <div className="glass p-8 rounded-2xl border border-white/5 hover:border-green-500/30 transition duration-300" data-aos="fade-up" data-aos-delay="100">
                    <div className="text-green-500 text-4xl mb-4 font-mono">FTMO</div>
                    <div className="text-xl font-bold mb-2">Funded Trader</div>
                    <p className="text-gray-400 text-sm leading-relaxed">Получение финансирования $100k<br/>После 3 месяцев обучения</p>
                </div>
                <div className="glass p-8 rounded-2xl border border-white/5 hover:border-green-500/30 transition duration-300" data-aos="fade-up" data-aos-delay="200">
                    <div className="text-green-500 text-4xl mb-4 font-mono">83%</div>
                    <div className="text-xl font-bold mb-2">Winrate (RR 1:3)</div>
                    <p className="text-gray-400 text-sm leading-relaxed">Статистика за последний квартал<br/>Актив: EURUSD, XAUUSD</p>
                </div>
            </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-24 px-6 bg-neutral-900/30">
        <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Доступ к платформе</h2>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Basic Plan */}
                <div className="glass p-8 rounded-3xl border-t border-white/10 flex flex-col hover:bg-white/5 transition duration-300" data-aos="zoom-in-right">
                    <h3 className="text-2xl font-bold mb-2">Self Study</h3>
                    <p className="text-gray-400 text-sm mb-6">База знаний для самостоятельной работы</p>
                    <div className="text-4xl font-bold mb-8">$149 <span className="text-lg text-gray-500 font-normal line-through">$299</span></div>
                    
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center text-sm text-gray-300"><span className="text-green-500 mr-2">✓</span> Полный доступ к LMS системе (45 видео уроков)</li>
                        <li className="flex items-center text-sm text-gray-300"><span className="text-green-500 mr-2">✓</span> Методические материалы (Playbooks)</li>
                        <li className="flex items-center text-sm text-gray-300"><span className="text-green-500 mr-2">✓</span> Lifetime доступ к обновлениям</li>
                        <li className="flex items-center text-sm text-gray-500"><span className="text-red-500 mr-2">✕</span> Индивидуальное сопровождение</li>
                    </ul>

                    <button 
                        onClick={() => openRegistration('Self Study')}
                        className="w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-gray-200 transition"
                    >
                        Начать обучение
                    </button>
                </div>

                {/* Pro Plan */}
                <div className="relative p-8 rounded-3xl border border-green-500/50 bg-green-900/10 flex flex-col hover:bg-green-900/20 transition duration-300" data-aos="zoom-in-left">
                    <div className="absolute top-0 right-0 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl rounded-tr-xl">POPULAR</div>
                    <h3 className="text-2xl font-bold mb-2">Mentorship</h3>
                    <p className="text-gray-400 text-sm mb-6">Персональная работа до результата</p>
                    <div className="text-4xl font-bold mb-8">$290 <span className="text-lg text-gray-500 font-normal line-through">$590</span></div>
                    
                    <ul className="space-y-4 mb-8 flex-1">
                        <li className="flex items-center text-sm text-white"><span className="text-green-500 mr-2">✓</span> Все материалы тарифа Self Study</li>
                        <li className="flex items-center text-sm text-white"><span className="text-green-500 mr-2">✓</span> <span className="font-bold text-green-400 mr-1">Персональный аудит</span> торговой стратегии</li>
                        <li className="flex items-center text-sm text-white"><span className="text-green-500 mr-2">✓</span> Разбор журнала сделок (Trade Review)</li>
                        <li className="flex items-center text-sm text-white"><span className="text-green-500 mr-2">✓</span> Приоритетная поддержка автора</li>
                    </ul>

                    <button 
                        onClick={() => openRegistration('Mentorship')}
                        className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-green-500/20 transition"
                    >
                        Получить Mentorship
                    </button>
                </div>
            </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section id="faq" className="py-24 px-6">
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Частые вопросы</h2>
            <div className="space-y-4">
                {faqData.map((item, index) => (
                    <div 
                        key={index}
                        className="glass rounded-xl overflow-hidden"
                        onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                        <div className="p-6 flex justify-between items-center cursor-pointer hover:bg-white/5 transition">
                            <h3 className="font-bold text-lg">{item.q}</h3>
                            <div className={`text-2xl text-green-500 transition-transform duration-300 ${openFaq === index ? 'rotate-45' : ''}`}>+</div>
                        </div>
                        <div className={`px-6 text-gray-400 text-sm transition-all duration-300 ${openFaq === index ? 'max-h-40 pb-6 opacity-100' : 'max-h-0 opacity-0'}`}>
                            {item.a}
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/5 text-center text-gray-600 text-sm">
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="/offer" className="hover:text-gray-400 transition">Публичная оферта</Link>
          <Link to="/privacy" className="hover:text-gray-400 transition">Политика конфиденциальности</Link>
        </div>
        <p>&copy; 2026 GORPSCORE Systems. All rights reserved.</p>
        <p className="mt-2 text-xs text-gray-700">Not financial advice. Trading involves risk.</p>
      </footer>

      <RegistrationModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planName={selectedPlan}
      />
    </div>
  );
}