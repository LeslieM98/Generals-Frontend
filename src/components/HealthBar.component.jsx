import React from "react";
import { UNIT_HEIGHT, UNIT_WIDTH, VIEW_CLASS } from "./BaseUnit.component";


const HEALTH_BAR_HEIGHT = 10;



const HealthBar = ({ unitData }) => {
    console.log("Rendering", "HealthBar", unitData);
    const HP = unitData && unitData.current / unitData.maximum;

    return (
        <g name="HealthBar" className={VIEW_CLASS}>
            <rect width={UNIT_WIDTH} height={HEALTH_BAR_HEIGHT} y={UNIT_HEIGHT}></rect>
            <rect
                width={UNIT_WIDTH * HP}
                height={HEALTH_BAR_HEIGHT}
                y={UNIT_HEIGHT}
                fill="green"
            />
        </g>
    );
};

export default HealthBar