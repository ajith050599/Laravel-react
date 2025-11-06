import React from "react";

const ToggleModeSwitch = ({ value, onChange }) => {
    return (
        <label className="relative inline-block w-50 h-10 cursor-pointer bg-[#FAFAFA] border border-[#E9EAEB] rounded-md p-2">
            <input
                type="checkbox"
                checked={value}
                onChange={() => onChange(!value)}
                className="sr-only"
            />

            {/* Live button */}
            <div
                className={`absolute top-0.5 left-0.5 w-[80px] h-9 rounded-md shadow-md flex items-center justify-center text-sm font-semibold transition-all duration-300 ${!value ? "bg-[#182048] text-white" : "bg-transparent text-gray-400"
                    }`}
            >
                Live
            </div>

            {/* Customize button */}
            <div
                className={`absolute top-0.5 right-0.5 w-[120px] h-9 rounded-md shadow-md flex items-center justify-center text-sm font-semibold transition-all duration-300 ${value ? "bg-[#182048] text-white" : "bg-transparent text-gray-400"
                    }`}
            >
                Customize
            </div>
        </label>
    );
};

export default ToggleModeSwitch;