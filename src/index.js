import React from "react";
import ReactDOM from "react-dom";
import BattleMap from "./components/BattleMap.component";
import BaseUnit from "./components/BaseUnit.component";

const App = () => {
  const units = [1, 2, 3];
  return (
    <div>
      <BaseUnit id="1" />
      Generals-Frontend WIP
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
