interface InputFormProps {
  programName: string;
  setProgramName: (value: string) => void;
  flowDescription: string;
  setFlowDescription: (value: string) => void;
  onGenerate: () => void;
  loading: boolean;
}

export default function InputForm({
  programName,
  setProgramName,
  flowDescription,
  setFlowDescription,
  onGenerate,
  loading,
}: InputFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-5 md:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 text-gray-800">Input</h2>
      
      <div className="space-y-3 sm:space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Nama Program
          </label>
          <input
            type="text"
            value={programName}
            onChange={(e) => setProgramName(e.target.value)}
            placeholder="Contoh: Sistem Login"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
            Alur Program
          </label>
          <textarea
            value={flowDescription}
            onChange={(e) => setFlowDescription(e.target.value)}
            placeholder="Jelaskan alur program Anda. Contoh: User membuka halaman login, memasukkan username dan password, sistem validasi, jika valid masuk ke dashboard, jika tidak tampilkan error"
            rows={6}
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
        </div>

        <button
          onClick={onGenerate}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:bg-gray-400 text-white font-semibold py-3.5 sm:py-4 px-6 rounded-lg transition duration-200 text-base sm:text-lg shadow-md active:shadow-sm touch-manipulation"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Generating...
            </span>
          ) : (
            "Generate Diagram"
          )}
        </button>
      </div>

      <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-sm text-blue-900 mb-2">💡 Tips:</h3>
        <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
          <li>• Jelaskan alur secara berurutan</li>
          <li>• Sebutkan kondisi dan keputusan</li>
          <li>• Sertakan state awal dan akhir</li>
        </ul>
      </div>
    </div>
  );
}
