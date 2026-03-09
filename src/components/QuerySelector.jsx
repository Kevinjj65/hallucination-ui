const getCategoryIcon = (category) => {
  const icons = {
    factual: '📋',
    consistency: '🔄',
    reasoning: '🧠',
    knowledge: '📚',
    general: '❓',
  };
  const lower = category.toLowerCase();
  return Object.keys(icons).find(key => lower.includes(key)) ? icons[Object.keys(icons).find(key => lower.includes(key))] : '❓';
};

export default function QuerySelector({ queries, onSelect }) {
  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold mb-6 text-white">
        📝 Benchmark Queries
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(queries).map(([category, list]) => (
          <div
            key={category}
            className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg p-5 shadow-lg border border-slate-600 hover:border-blue-500 transition"
          >
            <h4 className="text-lg font-bold text-blue-300 mb-4 flex items-center">
              <span className="text-2xl mr-2">{getCategoryIcon(category)}</span>
              {category.charAt(0).toUpperCase() + category.slice(1).replace(/_/g, ' ')}
            </h4>

            <div className="space-y-2">
              {list.map((q, i) => (
                <button
                  key={i}
                  onClick={() => onSelect(q)}
                  className="
                    w-full text-left px-4 py-3 rounded-lg
                    bg-slate-600 hover:bg-blue-600
                    transition duration-200 transform hover:scale-105
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                    text-white text-sm
                  "
                  title={q}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
