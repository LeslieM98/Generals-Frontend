import React from "react";
import BaseUnit from "./BaseUnit.component";
import { useState, useEffect } from "react";

const BattleMap = () => {
  const [displayedUnits, setDisplayedUnits] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => update(), []);

  const update = () => {
    fetch(`http://localhost:8080/troop/getallids`)
      .then(x => x.json())
      .then(x => {
        setDisplayedUnits(x);
      });
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <g name="BattleMap">
        {displayedUnits.map(x => (
          <BaseUnit id={x} />
        ))}
      </g>
    </svg>
  );
};

export default BattleMap;
