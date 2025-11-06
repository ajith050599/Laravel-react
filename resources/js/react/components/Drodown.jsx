
const Dropdown = ({
    label,
    options = [],
    placeholder = "Select an option",
    value,
    onChange,
}) => {
    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label className="text-sm font-semibold text-gray-700">{label}</label>
            )}

            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="
          w-full rounded-md border border-gray-300 bg-white px-3 py-2
          text-gray-700 text-sm
          shadow-sm
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
          appearance-none
          cursor-pointer
        "
            >
                <option value="">{placeholder}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;
