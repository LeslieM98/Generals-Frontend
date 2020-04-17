import React from "react";
import { UNIT_HEIGHT, UNIT_WIDTH } from "BaseUnit";

const RangeCircleView = ({ color, name, data, enabled }) => {
    console.log("Rendering", "RangeView", name, data);
    const values = [];
    for (let x in data) {
        values.push(data[x]);
    }

    return (
        <g name={name} className="BaseUnit_Rangeview">
            {enabled
                ? values
                    .sort()
                    .map(x => x * 10)
                    .map(v => (
                        <circle
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

export default RangeCircleView