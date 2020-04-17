import React from "react";
import UNIT_WIDTH from "BaseUnit";
import BAR_HEIGHT from "HealthBar";

const CONTROLLER_CLASS = "BaseUnit_Controller";

const RangeController = ({ name, position, onClick }) => {
    console.log("Rendering", "RangeController", name);
    const RANGE_CONTROLLER_WIDTH = UNIT_WIDTH / 3;
    const RANGE_CONTROLLER_HEIGHT = BAR_HEIGHT;
    const RANGE_CONTROLLER_Y_OFFSET = -RANGE_CONTROLLER_HEIGHT;
    return (
        <rect
            name={name}
            className={CONTROLLER_CLASS}
            x={RANGE_CONTROLLER_WIDTH * position}
            y={RANGE_CONTROLLER_Y_OFFSET}
            width={RANGE_CONTROLLER_WIDTH}
            height={RANGE_CONTROLLER_HEIGHT}
            onClick={onClick}
            opacity="0%"
        />
    );
};

export default RangeController