import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import SettingsIcon from "../assets/settings-02.svg";
import CloseIcon from "../assets/trash.svg";
import MoveIcon from "../assets/move.svg";

const SortableCard = ({ widget, layout, WidgetComponent, isDraggable, onDelete, onSettings }) => {
    const { id, config } = widget;
    const { width, height } = layout || {};

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id });

    const borderColor = "#155EEF";

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? "none" : transition,
        zIndex: isDragging ? 50 : 1,
        opacity: isDragging ? 0 : 1,
        borderColor,
    };

    const layoutClass = `
    ${width === "full" ? "col-span-2 aspect-[2/1]" : ""}
    ${height === "single" ? "aspect-[1/0.5]" : ""}
    ${width === "half" && height === "double" ? "aspect-square" : ""}
  `;

    const handleSettingsClick = (e) => {
        e.stopPropagation();
        onSettings(widget); 
    };

    const handleMoveClick = (e) => {
        e.stopPropagation();
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`
        relative flex items-center justify-center
        border-2 rounded-xl shadow-sm bg-white text-gray-800 text-lg font-medium select-none
        ${layoutClass}
        ${isDragging ? "cursor-grabbing scale-105" : "cursor-grab"}
      `}
        >
            {/* 🔹 Top-right icon container */}
            {isDraggable && (
                <div
                    className="absolute -top-[1px] -right-[1px] flex items-center gap-2 rounded-tr-xl px-2 py-1 border border-l-0 border-b-0"
                    style={{
                        borderColor: borderColor,
                        backgroundColor: borderColor,
                    }}
                >
                    <button
                        {...listeners}
                        {...attributes}
                        onClick={handleMoveClick}
                        className="p-1 rounded hover:bg-blue-600 transition cursor-grab active:cursor-grabbing"
                    >
                        <img
                            src={MoveIcon}
                            alt="move"
                            className="w-5 h-5 brightness-0 invert"
                        />
                    </button>

                    <button
                        onClick={handleSettingsClick}
                        className="p-1 rounded hover:bg-blue-600 transition"
                    >
                        <img
                            src={SettingsIcon}
                            alt="settings"
                            className="w-5 h-5 brightness-0 invert"
                        />
                    </button>

                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onDelete(id)
                        }}
                        className="p-1 rounded hover:bg-blue-600 transition"
                    >
                        <img
                            src={CloseIcon}
                            alt="delete"
                            className="w-5 h-5 brightness-0 invert"
                        />
                    </button>
                </div>
            )}

            <WidgetComponent config={config} isDraggable={isDraggable} />
        </div>
    );
};

export default SortableCard;
