"use client";

import { useState } from "react";
import DiagramCanvas from "@/components/DiagramCanvas";
import InputForm from "@/components/InputForm";
import AIAnalysis from "@/components/AIAnalysis";

export default function Home() {
  const [programName, setProgramName] = useState("");
  const [flowDescription, setFlowDescription] = useState("");
  const [diagramData, setDiagramData] = useState<any>(null);
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

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
