import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Воркер
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfViewerProps {
  fileUrl: string;
  isLocked: boolean;
  onUnlock: () => void;
}

export default function PdfViewer({ fileUrl, isLocked, onUnlock }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const changePage = (offset: number) => {
    setPageNumber(prevPage => {
      const newPage = prevPage + offset;
      if (newPage < 1 || (numPages && newPage > numPages)) return prevPage;
      return newPage;
    });
  };

  const isCurrentPageLocked = isLocked && pageNumber > 1;

  return (
    <div className="flex flex-col items-center w-full">
      
      {/* КОНТЕЙНЕР СТОРІНКИ */}
      <div className="relative bg-white/5 rounded-xl border border-white/10 p-1 md:p-4 shadow-2xl overflow-hidden min-h-[400px] md:min-h-[600px] flex justify-center items-start w-full max-w-3xl">
        
        <Document
          file={fileUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={<div className="text-green-500 animate-pulse my-20">Загрузка документа...</div>}
          error={<div className="text-red-500 my-20">Ошибка загрузки PDF</div>}
          className="flex justify-center"
        >
          <div className="relative">
            
            {/* ТУТ БУЛИ БІЛІ ЛАТКИ - Я ЇХ ПРИБРАВ */}
            
            {/* Сама сторінка */}
            <div className={`transition-all duration-300 ${isCurrentPageLocked ? 'blur-sm opacity-50 select-none grayscale' : ''}`}>
               <Page 
                pageNumber={pageNumber} 
                renderTextLayer={!isCurrentPageLocked} 
                renderAnnotationLayer={!isCurrentPageLocked} // Дозволяємо посилання (якщо вони залишились корисні)
                width={Math.min(window.innerWidth * 0.8, 700)}
                className="shadow-xl"
              />
            </div>

            {/* ОВЕРЛЕЙ ЗАМКА */}
            {isCurrentPageLocked && (
              <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center">
                 <div className="bg-[#0f0f13]/95 border border-green-500/50 p-6 md:p-8 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] backdrop-blur-sm max-w-xs mx-2">
                    <div className="text-4xl md:text-5xl mb-4">🔐</div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-2">Доступ закрыт</h3>
                    <p className="text-gray-400 text-xs md:text-sm mb-6 leading-relaxed">
                      Вы просматриваете демо-версию. <br/>
                      Полный доступ после оплаты.
                    </p>
                    <button 
                      onClick={onUnlock}
                      className="w-full bg-gradient-to-r from-green-600 to-green-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg transition transform hover:scale-105"
                    >
                      Купить доступ
                    </button>
                  </div>
              </div>
            )}
          </div>
        </Document>
      </div>

      {/* НАВІГАЦІЯ */}
      {numPages && (
        <div className="flex items-center gap-4 mt-6 bg-[#1a1a20] px-6 py-3 rounded-full border border-white/10 shadow-lg">
          <button 
            disabled={pageNumber <= 1}
            onClick={() => changePage(-1)}
            className="text-white hover:text-green-400 disabled:opacity-30 transition"
          >
            ← Назад
          </button>
          <span className="text-sm font-mono text-gray-400">
            Стр. <span className="text-white font-bold">{pageNumber}</span> из {numPages}
          </span>
          <button 
            disabled={pageNumber >= numPages}
            onClick={() => changePage(1)}
            className="text-white hover:text-green-400 disabled:opacity-30 transition"
          >
            Вперед →
          </button>
        </div>
      )}

      {/* КНОПКА СКАЧУВАННЯ */}
      {!isLocked && (
         <a 
         href={fileUrl} 
         target="_blank"
         className="mt-6 flex items-center gap-2 text-xs text-gray-500 hover:text-green-400 transition"
       >
         <span>⬇</span> Скачать оригинал
       </a>
      )}
    </div>
  );
}