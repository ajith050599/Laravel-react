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
import Modal from "../components/Modal";
import WidgetLibraryBody from "../components/WidgetLibraryBody";
import WidgetSettingsBody from "../components/WidgetSettingsBody";
import ToggleModeSwitch from "../components/ToggleSwitch";

const CardGrid = ({ widgetConfig, widgetFields }) => {
  const hasMounted = useRef(false);
  const [isOpen, setIsOpen] = useState(false);
  const [addWidgetOpen, setAddWidgetOpen] = useState(false);
  const [deletedId, setDeletedId] = useState(false);
  const [selectedWidgetKey, setSelectedWidgetKey] = useState(null);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [selectedWidgetMeta, setSelectedWidgetMeta] = useState(null);
  const [tempConfig, setTempConfig] = useState({});
  const [fields, setFields] = useState(widgetFields);

  const [isDraggable, setIsDraggable] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const { data } = useFetch("/user-widgets", {}, 0, !isDraggable, true);

  useEffect(() => {
    setWidgets(data)
  }, [data])

  useEffect(() => {
    const loadDynamicFields = async () => {
      const apiFields = Object.entries(widgetFields).filter(([key, f]) => f.source === "api");

      const requests = apiFields.map(([key, f]) =>
        api.get(f.endpoint).then(res => ({ key, options: res.data }))
      );

      const results = await Promise.all(requests);

      setFields(prev => {
        const updated = { ...prev };
        results.forEach(({ key, options }) => {
          updated[key] = { ...updated[key], options };
        });
        return updated;
      });
    };

    loadDynamicFields();
  }, []);

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (!isDraggable && widgets.length > 0) {
      widgetReorder();
    }
  }, [isDraggable]);
  const handleDeleteModal = (deletedId) => {
    setIsOpen(true)
    setDeletedId(deletedId)
  }

  const handleWidgetDelete = async (deletedId) => {
    try {
      const res = await api.delete(`/user-widgets/${deletedId}`);
      setWidgets((prev) => prev.filter((w) => w.id !== deletedId));
    } catch (err) {
      console.error(" Failed to delete widget:", err.response?.data || err.message);
    }

  };
  const handleSaveWidget = async () => {
    const newWidget = {
      id: Date.now().toString(),
      key: selectedWidgetMeta.key,
      config: tempConfig
    };

    try {
      const res = await api.post("/user-widgets", newWidget);
      setWidgets(res.data.widgets);

      setSettingsModalOpen(false);
    } catch (err) {
      console.error("Failed to create widget:", err.response?.data || err.message);
    }
  };


  const widgetReorder = async () => {
    try {
      const res = await api.post("/user-widgets/reorder", { widgets });
      setWidgets(res.data.widgets);
    } catch (err) {
      setError(err.response || "Something went wrong");
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

        <div className="flex justify-between items-center w-[30%]">
          <button
            className="px-4 py-2 border border-blue-600 text-blue-600 rounded-md font-semibold hover:bg-blue-50 transition-colors"
            onClick={() => setAddWidgetOpen(true)}
          >
            Add Widget
          </button>
          <ToggleModeSwitch value={isDraggable} onChange={setIsDraggable} />
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
                  isDraggable={isDraggable}
                  onDelete={handleDeleteModal}
                />
              );
            })}
          </div>

          <DragOverlay>
            <CardOverlay widget={activeWidget} isDraggable={isDraggable} layout={activeLayout} />
          </DragOverlay>
        </DndContext>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {widgets?.map((widget) => {
            const { component: WidgetComponent, layout } = widgetComponents[widget?.key];
            return (
              <StaticWidgetCard key={widget?.id} layout={layout}>
                <WidgetComponent config={widget?.config} layout={layout} isDraggable={isDraggable} />
              </StaticWidgetCard>
            );
          })}
        </div>
      )}

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        header="Delete Widget"
        body="Are you sure you want to delete this widget? This action cannot be undone."
        footer={
          <>
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 bg-gray-200 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                console.log("Widget deleted!");
                handleWidgetDelete(deletedId)
                setIsOpen(false);
              }}
              className="px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </>
        }
      />
      <Modal
        isOpen={addWidgetOpen}
        onClose={() => setAddWidgetOpen(false)}
        width="max-w-[70%]"
        header={
          <div className="flex flex-col gap-1">
            <span className="text-[#414651] font-inter text-xl font-bold leading-[30px]">
              Add Widget
            </span>

            <span className="text-[#414651] font-inter text-base font-normal leading-6">
              Select widgets to visualize and interact with your data
            </span>
          </div>
        }
        body={
          <WidgetLibraryBody
            widgetConfig={widgetConfig}
            selectedKey={selectedWidgetKey}
            onSelect={(key) => {
              setSelectedWidgetKey(key);
              const meta = widgetConfig.find(w => w.key === key);
              setSelectedWidgetMeta(meta);
              setTempConfig(meta.settings);
              setAddWidgetOpen(false);
              setSettingsModalOpen(true);
            }}
          />

        }
      />
      <Modal
        isOpen={settingsModalOpen}
        onClose={() => setSettingsModalOpen(false)}
        width="max-w-[40%]"
        header={
          <div className="flex items-start gap-3">
            <div>
              <h2 className="font-semibold text-xl">{selectedWidgetMeta?.title}</h2>
              <p className="text-gray-500 text-sm">
                Customize how your widget appears and behaves on the dashboard
              </p>
            </div>
          </div>
        }
        body={
          <WidgetSettingsBody
            widgetMeta={selectedWidgetMeta}
            widgetFields={fields}
            configValues={tempConfig}
            onChangeConfig={(k, v) => setTempConfig(prev => ({ ...prev, [k]: v }))}
          />
        }
        footer={
          <>
            <button onClick={() => setSettingsModalOpen(false)} className="px-4 py-2 rounded-md border border-[#D5D7DA]">
              Cancel
            </button>
            <button onClick={handleSaveWidget} className="px-4 py-2 bg-[#155EEF] text-white rounded-md">
              Save Widget
            </button>
          </>
        }
      />

    </div>
  );
};

export default CardGrid;
