import React, { useState, useEffect, useRef } from "react";
import {
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import SortableCard from "../components/SortableCard";
import CardOverlay from "../components/CardOverlay";
import { widgetComponents } from "../data/widgetComponent";
import { useFetch } from "../hooks/useFetch";
import api from "../api/axios";
import StaticWidgetCard from "../components/StaticWidgetCard";

const CardGrid = () => {
  const { data, isLoading, hasError } = useFetch("/user-widgets", {}, 30);
  const hasMounted = useRef(false);
  const [isDraggable, setIsDraggable] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    setWidgets(data)
  }, [data])

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (!isDraggable && widgets.length > 0) {
      widgetReorder();
    }
  }, [isDraggable]);
  const widgetReorder = async () => {
    try {
      const res = await api.post("/user-widgets/reorder", { widgets });
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over || active.id === over.id) return;

    setWidgets((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);
      const newOrder = arrayMove(prev, oldIndex, newIndex);
      return newOrder;
    });
  };

  const activeWidget = widgets?.find((w) => w.id === activeId);
  const activeLayout =
    activeWidget && widgetComponents[activeWidget.key]?.layout;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <span className="font-bold text-xl text-gray-800">People Overview</span>
          <span className="text-base text-gray-500">
            Aggregated view of people activity and presence across your locations
          </span>
        </div>

        <div className="flex justify-between items-center w-[25%]">
          <button className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-md font-semibold hover:bg-blue-50 transition-colors">
            Add Widget
          </button>
          <label className="relative inline-block w-41 h-10 cursor-pointer">
            <input
              type="checkbox"
              checked={isDraggable}
              onChange={() => setIsDraggable((prev) => !prev)}
              className="sr-only"
            />
            <div className="w-full h-full bg-blue-600 rounded-md" />
            <div
              className={`absolute top-0.5 left-0.5 w-[100px] h-9 bg-white rounded-md shadow-md flex items-center justify-center text-sm font-semibold text-blue-600 transform transition-transform duration-300 ${isDraggable ? "translate-x-[60px]" : "translate-x-0"
                }`}
            >
              {isDraggable ? "Customize" : "Live"}
            </div>
          </label>
        </div>
      </div>

      {isDraggable ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-2 gap-4">
            {widgets.map((widget) => {
              const { component: WidgetComponent, layout } = widgetComponents[widget.key];
              return (
                <SortableCard
                  key={widget.id}
                  widget={widget}
                  activeId={activeId}
                  layout={layout}
                  WidgetComponent={WidgetComponent}
                />
              );
            })}
          </div>

          <DragOverlay>
            <CardOverlay widget={activeWidget} layout={activeLayout} />
          </DragOverlay>
        </DndContext>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {widgets?.map((widget) => {
            const { component: WidgetComponent, layout } = widgetComponents[widget?.key];
            return (
              <StaticWidgetCard key={widget?.id} layout={layout}>
                <WidgetComponent config={widget?.config} layout={layout} />
              </StaticWidgetCard>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CardGrid;
