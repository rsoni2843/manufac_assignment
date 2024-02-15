import React from "react";
import data from "./data.json";
import { WineStatisticsTable } from "./components/Flavanoids";
import { GammaStatisticsTable } from "./components/Gamma";

const App: React.FC = () => {
  return (
    <div>
      <h1>Wine Statistics</h1>
      <h2>Table-1</h2>
      <WineStatisticsTable />
      <h2>Table-2</h2>
      <GammaStatisticsTable />
    </div>
  );
};

export default App;
