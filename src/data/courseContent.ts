// src/data/courseContent.ts

// 🔴 Переконайся, що посилання правильне
const AZURE_BASE_URL = "https://redtiktokvideo.blob.core.windows.net/course"; 

export interface Lesson {
  id: number;
  title: string;
  videoFileName: string;
  pdfFileName?: string | null;
  duration: string;
  isFree: boolean;
}

export const courseModules = [
  {
    title: "МОДУЛЬ 1: BASIC CONCEPTS",
    lessons: [
      { 
        id: 1, 
        title: "1. Введение в курс", 
        duration: "10:20", 
        videoFileName: "1._strim_vvednyi_urok.mp4", 
        pdfFileName: "1. Введение в курс.pdf", 
        isFree: true 
      },
      { 
        id: 2, 
        title: "2. Работа с TradingView", 
        duration: "15:45", 
        videoFileName: "2._ctrim_tradingview.mp4", 
        pdfFileName: "2. Работа с Trading View.pdf", 
        isFree: false 
      },
      { 
        id: 3, 
        title: "3. Работа с биржей", 
        duration: "20:10", 
        videoFileName: "3._strim_rabota_s_birzhei.mp4", 
        pdfFileName: "3. Работа с биржей.pdf", 
        isFree: false 
      },
      { 
        id: 4, 
        title: "4. Рыночная структура (Base)", 
        duration: "35:00", 
        videoFileName: "4._strim_rynochnaya_struktura_base.mp4", 
        pdfFileName: "4. Рыночная структура (Base).pdf", 
        isFree: false 
      },
      { 
        id: 5, 
        title: "5. Рыночная структура (Advanced)", 
        duration: "42:15", 
        videoFileName: "5._strim_rynochnaya_struktura_advanced.mp4", 
        pdfFileName: "5. Рыночная структура (Advanced).pdf", 
        isFree: false 
      },
      { 
        id: 6, 
        title: "6. Ликвидность", 
        duration: "28:30", 
        videoFileName: "6._strim_likvidnost.mp4", 
        pdfFileName: "6. Ликвидность.pdf", 
        isFree: false 
      },
      { 
        id: 7, 
        title: "7. Работа с уровнями Фибоначчи", 
        duration: "18:40", 
        videoFileName: "7strimrabotasurovnyamifibonachchi.mp4", 
        pdfFileName: "7. Работа с уровнями Фибоначчи.pdf", 
        isFree: false 
      },
    ]
  },
  {
    title: "МОДУЛЬ 2: ИНСТРУМЕНТАРИЙ",
    lessons: [
      { 
        id: 8, 
        title: "8. Торговые инструменты (Base)", 
        duration: "25:10", 
        videoFileName: "8._strim_torgovye_instrumenty_base.mp4", 
        pdfFileName: "8. Торговые инструменты (Base).pdf", 
        isFree: false 
      },
      { 
        id: 9, 
        title: "9. Торговые инструменты (Advanced)", 
        duration: "30:00", 
        videoFileName: "9strimtorgovyeinstrumentyadvanced.mp4", 
        pdfFileName: "9. Торговые инструменты (Advanced).pdf", 
        isFree: false 
      },
      { 
        id: 10, 
        title: "10. Боковое движение", 
        duration: "22:15", 
        videoFileName: "10._strim_1_bokovoe_dvizhenie.mp4", 
        pdfFileName: "10. Боковое движение.pdf", 
        isFree: false 
      },
      { 
        id: 11, 
        title: "11. Риск-менеджмент", 
        duration: "45:00", 
        videoFileName: "11._strim_risk_menedzhment.mp4", 
        pdfFileName: "11. Риск-менеджмент.pdf", 
        isFree: false 
      },
      { 
        id: 12, 
        title: "12. Индикаторы", 
        duration: "15:30", 
        videoFileName: "12._strim_indikatory.mp4", 
        pdfFileName: "12. Индикаторы.pdf", 
        isFree: false 
      },
    ]
  },
  {
    title: "МОДУЛЬ 3: ПСИХОЛОГИЯ И АНАЛИЗ",
    lessons: [
      { 
        id: 13, 
        title: "13. Практический модуль (Демо)", 
        duration: "55:00", 
        videoFileName: "13strimprakticheskiimoduldemotorgovlya.mp4", 
        pdfFileName: "13_Практический_модуль_Демо_торговля.pdf", 
        isFree: false 
      },
      { 
        id: 14, 
        title: "14. Психология", 
        duration: "40:20", 
        videoFileName: "14._strim_psihologiya.mp4", 
        pdfFileName: "14. Психология.pdf", 
        isFree: false 
      },
      { 
        id: 15, 
        title: "15. Кластерный анализ", 
        duration: "38:10", 
        videoFileName: "15._strim_klasternyi_analiz.mp4", 
        pdfFileName: "15. Кластерный анализ.pdf", 
        isFree: false
      },
      { 
        id: 16, 
        title: "16. Фундаментальный анализ (Base)", 
        duration: "32:00", 
        videoFileName: "16strimfundamentalnyianalizbase.mp4", 
        pdfFileName: "16. Фундаментальный анализ (Base).pdf", 
        isFree: false 
      },
    ]
  },
  {
    title: "МОДУЛЬ 4: СТРАТЕГИИ (PRO)",
    lessons: [
      { 
        id: 21, 
        title: "21. Мультиструктура", 
        duration: "40:00", 
        videoFileName: "21._strim_multistruktura.mp4", 
        pdfFileName: "21. Мультиструктура.pdf", 
        isFree: false 
      },
      { 
        id: 22, 
        title: "22. Торговые инструменты (Pro)", 
        duration: "45:00", 
        videoFileName: "22._strim_torgovye_instrumenty_pro.mp4", 
        pdfFileName: "22. Торговые инструменты (Pro).pdf", 
        isFree: false 
      },
      { 
        id: 24, 
        title: "24. Психология (Advanced)", 
        duration: "35:00", 
        videoFileName: "24._strim_psihologiya.mp4", 
        pdfFileName: "24. Психология.pdf", 
        isFree: false 
      },
      { 
        id: 25, 
        title: "25. Supply & Demand", 
        duration: "30:00", 
        videoFileName: "25._strim_supplydemand.mp4", 
        pdfFileName: "25. Supply_Demand.pdf", 
        isFree: false 
      },
      { 
        id: 26, 
        title: "26. Wyckoff (Часть 1)", 
        duration: "50:00", 
        videoFileName: "26._strim_amdwyckoff_chast_1.mp4", 
        pdfFileName: "26. AMD_Wyckoff Часть 1.pdf", 
        isFree: false 
      },
      { 
        id: 27, 
        title: "27. Wyckoff (Часть 2)", 
        duration: "52:00", 
        videoFileName: "27._strim_wyckoff_chast_2.mp4", 
        pdfFileName: "27. Стрим Wyckoff Часть 2.pdf", 
        isFree: false 
      },
            { 
        id: 28, 
        title: "28. Индикаторы и особенности торговли_FX", 
        duration: "52:00", 
        videoFileName: "28strimindikatoryiosobennostitorgovlifx.mp4", 
        pdfFileName: "28_Индикаторы_и_особенности_торговли_FX.pdf", 
        isFree: false 
      },
            { 
        id: 29, 
        title: "29. Торговые сетапы", 
        duration: "52:00", 
        videoFileName: "29._strim_torgovye_setapy.mp4", 
        pdfFileName: "29. Торговые сетапы.pdf", 
        isFree: false 
      },
            { 
        id: 30, 
        title: "30. Фундаментальный анализ (Pro)", 
        duration: "52:00", 
        videoFileName: "30strimfundamentalnyianalizpro.mp4", 
        pdfFileName: "30. Фундаментальный анализ (Pro).pdf", 
        isFree: false 
      },
            { 
        id: 31, 
        title: "31. Бэктест", 
        duration: "52:00", 
        videoFileName: "32._bektest.mp4", 
        pdfFileName: null, 
        isFree: false 
      },
            { 
        id: 32, 
        title: "32. Бэктест", 
        duration: "52:00", 
        videoFileName: "33._bektest.mp4", 
        pdfFileName: null, 
        isFree: false 
      },
            { 
        id: 33, 
        title: "33. Бэктест", 
        duration: "52:00", 
        videoFileName: "34._bektest.mp4", 
        pdfFileName: null, 
        isFree: false 
      },
            { 
        id: 34, 
        title: "34. Бэктест", 
        duration: "52:00", 
        videoFileName: "35._bektest.mp4", 
        pdfFileName: null, 
        isFree: false 
      },
    ]
  },
  {
    title: "МОДУЛЬ 5: АЛГОРИТМЫ",
    lessons: [
      { 
        id: 35, 
        title: "35. Работа в POI", 
        duration: "26:00", 
        videoFileName: "36_strim_rabota_v_poi.mp4", 
        pdfFileName: "36. Работа в POI.pdf", 
        isFree: false 
      },
      { 
        id: 36, 
        title: "36. Логика запуска алгоритма", 
        duration: "1:05:00", 
        videoFileName: "37strimlogikazapuskaalgoritma.mp4", 
        pdfFileName: "37. Логика запуска алгоритма.pdf", 
        isFree: false 
      },
      { 
        id: 37, 
        title: "37. Практический модуль", 
        duration: "45:00", 
        videoFileName: "38._prakticheskii_modul.mp4", 
        pdfFileName: null, 
        isFree: false 
      },
      { 
        id: 38, 
        title: "38. MMXM", 
        duration: "33:00", 
        videoFileName: "39._strim_mmhm.mp4", 
        pdfFileName: "39. ММХМ.pdf", 
        isFree: false 
      },
      { 
        id: 39, 
        title: "39. SMT", 
        duration: "20:00", 
        videoFileName: "40._strim_smt.mp4", 
        pdfFileName: null, 
        isFree: false 
      },
    ]
  },
  {
    title: "МОДУЛЬ 6: LIVE & BACKTEST",
    lessons: [
      { 
        id: 40, 
        title: "40. Практический модуль", 
        duration: "40:00", 
        videoFileName: "41._strim_prakticheskii_modul.mp4", 
        pdfFileName: null, 
        isFree: false 
      },
      { 
        id: 41, 
        title: "41. Продвинутый Price Action", 
        duration: "55:00", 
        videoFileName: "42._strim_prodvinutyi_price_action.mp4", 
        pdfFileName: null, 
        isFree: false 
      },
      { 
        id: 42, 
        title: "42. Торговые сетапы", 
        duration: "45:00", 
        videoFileName: "43._strim_torgovye_setapy.mp4", 
        pdfFileName: null, 
        isFree: false 
      },
      { 
        id: 43, 
        title: "43. Бэктест (Session 1)", 
        duration: "1:10:00", 
        videoFileName: "44._bektest.mp4", 
        pdfFileName: null, 
        isFree: false 
      },
      { 
        id: 44, 
        title: "44. Бэктест (Session 2)", 
        duration: "1:15:00", 
        videoFileName: "45._bektest.mp4", 
        pdfFileName: null, 
        isFree: false 
      },
      { 
        id: 45, 
        title: "45. Бэктест (Final)", 
        duration: "1:00:00", 
        videoFileName: "46._bektest.mp4", 
        pdfFileName: null, 
        isFree: false 
      },
    ]
  }
];

export const getVideoUrl = (fileName: string) => {
  return `${AZURE_BASE_URL}/${fileName}`;
};

export const getPdfUrl = (fileName: string) => {
  // Для PDF з кирилицею це обов'язково
  return `${AZURE_BASE_URL}/${encodeURIComponent(fileName)}`;
};