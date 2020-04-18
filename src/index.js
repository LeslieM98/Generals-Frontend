import React from "react";
import ReactDOM from "react-dom";
import BaseUnit from "./components/BaseUnit.component";
import changeOrder from "./renderordermanipulator";

const App = () => {
  return (
    <div>
      <BaseUnit id="1" />
      Generals-Frontend WIP
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));

changeOrder(["Ranges"]);
