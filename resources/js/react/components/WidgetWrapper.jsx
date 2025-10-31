import React from "react";

const WidgetWrapper = ({ fullWidth, halfHeight, doubleWidth, children }) => {
  // compute Tailwind class for layout sizing
  let sizeClass = "aspect-square";

  if (doubleWidth) sizeClass = "col-span-2 aspect-[2/1]";
  else if (halfHeight) sizeClass = "aspect-[1/0.5]";
  else sizeClass = "aspect-square";

  return (
    <div
      className={`flex items-center justify-center border border-gray-300 rounded-xl shadow-sm bg-white ${sizeClass}`}
    >
      {children}
    </div>
  );
};

export default WidgetWrapper;
