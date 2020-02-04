import React from "react";
import ReactDOM from "react-dom";
import BattleMap from "./components/BattleMap.component";

const App = () => {
  const units = [1, 2, 3];
  return (
    <div>
      <BattleMap displayedUnits={units} />
      Generals-Frontend WIP
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
