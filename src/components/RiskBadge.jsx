export default function RiskBadge({ score, level }) {
  // Default risk level if not provided
  const defaultLevel = () => {
    if (score <= 0.3) return { label: "Low", color: "green" };
    if (score <= 0.6) return { label: "Medium", color: "yellow" };
    return { label: "High", color: "red" };
  };

  const riskLevel = level || defaultLevel();

  const colorClasses = {
    green: "border-green-500 text-green-300 bg-green-800 bg-opacity-30",
    yellow: "border-yellow-500 text-yellow-300 bg-yellow-800 bg-opacity-30",
    red: "border-red-500 text-red-300 bg-red-800 bg-opacity-30",
  };

  const getColorIcon = () => {
    switch (riskLevel.color) {
      case "green":
        return "✅";
      case "yellow":
        return "⚠️";
      case "red":
        return "🚨";
      default:
        return "ℹ️";
    }
  };

  return (
    <div className={`mt-6 p-6 rounded-lg border-2 ${colorClasses[riskLevel.color]}`}>
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-bold text-lg flex items-center">
            <span className="text-2xl mr-3">{getColorIcon()}</span>
            Hallucination Risk: <span className="ml-2">{riskLevel.label}</span>
          </h3>
          <p className="mt-3 text-sm opacity-90">Risk Score: {score.toFixed(3)}</p>
          <div className="mt-3 w-full bg-gray-700 rounded-full h-4 overflow-hidden max-w-md">
            <div
              className={`h-4 rounded-full transition-all ${
                riskLevel.color === "green"
                  ? "bg-green-500"
                  : riskLevel.color === "yellow"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{ width: `${score * 100}%` }}
            ></div>
          </div>
          <div className="mt-3 text-xs opacity-75 grid grid-cols-3 gap-4 max-w-md">
            <div>
              <p className="font-semibold">Low Risk</p>
              <p>&le; 0.3</p>
            </div>
            <div>
              <p className="font-semibold">Medium Risk</p>
              <p>0.3 - 0.6</p>
            </div>
            <div>
              <p className="font-semibold">High Risk</p>
              <p>&gt; 0.6</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
