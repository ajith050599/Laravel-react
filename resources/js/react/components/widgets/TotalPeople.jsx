import React from "react";
import WidgetWrapper from "../WidgetWrapper";

const TotalPeople = ({ config, layout }) => {
  return (
      <div className="text-center">
        <h3 className="font-semibold text-gray-700">Total People</h3>
        <p className="text-sm text-gray-500">{config?.timeframe}</p>
      </div>
  );
};

export default TotalPeople;
