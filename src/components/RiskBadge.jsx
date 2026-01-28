export default function RiskBadge({ score }) {
  let label = "Low";
  let styles = "border-green-400 text-green-400";

  if (score > 0.6) {
    label = "High";
    styles = "border-red-400 text-red-400";
  } else if (score > 0.3) {
    label = "Medium";
    styles = "border-yellow-400 text-yellow-400";
  }

  return (
    <div className={`mt-4 p-4 rounded border-2 ${styles}`}>
      <h3 className="font-semibold">
        Hallucination Risk: {label}
      </h3>
      <p>Risk Score: {score.toFixed(3)}</p>
    </div>
  );
}
