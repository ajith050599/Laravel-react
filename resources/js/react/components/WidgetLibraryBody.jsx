const WidgetLibraryBody = ({ widgetConfig, onSelect, selectedKey }) => {

    const grouped = widgetConfig.reduce((acc, widget) => {
        if (!acc[widget.type]) acc[widget.type] = [];
        acc[widget.type].push(widget);
        return acc;
    }, {});

    return (
        <div className="space-y-8 p-4">
            {Object.entries(grouped).map(([type, widgets]) => (
                <div key={type}>
                    <h2 className="text-sm font-bold text-gray-700 mb-3 uppercase">
                        {type}
                    </h2>
                    <div className="flex flex-col items-start gap-4 p-4 rounded-md bg-[#FAFAFA]">
                        <div className="grid grid-cols-2 gap-6">
                            {widgets.map((w) => (
                                <div
                                    key={w.key}
                                    className={`
                                                flex flex-col items-start gap-2 w-[296px] h-[184px] p-5 
                                                rounded-xl bg-white border border-[#E9EAEB] shadow-sm cursor-pointer transition 
                                                ${selectedKey === w.key ? "border-2 border-purple-500" : ""}
                                            `}
                                    onClick={() => onSelect(w.key)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div>
                                            <h3 className="font-semibold text-gray-800 text-base">{w.title}</h3>
                                            <p className="text-xs text-gray-500 mt-1">{w.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default WidgetLibraryBody;