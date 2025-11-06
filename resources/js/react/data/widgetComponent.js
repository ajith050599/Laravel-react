import AvgDwellTime from "../components/widgets/AvgDwellTime";
import TotalPeople from "../components/widgets/TotalPeople";
import HighestZoneMovements from "../components/widgets/HighestZoneMovements";
import DwellTimeAnalytics from "../components/widgets/DwellTimeAnalytics";
import OccupancyOverTime from "../components/widgets/OccupancyOverTime";

export const widgetComponents = {
  "avg-dwell-time": {
    component: AvgDwellTime,
    layout: { width: "half", height: "single" },
  },
  "total-people": {
    component: TotalPeople,
    layout: { width: "half", height: "single" },
  },
  "highest-zone-movements": {
    component: HighestZoneMovements,
    layout: { width: "half", height: "double" },
  },
  "dwell-time-analytics": {
    component: DwellTimeAnalytics,
    layout: { width: "half", height: "double" },
  },
  "occupancy-over-time": {
    component: OccupancyOverTime,
    layout: { width: "full", height: "double" },
  },
};
