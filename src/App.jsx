import { useEffect, useState } from "react";
import { fetchQueries, analyzeQuery } from "../api";
import QuerySelector from "./components/QuerySelector";
import ResultsView from "./components/ResultsView";

export default function App() {
  const [queries, setQueries] = useState({});
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQueries().then(res => setQueries(res.data));
  }, []);

  const handleSelect = async (query) => {
    setLoading(true);
    setResult(null);

    const res = await analyzeQuery(query);
    setResult(res.data);

    setLoading(false);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        LLM Hallucination Risk Analyzer
      </h1>

      <QuerySelector queries={queries} onSelect={handleSelect} />

      {loading && (
        <p className="mt-4 text-blue-400">
          Running hallucination analysis...
        </p>
      )}

      {result && <ResultsView data={result} />}
    </div>
  );
}
