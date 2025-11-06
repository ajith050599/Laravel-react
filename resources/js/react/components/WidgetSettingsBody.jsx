import React from "react";
import Dropdown from "../components/Drodown";

const WidgetSettingsBody = ({ widgetMeta, widgetFields, configValues, onChangeConfig }) => {
    return (
        <div className="w-full flex justify-center">
            <div className="border border-[#E9EAEB] rounded-xl p-6 bg-[#FAFAFA] w-1/2">
                <h3 className="text-center font-semibold text-gray-700 mb-6">Widget Settings</h3>


                <div className="flex flex-col gap-5">
                    {Object.keys(widgetMeta?.settings)?.map((field) => {
                        const def = widgetFields[field];
                        if (!def) return null;
                        return (
                            <Dropdown
                                key={field}
                                label={def.title}
                                value={configValues[field] || ""}
                                options={def.options || []}
                                onChange={(value) => onChangeConfig(field, value)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>

    );
};

export default WidgetSettingsBody;
