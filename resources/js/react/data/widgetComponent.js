import AvgDwellTime from "../components/widgets/AvgDwellTime";
import TotalPeople from "../components/widgets/TotalPeople";
import HighestZoneMovements from "../components/widgets/HighestZoneMovements";
import DwellTimeAnalytics from "../components/widgets/DwellTimeAnalytics";
import OccupancyOverTime from "../components/widgets/OccupancyOverTime";

export const widgetComponents = {
  "avg-dwell-time": {
    component: AvgDwellTime,
    layout: { width: "normal", height: "half" },
  },
  "total-people": {
    component: TotalPeople,
    layout: { width: "normal", height: "half" },
  },
  "highest-zone-movements": {
    component: HighestZoneMovements,
    layout: { width: "normal", height: "normal" },
  },
  "dwell-time-analytics": {
    component: DwellTimeAnalytics,
    layout: { width: "normal", height: "normal" },
  },
  "occupancy-over-time": {
    component: OccupancyOverTime,
    layout: { width: "double", height: "normal" },
  },
};
