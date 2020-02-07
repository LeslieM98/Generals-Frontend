import React from "react";
import { useState, useEffect } from "react";

const UNIT_HEIGHT = 50;
const UNIT_WIDTH = 100;
const BAR_HEIGHT = 10;

const CombatRange = ({ combatRangeData }) => {
  console.log("battleRangeData:", combatRangeData);
  const CIRCLE_SCALE = 10;

  const CLOSE = combatRangeData && combatRangeData.close * CIRCLE_SCALE;
  const RANGED = combatRangeData && combatRangeData.ranged * CIRCLE_SCALE;

  return (
    <g name="CombatRange">
      <circle
        name="close"
        cx={UNIT_WIDTH / 2}
        cy={UNIT_HEIGHT / 2}
        r={CLOSE}
        fillOpacity="10%"
        fill="red"
      />
      <circle
        name="ranged"
        cx={UNIT_WIDTH / 2}
        cy={UNIT_HEIGHT / 2}
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
  const [health, setHealth] = useState(null);
  const [combatRange, setCombatRange] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => update(), []);

  const update = () => {
    fetch(`http://localhost:8080/troop/get?id=${id}`)
      .then(x => x.json())
      .then(x => {
        setHealth(x.health);
        setCombatRange(x.combatRange);
        setPosition(x.position);
      });
  };

  const TRANSLATE =
    position &&
    `translate(${position.x - UNIT_WIDTH / 2} ${position.y - UNIT_HEIGHT / 2})`;

  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <g
        name="BaseUnit"
        stroke="black"
        fill="white"
        strokeWidth="1pt"
        transform={TRANSLATE}
      >
        <rect x={0} y={0} width={UNIT_WIDTH} height={UNIT_HEIGHT} />
        <line x1="0" y1="0" x2={UNIT_WIDTH} y2={UNIT_HEIGHT} />
        <line x1="0" y1={UNIT_HEIGHT} x2={UNIT_WIDTH} y2="0" />
        <UnitStatus healthData={health} />
        <CombatRange combatRangeData={combatRange} />
      </g>
    </svg>
  );
};

export default BaseUnit;
