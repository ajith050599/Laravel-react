
import { widgetComponents } from "../data/widgetComponent";

const CardOverlay = ({ widget }) => {
    if (!widget) return null;

    const { component: WidgetComponent, layout } = widgetComponents[widget.key] || {};
    const { width, height } = layout || {};

    const layoutClasses = `
    ${width === "double" ? "col-span-2 aspect-[2/1]" : ""}
    ${height === "half" ? "aspect-[1/0.5]" : ""}
    ${width === "normal" && height === "normal" ? "aspect-square" : ""}
  `;

    return (
        <div
            className={`flex items-center justify-center border border-gray-400 rounded-xl shadow-lg bg-white text-gray-800 text-lg font-medium scale-105 opacity-90 ${layoutClasses}`}
        >
            <WidgetComponent config={widget.config} layout={layout} />
        </div>
    );
};

export default CardOverlay;
