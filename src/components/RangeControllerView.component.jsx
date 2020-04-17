import React from "react"
import UNIT_WIDTH from "BaseUnit";
import BAR_HEIGHT from "HealthBar";


const RANGEVIEW_CLASS = "BaseUnit_Rangeview";

const RangeControllerView = ({ name, color, position }) => {
    console.log("Rendering", "RangeControllerView", name);
    const RANGE_CONTROLLER_WIDTH = UNIT_WIDTH / 3;
    const RANGE_CONTROLLER_HEIGHT = BAR_HEIGHT;
    const RANGE_CONTROLLER_Y_OFFSET = -RANGE_CONTROLLER_HEIGHT;
    return (
        <rect
            name={name}
            className={RANGEVIEW_CLASS}
            x={RANGE_CONTROLLER_WIDTH * position}
            y={RANGE_CONTROLLER_Y_OFFSET}
            width={RANGE_CONTROLLER_WIDTH}
            height={RANGE_CONTROLLER_HEIGHT}
            fill={color}
        />
    );
};

export default RangeControllerView