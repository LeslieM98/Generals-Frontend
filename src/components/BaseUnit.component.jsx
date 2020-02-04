import React from "react";

const BaseUnit = props => {
  const SCALE = props.scale === undefined ? 1 : props.scale;
  const UNITTYPE = props.type === undefined ? "" : props.type;
  const WIDTH = 100 * SCALE;
  const HEIGHT = 50 * SCALE;

  const TEXT_X = (WIDTH / 6) * 5;
  const TEXT_Y = HEIGHT / 2;

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg">
        <g name="BaseUnit" stroke="black" fill="white" strokeWidth="1pt">
          <rect width={WIDTH} height={HEIGHT} />
          <line x1="0" y1="0" x2={WIDTH} y2={HEIGHT} />
          <line x1="0" y1={HEIGHT} x2={WIDTH} y2="0" />
          <text
            x={TEXT_X}
            y={TEXT_Y}
            class="small"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {UNITTYPE}
          </text>
        </g>
      </svg>
    </div>
  );
};

export default BaseUnit;
