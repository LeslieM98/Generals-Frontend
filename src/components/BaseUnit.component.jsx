import React from "react";
import { useState, useEffect } from "react";

const UNIT_HEIGHT = 50;
const UNIT_WIDTH = 100;
const BAR_HEIGHT = 10;

const CombatRange = ({ combatRangeData, cx, cy }) => {
  console.log("battleRangeData:", combatRangeData);
  const CIRCLE_SCALE = 10;

  const CLOSE = combatRangeData && combatRangeData.close * CIRCLE_SCALE;
  const RANGED = combatRangeData && combatRangeData.ranged * CIRCLE_SCALE;

  return (
    <g name="CombatRange">
      <circle
        name="close"
        cx={cx}
        cy={cy}
        r={CLOSE}
        fillOpacity="10%"
        fill="red"
      />
      <circle
        name="ranged"
        cx={cx}
        cy={cy}
        r={RANGED}
        fillOpacity="10%"
        fill="red"
      />
    </g>
  );
};

const UnitStatus = ({ healthData }) => {
  console.log("healthData:", healthData);
  const HP = healthData && healthData.current / healthData.maximum;

  return (
    <g name="UnitStatus">
      <rect width={UNIT_WIDTH} height={BAR_HEIGHT} y={UNIT_HEIGHT}></rect>
      <rect
        width={UNIT_WIDTH * HP}
        height={BAR_HEIGHT}
        y={UNIT_HEIGHT}
        fill="green"
      />
    </g>
  );
};

const BaseUnit = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => pullHealthData(), []);

  const pullHealthData = () => {
    fetch(`http://localhost:8080/troop/get?id=${id}`)
      .then(x => x.json())
      .then(x => setData(x));
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <g name="BaseUnit" stroke="black" fill="white" strokeWidth="1pt">
        <rect width={UNIT_WIDTH} height={UNIT_HEIGHT} />
        <line x1="0" y1="0" x2={UNIT_WIDTH} y2={UNIT_HEIGHT} />
        <line x1="0" y1={UNIT_HEIGHT} x2={UNIT_WIDTH} y2="0" />
        <UnitStatus healthData={data && data.health} />
        <CombatRange combatRangeData={data && data.combatRange} />
      </g>
    </svg>
  );
};

export default BaseUnit;
