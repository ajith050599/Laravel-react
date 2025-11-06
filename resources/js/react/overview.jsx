// import React from "react";
// import ReactDOM from "react-dom/client";
// import CardGrid from "./pages/Overview";

// ReactDOM.createRoot(document.getElementById("react-root")).render(
//     <React.StrictMode>
//         <CardGrid />
//     </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import CardGrid from "./pages/Overview";

const rootElement = document.getElementById("react-root");

const widgetConfig = JSON.parse(rootElement.dataset.widgetConfig);
const widgetFields = JSON.parse(rootElement.dataset.widgetFields);

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <CardGrid widgetConfig={widgetConfig} widgetFields={widgetFields} />
  </React.StrictMode>
);
