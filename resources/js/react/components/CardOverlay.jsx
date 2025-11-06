import { widgetComponents } from "../data/widgetComponent";
import SettingsIcon from "../assets/settings-02.svg";
import CloseIcon from "../assets/trash.svg";
import MoveIcon from "../assets/move.svg";

const CardOverlay = ({ widget, isDraggable }) => {
    if (!widget) return null;

    const { component: WidgetComponent, layout } = widgetComponents[widget.key] || {};
    const { width, height } = layout || {};
    const borderColor = "#155EEF";

    const layoutClasses = `
    ${width === "full" ? "col-span-2 aspect-[2/1]" : ""}
    ${height === "single" ? "aspect-[1/0.5]" : ""}
    ${width === "half" && height === "double" ? "aspect-square" : ""}
  `;

    return (
        <div
            className={`relative flex items-center justify-center border-2 rounded-xl shadow-lg bg-white text-gray-800 text-lg font-medium scale-105 opacity-90 ${layoutClasses}`}
            style={{ borderColor }}
        >
            <div
                className="absolute -top-[1px] -right-[1px] flex items-center gap-2 rounded-tr-xl px-2 py-1 border border-l-0 border-b-0"
                style={{
                    borderColor,
                    backgroundColor: borderColor,
                }}
            >
                <img src={MoveIcon} alt="move" className="w-5 h-5 brightness-0 invert" />
                <img src={SettingsIcon} alt="settings" className="w-5 h-5 brightness-0 invert" />
                <img src={CloseIcon} alt="delete" className="w-5 h-5 brightness-0 invert" />
            </div>
            <WidgetComponent config={widget.config} isDraggable={isDraggable} />
        </div>
    );
};

export default CardOverlay;
