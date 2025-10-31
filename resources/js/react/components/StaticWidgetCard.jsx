import React from "react";

const StaticWidgetCard = ({ layout, children }) => {
    const { width, height } = layout || {};

    const layoutClass = `
    ${width === "double" ? "col-span-2 aspect-[2/1]" : ""}
    ${height === "half" ? "aspect-[1/0.5]" : ""}
    ${width === "normal" && height === "normal" ? "aspect-square" : ""}
  `;

    return (
        <div
            className={`flex items-center justify-center border border-gray-300 rounded-xl shadow-sm bg-white text-gray-800 text-lg font-medium ${layoutClass}`}
        >
            {children}
        </div>
    );
};

export default StaticWidgetCard;
