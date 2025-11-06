

const OccupancyOverTime = ({ config }) => (
        <div className="text-center">
            <h3 className="font-semibold text-gray-700">Occupancy Over Time</h3>
            <p className="text-sm text-gray-500">{config?.timeframe}</p>
        </div>
);

export default OccupancyOverTime;
