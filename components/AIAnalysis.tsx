interface AIAnalysisProps {
  analysis: string | any;
}

// Function to clean markdown symbols from text
function cleanMarkdown(text: string): string {
  if (typeof text !== 'string') return text;
  
  return text
    .replace(/\*\*/g, '') // Remove **
    .replace(/\*/g, '')   // Remove *
    .replace(/##/g, '')   // Remove ##
    .replace(/#/g, '')    // Remove #
    .replace(/`/g, '')    // Remove `
    .replace(/~/g, '')    // Remove ~
    .trim();
}

export default function AIAnalysis({ analysis }: AIAnalysisProps) {
  // Handle if analysis is an object (structured 5-tuple format)
  if (typeof analysis === 'object' && analysis !== null) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6">
        <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
          Analisis Automata
        </h2>
        
        <div className="space-y-3 sm:space-y-4">
          {/* 5-Tuple Section */}
          <div className="bg-indigo-50 p-3 sm:p-4 rounded-lg">
            <h3 className="text-base sm:text-lg font-bold text-indigo-900 mb-2 sm:mb-3">5-Tuple Automata</h3>
            
            {analysis.Q && (
              <div className="mb-2 sm:mb-3">
                <span className="font-semibold text-indigo-700 text-sm sm:text-base">Q (Himpunan State):</span>
                <p className="text-gray-700 ml-3 sm:ml-4 text-sm sm:text-base mt-1">{cleanMarkdown(typeof analysis.Q === 'string' ? analysis.Q : JSON.stringify(analysis.Q))}</p>
              </div>
            )}
            
            {analysis.Sigma && (
              <div className="mb-2 sm:mb-3">
                <span className="font-semibold text-indigo-700 text-sm sm:text-base">Σ (Alfabet Input):</span>
                <p className="text-gray-700 ml-3 sm:ml-4 text-sm sm:text-base mt-1">{cleanMarkdown(typeof analysis.Sigma === 'string' ? analysis.Sigma : JSON.stringify(analysis.Sigma))}</p>
              </div>
            )}
            
            {analysis.Delta && (
              <div className="mb-2 sm:mb-3">
                <span className="font-semibold text-indigo-700 text-sm sm:text-base">δ (Fungsi Transisi):</span>
                <div className="text-gray-700 ml-3 sm:ml-4 whitespace-pre-wrap text-sm sm:text-base mt-1 overflow-x-auto">{cleanMarkdown(typeof analysis.Delta === 'string' ? analysis.Delta : JSON.stringify(analysis.Delta, null, 2))}</div>
              </div>
            )}
            
            {analysis.q0_initial_state && (
              <div className="mb-2 sm:mb-3">
                <span className="font-semibold text-indigo-700 text-sm sm:text-base">q₀ (State Awal):</span>
                <p className="text-gray-700 ml-3 sm:ml-4 text-sm sm:text-base mt-1">{cleanMarkdown(analysis.q0_initial_state)}</p>
              </div>
            )}
            
            {analysis.F_final_states && (
              <div className="mb-2 sm:mb-3">
                <span className="font-semibold text-indigo-700 text-sm sm:text-base">F (State Akhir):</span>
                <p className="text-gray-700 ml-3 sm:ml-4 text-sm sm:text-base mt-1">{cleanMarkdown(typeof analysis.F_final_states === 'string' ? analysis.F_final_states : JSON.stringify(analysis.F_final_states))}</p>
              </div>
            )}
          </div>

          {/* Additional Analysis */}
          {analysis.automata_type && (
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-800 text-sm sm:text-base">Jenis Automata:</span>
              <p className="text-gray-700 ml-3 sm:ml-4 text-sm sm:text-base mt-1">{cleanMarkdown(analysis.automata_type)}</p>
            </div>
          )}
          
          {analysis.explanation_of_work && (
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-800 text-sm sm:text-base">Cara Kerja:</span>
              <p className="text-gray-700 ml-3 sm:ml-4 whitespace-pre-wrap leading-relaxed text-sm sm:text-base mt-1">{cleanMarkdown(analysis.explanation_of_work)}</p>
            </div>
          )}
          
          {analysis.complexity && (
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-800 text-sm sm:text-base">Kompleksitas:</span>
              <p className="text-gray-700 ml-3 sm:ml-4 text-sm sm:text-base mt-1">{cleanMarkdown(analysis.complexity)}</p>
            </div>
          )}
          
          {analysis.optimization_suggestions && (
            <div className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200">
              <span className="font-semibold text-gray-800 text-sm sm:text-base">Saran Optimasi:</span>
              <p className="text-gray-700 ml-3 sm:ml-4 whitespace-pre-wrap leading-relaxed text-sm sm:text-base mt-1">{cleanMarkdown(analysis.optimization_suggestions)}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Handle if analysis is a string (fallback)
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">
        Analisis AI
      </h2>
      <div className="prose max-w-none">
        <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm sm:text-base">
          {cleanMarkdown(analysis)}
        </div>
      </div>
    </div>
  );
}
