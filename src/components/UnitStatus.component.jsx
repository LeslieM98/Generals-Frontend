import React from "react";
import HealthBar from "HealthBar"
import RangeController from "Ranges"
import RangeControllerView from "RangeControllerView"
import RangeCircleView from "RangeCirvleView"
import VIEW_CLASS from "NatoSymbol"
import useState from "react";


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
    <g name="UnitStatus" className={VIEW_CLASS}>
      <HealthBar data={healthData} />
      <g name="RangeControllerViews">
        <RangeControllerView
          name="CombatRangeController"
          color="red"
          position="0"
          onClick={toggleCombatRange}
        />
        <RangeControllerView
          name="ViewDistanceController"
          color="yellow"
          position="1"
          onClick={toggleViewDistance}
        />
        <RangeControllerView
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
      <g name="RangeControllers">
        <RangeController
          name="CombatRangeController"
          position="0"
          onClick={toggleCombatRange}
        />
        <RangeController
          name="ViewDistanceController"
          position="1"
          onClick={toggleViewDistance}
        />
        <RangeController
          name="MovementRangeController"
          position="2"
          onClick={toggleMovementRange}
        />
      </g>
    </g>
  );
};

export default UnitStatus