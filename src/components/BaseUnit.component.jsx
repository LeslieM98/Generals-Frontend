import React from "react";
import { useState, useEffect } from "react";
import UnitStatus from "./HealthBar.component";

const UNIT_HEIGHT = 50;
const UNIT_WIDTH = 100;
const VIEW_CLASS = "BaseUnit_View";

const BaseUnit = ({ id }) => {
    console.log("Rendering", "UnitStatus", id);
    const [healthData, setHealthData] = useState(null);
    const [combatRangeData, setCombatRangeData] = useState(null);
    const [positionData, setPositionData] = useState(null);
    const [movementRangeData, setMovementRangeData] = useState(null);
    const [viewDistanceData, setViewDistanceData] = useState(null);

    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <g
            name="BaseUnit"
            className={VIEW_CLASS}
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
    );
};

export { UNIT_HEIGHT, UNIT_WIDTH, VIEW_CLASS }
export default BaseUnit