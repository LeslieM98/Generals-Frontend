import React from "react";
import Axios from "axios";

const UNIT_HEIGHT = 50;
const UNIT_WIDTH = 100;
const BAR_HEIGHT = 10;

const UnitStatus = ({ current, maximum }) => {
  const healthPercentage = current / maximum;

  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <g name="UnitStatus">
        <rect width={UNIT_WIDTH} height={BAR_HEIGHT} y={UNIT_HEIGHT}></rect>
        <rect
          width={UNIT_WIDTH * healthPercentage}
          height={BAR_HEIGHT}
          y={UNIT_HEIGHT}
          fill="green"
        />
      </g>
    </svg>
  );
};

const BaseUnit = ({ id, color }) => {
  const fetchStatus = () => {
    var result;
    Axios.get(`http://localhost:8080/troop/get?id=${id}`)
      .then(x => (result = x))
      .catch(x => console.log(`Error while fetching state for id=${id}`, x));
    return result;
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <g name="BaseUnit" stroke="black" fill="white" strokeWidth="1pt">
        <rect width={UNIT_WIDTH} height={UNIT_HEIGHT} />
        <line x1="0" y1="0" x2={UNIT_WIDTH} y2={UNIT_HEIGHT} />
        <line x1="0" y1={UNIT_HEIGHT} x2={UNIT_WIDTH} y2="0" />
        <UnitStatus current="9" maximum="10" />
      </g>
    </svg>
  );
};

export default BaseUnit;
