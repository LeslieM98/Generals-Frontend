import React from "react";
import axios from "axios";

const BattleMap = props => {
  const displayedUnits = props.displayedUnits.map(x =>
    axios.get(`http://localhost:8080/troop/get?id=${x}`, {
      body: {
        value: x
      }
    })
  );
  displayedUnits.forEach(x => x.then(y => console.log(y)));

  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <g name="BattleMap"></g>
    </svg>
  );
};

export default BattleMap;
