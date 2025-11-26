"use client";

import { useState, useEffect } from "react";
import DiagramCanvas from "@/components/DiagramCanvas";
import InputForm from "@/components/InputForm";
import AIAnalysis from "@/components/AIAnalysis";

export default function Home() {
  const [programName, setProgramName] = useState("");
  const [flowDescription, setFlowDescription] = useState("");
  const [diagramData, setDiagramData] = useState<any>(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Tampilkan notifikasi saat pertama kali web dibuka
    const hasSeenNotification = sessionStorage.getItem("hasSeenNotification");
    if (!hasSeenNotification) {
      setShowNotification(true);
      sessionStorage.setItem("hasSeenNotification", "true");
    }
  }, []);

  const handleGenerate = async () => {
    if (!programName || !flowDescription) {
      alert("Mohon isi nama program dan alur!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ programName, flowDescription }),
      });

      const data = await response.json();
      setDiagramData(data.diagram);
      setAnalysis(data.analysis);
    } catch (error) {
      console.error("Error:", error);
      alert("Terjadi kesalahan saat generate diagram");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-3 sm:p-6 md:p-8">
      {/* Notification Modal */}
      {showNotification && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-6 relative animate-fade-in">
            <button
              onClick={() => setShowNotification(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 text-2xl font-bold"
            >
              ×
            </button>
            <div className="mb-4">
              <h2 className="text-xl font-bold text-indigo-900 mb-3">
                Selamat Datang! 👋
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">
                Web ini dibuat untuk mencari tahu dan membantu mengetahui apakah sistem automata DFA atau NFA beserta kelemahannya.
              </p>
              <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded">
                <p className="text-sm text-gray-800 mb-2">
                  <strong>Jasa Tersedia:</strong>
                </p>
                <p className="text-sm text-gray-700 mb-2">
                  Jika berminat untuk joki project dan skripsi atau butuh jasa pengiriman pribadi, hubungi:
                </p>
                <p className="text-indigo-700 font-semibold text-base">
                  📱 085643025633 - King Wisnu
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded transition-colors"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        {/* Header - Mobile Optimized */}
        <div className="mb-4 sm:mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-1 sm:mb-2 text-indigo-900">
            Automata Diagram Generator
          </h1>
          <p className="text-sm sm:text-base text-center text-gray-600 px-2">
            Buat diagram automata interaktif dengan analisis AI
          </p>
        </div>

        {/* Mobile-First Layout */}
        <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
          {/* Input Form - Always on top for mobile */}
          <div className="w-full">
            <InputForm
              programName={programName}
              setProgramName={setProgramName}
              flowDescription={flowDescription}
              setFlowDescription={setFlowDescription}
              onGenerate={handleGenerate}
              loading={loading}
            />
          </div>

          {/* Results Section */}
          {(diagramData || analysis) && (
            <div className="w-full space-y-4 sm:space-y-5 md:space-y-6">
              {diagramData && <DiagramCanvas data={diagramData} />}
              {analysis && <AIAnalysis analysis={analysis} />}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
