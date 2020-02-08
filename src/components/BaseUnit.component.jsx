import React from "react";
import { useState, useEffect } from "react";

const UNIT_HEIGHT = 50;
const UNIT_WIDTH = 100;
const BAR_HEIGHT = 10;

const RangeView = ({ color, name, data, enabled }) => {
  const values = [];
  for (let x in data) {
    values.push(data[x]);
  }
  console.log("RangeView data:", data);
  console.log("RangeView values:", values);

  return (
    <g name={name}>
      {enabled
        ? values
            .sort()
            .map(x => x * 10)
            .map(v => (
              <circle
                name="disadvantaged"
                cx={UNIT_WIDTH / 2}
                cy={UNIT_HEIGHT / 2}
                r={v}
                fillOpacity={"10%"}
                fill={color}
              />
            ))
        : ""}{" "}
    </g>
  );
};

const HealthBar = ({ healthData }) => {
  console.log("healthData:", healthData);
  const HP = healthData && healthData.current / healthData.maximum;

  return (
    <g name="HealthBar">
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

const RangeController = ({ name, color, position, onClick }) => {
  const RANGE_CONTROLLER_WIDTH = UNIT_WIDTH / 3;
  const RANGE_CONTROLLER_HEIGHT = BAR_HEIGHT;
  const RANGE_CONTROLLER_Y_OFFSET = -RANGE_CONTROLLER_HEIGHT;
  return (
    <rect
      name={name}
      x={RANGE_CONTROLLER_WIDTH * position}
      y={RANGE_CONTROLLER_Y_OFFSET}
      width={RANGE_CONTROLLER_WIDTH}
      height={RANGE_CONTROLLER_HEIGHT}
      fill={color}
      onClick={onClick}
    />
  );
};

const UnitStatus = ({
  healthData,
  combatRange,
  movementRange,
  viewDistance
}) => {
  const [viewDistanceEnabled, setViewDistanceEnabled] = useState(false);
  const [combatRangeEnabled, setCombatRangeEnabled] = useState(false);
  const [movementRangeEnabled, setMovementRangeEnabled] = useState(false);

  const toggleViewDistance = () => setViewDistanceEnabled(!viewDistanceEnabled);
  const toggleCombatRange = () => setCombatRangeEnabled(!combatRangeEnabled);
  const toggleMovementRange = () =>
    setMovementRangeEnabled(!movementRangeEnabled);

  return (
    <g name="UnitStatus">
      <HealthBar healthData={healthData} />
      <g name="RangeControllers">
        <RangeController
          name="CombatRangeController"
          color="red"
          position="0"
          onClick={toggleCombatRange}
        />
        <RangeController
          name="ViewDistanceController"
          color="yellow"
          position="1"
          onClick={toggleViewDistance}
        />

        <RangeController
          name="MovementRangeController"
          color="green"
          position="2"
          onClick={toggleMovementRange}
        />
      </g>
      <g name="Ranges">
        <RangeView
          name="CombatRange"
          data={combatRange}
          color="red"
          enabled={combatRangeEnabled}
        />
        <RangeView
          name="MovementRange"
          data={movementRange}
          color="green"
          enabled={movementRangeEnabled}
        />
        <RangeView
          name="ViewDistance"
          data={viewDistance}
          color="yellow"
          enabled={viewDistanceEnabled}
        />
      </g>
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
        <UnitStatus
          healthData={health}
          combatRange={combatRange}
          viewDistance={viewDistance}
          movementRange={movementRange}
        />
      </g>
    </svg>
  );
};

export default BaseUnit;
