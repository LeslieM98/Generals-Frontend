import React from "react";
import { UNIT_HEIGHT, UNIT_WIDTH, VIEW_CLASS } from "BaseUnit";


const HEALTH_BAR_HEIGHT = 10;



const HealthBar = ({ data }) => {
    console.log("Rendering", "HealthBar", data);
    const HP = data && data.current / data.maximum;

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