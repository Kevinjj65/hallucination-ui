import { useEffect, useState } from "react";
import { fetchQueries, analyzeQuery } from "../api";
import QuerySelector from "./components/QuerySelector";
import ResultsView from "./components/ResultsView";

export default function App() {
  const [queries, setQueries] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQueries().then(res => setQueries(res.data)).catch(err => setError("Failed to load queries"));
  }, []);

  const handleSelect = async (query) => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const res = await analyzeQuery(query);
      setResult(res.data);
    } catch (err) {
      setError("Analysis failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <header className="text-center py-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg">
        <h1 className="text-4xl font-bold">LLM Hallucination Risk Analyzer</h1>
        <p className="text-lg mt-2 opacity-90">Advanced AI Risk Assessment with Multi-Feature Analysis</p>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <QuerySelector queries={queries} onSelect={handleSelect} />

        {loading && (
          <div className="mt-8 p-6 bg-blue-900 border-l-4 border-blue-400 rounded text-blue-200">
            <p className="text-lg font-semibold">🔄 Running comprehensive hallucination analysis...</p>
            <p className="text-sm mt-2">(Extracting features → Detecting types → Evaluating metrics → Generating report)</p>
          </div>
        )}

        {error && (
          <div className="mt-8 p-6 bg-red-900 border-l-4 border-red-400 rounded text-red-200">
            <p className="text-lg font-semibold">❌ Error</p>
            <p className="text-sm mt-2">{error}</p>
          </div>
        )}

        {result && <ResultsView data={result} />}
      </div>
    </div>
  );
}
