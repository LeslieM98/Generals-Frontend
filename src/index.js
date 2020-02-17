import React from "react";
import ReactDOM from "react-dom";
import BattleMap from "./components/BattleMap.component";
import changeOrder from "./renderordermanipulator";

const App = () => {
  return (
    <div>
      <BattleMap />
      Generals-Frontend WIP
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

changeOrder(["Ranges"]);
