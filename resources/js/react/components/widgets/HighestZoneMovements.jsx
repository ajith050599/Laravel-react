import React from "react";

const HighestZoneMovements = ({ config }) => (
    <div className="text-center">
      <h3 className="font-semibold text-gray-700">Highest Zone Movements</h3>
      <p className="text-sm text-gray-500">{config?.timeframe}</p>
    </div>
);

export default HighestZoneMovements;
