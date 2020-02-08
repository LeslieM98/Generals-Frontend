import React from "react";
import { useState, useEffect } from "react";

const UNIT_HEIGHT = 50;
const UNIT_WIDTH = 100;
const BAR_HEIGHT = 10;

const RangeCircleView = ({ color, name, data, enabled }) => {
  console.log("Rendering", "RangeView", name, data);
  const values = [];
  for (let x in data) {
    values.push(data[x]);
  }

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

const HealthBar = ({ data }) => {
  console.log("Rendering", "HealthBar", data);
  const HP = data && data.current / data.maximum;

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
  console.log("Rendering", "RangeController", name);
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
  combatRangeData,
  movementRangeData,
  viewDistanceData
}) => {
  console.log(
    "Rendering",
    "UnitStatus",
    healthData,
    combatRangeData,
    movementRangeData,
    viewDistanceData
  );
  const [viewDistanceEnabled, setViewDistanceEnabled] = useState(false);
  const [combatRangeEnabled, setCombatRangeEnabled] = useState(false);
  const [movementRangeEnabled, setMovementRangeEnabled] = useState(false);

  const toggleViewDistance = () => setViewDistanceEnabled(!viewDistanceEnabled);
  const toggleCombatRange = () => setCombatRangeEnabled(!combatRangeEnabled);
  const toggleMovementRange = () =>
    setMovementRangeEnabled(!movementRangeEnabled);

  return (
    <g name="UnitStatus">
      <HealthBar data={healthData} />
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
        <RangeCircleView
          name="CombatRange"
          data={combatRangeData}
          color="red"
          enabled={combatRangeEnabled}
        />
        <RangeCircleView
          name="MovementRange"
          data={movementRangeData}
          color="green"
          enabled={movementRangeEnabled}
        />
        <RangeCircleView
          name="ViewDistance"
          data={viewDistanceData}
          color="yellow"
          enabled={viewDistanceEnabled}
        />
      </g>
    </g>
  );
};

const BaseUnit = ({ id }) => {
  console.log("Rendering", "UnitStatus", id);
  const [healthData, setHealthData] = useState(null);
  const [combatRangeData, setCombatRangeData] = useState(null);
  const [positionData, setPositionData] = useState(null);
  const [movementRangeData, setMovementRangeData] = useState(null);
  const [viewDistanceData, setViewDistanceData] = useState(null);

  useEffect(() => update(), []);

  const update = () => {
    fetch(`http://localhost:8080/troop/get?id=${id}`)
      .then(x => x.json())
      .then(x => {
        setHealthData(x.health);
        setCombatRangeData(x.combatRange);
        setPositionData(x.position);
        setMovementRangeData(x.movementSpeed);
        setViewDistanceData(x.viewDistance);
      });
  };

  const TRANSLATE =
    positionData &&
    `translate(${positionData.x - UNIT_WIDTH / 2} ${positionData.y -
      UNIT_HEIGHT / 2})`;

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
          healthData={healthData}
          combatRangeData={combatRangeData}
          viewDistanceData={viewDistanceData}
          movementRangeData={movementRangeData}
        />
      </g>
    </svg>
  );
};

export default BaseUnit;
