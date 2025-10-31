import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableCard = ({ widget, activeId, layout, WidgetComponent }) => {
    const { id, config } = widget;
    const { width, height } = layout || {};

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition: isDragging ? "none" : transition,
        zIndex: isDragging ? 50 : 1,
        opacity: isDragging ? 0 : 1,
    };

    const layoutClass = `
    ${width === "double" ? "col-span-2 aspect-[2/1]" : ""}
    ${height === "half" ? "aspect-[1/0.5]" : ""}
    ${width === "normal" && height === "normal" ? "aspect-square" : ""}
  `;

    return (
        <div
            ref={setNodeRef}
            {...attributes}
            {...listeners}
            style={style}
            className={`flex items-center justify-center border border-gray-300 rounded-xl shadow-sm bg-white text-gray-800 text-lg font-medium select-none
        ${layoutClass}
        ${isDragging ? "cursor-grabbing scale-105" : "cursor-grab"}
      `}
        >
            <WidgetComponent config={config} layout={layout} />
        </div>
    );
};

export default SortableCard;
