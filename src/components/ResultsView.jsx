import RiskBadge from "./RiskBadge";

export default function ResultsView({ data }) {
  return (
    <div className="mt-6 bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">
        Analysis Results
      </h2>

      <h3 className="text-green-400 font-medium mb-2">
        Generated Answers
      </h3>

      {data.answers.map((ans, i) => (
        <div key={i} className="bg-gray-700 p-3 rounded mb-2">
          <strong>Sample {i + 1}:</strong> {ans}
        </div>
      ))}

      <h3 className="text-yellow-400 font-medium mt-4">
        Extracted ML Features
      </h3>

      <ul className="list-disc list-inside mt-2">
        <li>Semantic Variance: {data.features.semantic_variance}</li>
        <li>Length Variance: {data.features.length_variance}</li>
      </ul>

      <RiskBadge score={data.risk_score} />
    </div>
  );
}
