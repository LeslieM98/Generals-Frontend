import React from "react";
import { useState, useEffect } from "react";

const UNIT_HEIGHT = 50;
const UNIT_WIDTH = 100;
const BAR_HEIGHT = 10;

const DISTANCE_OPACITY = "10%";

const ViewDistance = ({ viewDistanceData }) => {
  console.log("movementRangeData:", viewDistanceData);
  const CIRCLE_SCALE = 10;

  const COLOR = "yellow";

  const DISADVANTAGED =
    viewDistanceData && viewDistanceData.disadvantaged * CIRCLE_SCALE;
  const NORMAL = viewDistanceData && viewDistanceData.normal * CIRCLE_SCALE;
  const ADVANTAGED =
    viewDistanceData && viewDistanceData.advantaged * CIRCLE_SCALE;
  return (
    <g name="MovementRange">
      <circle
        name="disadvantaged"
        cx={UNIT_WIDTH / 2}
        cy={UNIT_HEIGHT / 2}
        r={DISADVANTAGED}
        fillOpacity={DISTANCE_OPACITY}
        fill={COLOR}
      />
      <circle
        name="normal"
        cx={UNIT_WIDTH / 2}
        cy={UNIT_HEIGHT / 2}
        r={NORMAL}
        fillOpacity={DISTANCE_OPACITY}
        fill={COLOR}
      />
      <circle
        name="advantaged"
        cx={UNIT_WIDTH / 2}
        cy={UNIT_HEIGHT / 2}
        r={ADVANTAGED}
        fillOpacity={DISTANCE_OPACITY}
        fill={COLOR}
      />
    </g>
  );
};

const MovementRange = ({ movementRangeData }) => {
  console.log("movementRangeData:", movementRangeData);
  const CIRCLE_SCALE = 10;

  const COLOR = "green";

  const DIFFICULT_TERRAIN =
    movementRangeData && movementRangeData.difficultTerrain * CIRCLE_SCALE;
  const NORMAL = movementRangeData && movementRangeData.normal * CIRCLE_SCALE;
  const STREET = movementRangeData && movementRangeData.street * CIRCLE_SCALE;
  return (
    <g name="MovementRange">
      <circle
        name="difficusltTerrain"
        cx={UNIT_WIDTH / 2}
        cy={UNIT_HEIGHT / 2}
        r={DIFFICULT_TERRAIN}
        fillOpacity={DISTANCE_OPACITY}
        fill={COLOR}
      />
      <circle
        name="normal"
        cx={UNIT_WIDTH / 2}
        cy={UNIT_HEIGHT / 2}
        r={NORMAL}
        fillOpacity={DISTANCE_OPACITY}
        fill={COLOR}
      />
      <circle
        name="street"
        cx={UNIT_WIDTH / 2}
        cy={UNIT_HEIGHT / 2}
        r={STREET}
        fillOpacity={DISTANCE_OPACITY}
        fill={COLOR}
      />
    </g>
  );
};

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
        fillOpacity={DISTANCE_OPACITY}
        fill="red"
      />
      <circle
        name="ranged"
        cx={UNIT_WIDTH / 2}
        cy={UNIT_HEIGHT / 2}
        r={RANGED}
        fillOpacity={DISTANCE_OPACITY}
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
  const [movementRange, setMovementRange] = useState(null);
  const [viewDistance, setViewDistance] = useState(null);

  useEffect(() => update(), []);

  const update = () => {
    fetch(`http://localhost:8080/troop/get?id=${id}`)
      .then(x => x.json())
      .then(x => {
        setHealth(x.health);
        setCombatRange(x.combatRange);
        setPosition(x.position);
        setMovementRange(x.movementSpeed);
        setViewDistance(x.viewDistance);
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
        <MovementRange movementRangeData={movementRange} />
        <ViewDistance viewDistanceData={viewDistance} />
      </g>
    </svg>
  );
};

export default BaseUnit;
