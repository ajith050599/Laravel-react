import React from "react";

const AvgDwellTime = ({ config, layout }) => {
  return (

      <div className="text-center">
        <h3 className="font-semibold text-gray-700">Avg Dwell Time</h3>
        <p className="text-sm text-gray-500">{config?.location}</p>
      </div>
  );
};

export default AvgDwellTime;
