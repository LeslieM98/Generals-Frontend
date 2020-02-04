import React from "react";

const UnitStatus = props => {
  var healthPercentage = props.currentHealth / props.maxHealth;

  const SCALE = props.scale === undefined ? 1 : props.scale;
  const WIDTH = 100 * SCALE;
  const HEIGHT = 10 * SCALE;

  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <g name="UnitStatus">
        <rect width={WIDTH} height={HEIGHT} y={props.y}></rect>
        <rect
          width={WIDTH * healthPercentage}
          height={HEIGHT}
          fill="green"
          y={props.y}
        />
      </g>
    </svg>
  );
};

const BaseUnit = props => {
  const WIDTH = 100;
  const HEIGHT = 50;

  const UNITTYPE = props.type ? "" : props.type;
  const TEXT_X = (WIDTH / 6) * 5;
  const TEXT_Y = HEIGHT / 2;

  return (
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
        <UnitStatus y={HEIGHT} currentHealth="4" maxHealth="9" />
      </g>
    </svg>
  );
};

export default BaseUnit;
