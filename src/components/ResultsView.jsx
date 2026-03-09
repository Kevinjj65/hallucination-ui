import RiskBadge from "./RiskBadge";

const FeatureBar = ({ label, value }) => {
  const percentage = (value * 100).toFixed(1);
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-semibold text-gray-200">{label}</span>
        <span className="text-sm font-bold text-blue-300">{value.toFixed(3)}</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default function ResultsView({ data }) {
  const getRiskLevel = (score) => {
    if (score <= 0.3) return { label: "Low", color: "green" };
    if (score <= 0.6) return { label: "Medium", color: "yellow" };
    return { label: "High", color: "red" };
  };

  const riskLevel = getRiskLevel(data.risk_score);

  return (
    <div className="mt-8 space-y-6">
      {/* Generated Answers Section */}
      <div className="bg-gradient-to-br from-green-900 to-slate-800 p-6 rounded-lg border border-green-700">
        <h2 className="text-2xl font-bold text-green-300 mb-4 flex items-center">
          💬 Generated Answers ({data.answers?.length || 0} Samples)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.answers?.map((answer, i) => (
            <div key={i} className="p-4 bg-slate-700 rounded-lg border border-green-600 hover:border-green-400 transition">
              <strong className="text-green-300">Sample {i + 1}:</strong>
              <p className="text-gray-200 mt-2 text-sm leading-relaxed">{answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ML Features Section */}
      <div className="bg-gradient-to-br from-yellow-900 to-slate-800 p-6 rounded-lg border border-yellow-700">
        <h2 className="text-2xl font-bold text-yellow-300 mb-6 flex items-center">
          📊 Extracted ML Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {data.features && Object.entries(data.features).map(([key, value]) => (
            <div key={key} className="">
              <FeatureBar
                label={key.replace(/_/g, " ").split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")}
                value={value}
              />
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-yellow-900 bg-opacity-50 rounded text-yellow-200 text-sm border-l-4 border-yellow-400">
          💡 <strong>Note:</strong> These features measure variance, entropy, and agreement across multiple LLM responses to detect hallucinations.
        </div>
      </div>

      {/* Risk Assessment Section */}
      <div className="bg-gradient-to-br from-blue-900 to-slate-800 p-6 rounded-lg border border-blue-700">
        <h2 className="text-2xl font-bold text-blue-300 mb-4 flex items-center">
          ⚠️ Hallucination Risk Assessment
        </h2>
        <RiskBadge score={data.risk_score} level={riskLevel} />
      </div>

      {/* Hallucination Types Section */}
      {data.hallucination_types && data.hallucination_types.length > 0 && (
        <div className="bg-gradient-to-br from-purple-900 to-slate-800 p-6 rounded-lg border border-purple-700">
          <h2 className="text-2xl font-bold text-purple-300 mb-4 flex items-center">
            🔍 Detected Hallucination Types
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.hallucination_types.map((type, index) => (
              <div
                key={index}
                className="p-3 bg-purple-800 border-l-4 border-purple-400 rounded flex items-center"
              >
                <span className="text-purple-300 mr-3 text-lg">•</span>
                <span className="text-gray-100 font-medium">{type}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Evaluation Results Section */}
      {data.evaluation_results && (
        <div className="bg-gradient-to-br from-indigo-900 to-slate-800 p-6 rounded-lg border border-indigo-700">
          <h2 className="text-2xl font-bold text-indigo-300 mb-6 flex items-center">
            📈 Evaluation Results
          </h2>

          {/* Metrics */}
          <h3 className="text-xl font-semibold text-indigo-200 mb-4 flex items-center">
            📊 Metrics
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {data.evaluation_results.overall_accuracy !== undefined && (
              <div className="p-4 bg-indigo-800 rounded-lg border border-indigo-600">
                <p className="text-indigo-200 text-sm">Overall Accuracy</p>
                <p className="text-2xl font-bold text-indigo-100 mt-1">{(data.evaluation_results.overall_accuracy * 100).toFixed(2)}%</p>
              </div>
            )}
            {data.evaluation_results.precision !== undefined && (
              <div className="p-4 bg-indigo-800 rounded-lg border border-indigo-600">
                <p className="text-indigo-200 text-sm">Precision</p>
                <p className="text-2xl font-bold text-indigo-100 mt-1">{(data.evaluation_results.precision * 100).toFixed(2)}%</p>
              </div>
            )}
            {data.evaluation_results.recall !== undefined && (
              <div className="p-4 bg-indigo-800 rounded-lg border border-indigo-600">
                <p className="text-indigo-200 text-sm">Recall</p>
                <p className="text-2xl font-bold text-indigo-100 mt-1">{(data.evaluation_results.recall * 100).toFixed(2)}%</p>
              </div>
            )}
            {data.evaluation_results.f1_score !== undefined && (
              <div className="p-4 bg-indigo-800 rounded-lg border border-indigo-600">
                <p className="text-indigo-200 text-sm">F1 Score</p>
                <p className="text-2xl font-bold text-indigo-100 mt-1">{(data.evaluation_results.f1_score * 100).toFixed(2)}%</p>
              </div>
            )}
          </div>

          {/* Plots/Visualizations */}
          {data.evaluation_results.plots && data.evaluation_results.plots.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-indigo-200 mb-4 flex items-center">
                📊 Visualizations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.evaluation_results.plots.map((plotUrl, index) => (
                  <div key={index} className="bg-slate-700 p-4 rounded-lg border border-indigo-600 overflow-hidden">
                    {plotUrl.startsWith('http') ? (
                      <img
                        src={plotUrl}
                        alt={`Visualization ${index + 1}`}
                        className="w-full h-auto rounded"
                      />
                    ) : (
                      <p className="text-gray-400 text-sm">{plotUrl}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Report */}
          {data.evaluation_results.report && (
            <div>
              <h3 className="text-xl font-semibold text-indigo-200 mb-4 flex items-center">
                📄 Report
              </h3>
              <div className="bg-slate-800 p-4 rounded-lg border border-indigo-600">
                {data.evaluation_results.report.markdown ? (
                  <div className="text-gray-200 text-sm whitespace-pre-wrap font-mono max-h-96 overflow-y-auto">
                    {data.evaluation_results.report.markdown}
                  </div>
                ) : data.evaluation_results.report.json ? (
                  <div className="text-gray-200 text-sm whitespace-pre-wrap font-mono max-h-96 overflow-y-auto">
                    {JSON.stringify(data.evaluation_results.report.json, null, 2)}
                  </div>
                ) : (
                  <p className="text-gray-400">No report available</p>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
