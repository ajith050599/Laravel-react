import { useFetch } from "../../hooks/useFetch";

const TotalPeople = ({ config, isDraggable }) => {
  const timeframe = config?.time_frame || "today";

  const { data, isLoading, hasError } = useFetch(
    `/people-count?timeframe=${timeframe}`,
    {},
    15,
    !isDraggable,
    false
  );

  const totalPeople = data?.value ?? 0;

  return (
    <div className="w-full h-full bg-white border border-gray-200 rounded-xl shadow-sm p-5 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-800 font-semibold text-base">Total People</h3>
          <p className="text-sm text-gray-500">{timeframe}</p>
        </div>

        <div className="text-right">
          <p className="text-gray-700 font-semibold text-sm tracking-wide">
            {config?.people_type?.toUpperCase() || "VISITORS"}
          </p>
          <button className="text-sm text-blue-600 border border-blue-600 rounded-full px-3 py-0.5 mt-1 hover:bg-blue-50 transition">
            {config?.location}
          </button>
        </div>
      </div>

      <div className="mt-6">
        {isLoading && !isDraggable && (
          <p className="text-gray-400 text-lg">Loading...</p>
        )}
        {hasError && <p className="text-red-500 text-lg">Error loading data</p>}
        {data && !isDraggable && (
          <p className="text-5xl font-semibold text-gray-800">{totalPeople}</p>
        )}
        {isDraggable && (
          <p className="text-sm text-gray-400 italic">Dragging… updates paused</p>
        )}
      </div>
    </div>
  );
};

export default TotalPeople;