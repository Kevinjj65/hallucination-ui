export default function QuerySelector({ queries, onSelect }) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-4">
        Benchmark Queries
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(queries).map(([category, list]) => (
          <div
            key={category}
            className="bg-gray-800 rounded-lg p-4 shadow"
          >
            <h4 className="text-sm font-semibold text-blue-400 mb-3 tracking-wider">
              {category.toUpperCase()}
            </h4>

            <div className="space-y-2">
              {list.map((q, i) => (
                <button
                  key={i}
                  onClick={() => onSelect(q)}
                  className="
                    w-full text-left px-3 py-2 rounded
                    bg-gray-700 hover:bg-gray-600
                    transition duration-150
                    focus:outline-none focus:ring-2 focus:ring-blue-400
                  "
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
