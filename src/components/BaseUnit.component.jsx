import React from "react";
import { useState, useEffect } from "react";

const UNIT_HEIGHT = 50;
const UNIT_WIDTH = 100;
const BAR_HEIGHT = 10;

const UnitStatus = ({ healthData }) => {
  console.log("healthData:", healthData);
  const HP = healthData && healthData.current / healthData.maximum;

  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <g name="UnitStatus">
        <rect width={UNIT_WIDTH} height={BAR_HEIGHT} y={UNIT_HEIGHT}></rect>
        <rect
          width={UNIT_WIDTH * HP}
          height={BAR_HEIGHT}
          y={UNIT_HEIGHT}
          fill="green"
        />
      </g>
    </svg>
  );
};

const BaseUnit = ({ id }) => {
  const [data, setData] = useState(null);

  useEffect(() => pullHealthData(), []);

  const pullHealthData = () => {
    fetch(`http://localhost:8080/troop/get?id=${id}`)
      .then(x => x.json())
      .then(x => setData(x));
  };

  return (
    <svg xmlns="http://www.w3.org/2000/svg">
      <g name="BaseUnit" stroke="black" fill="white" strokeWidth="1pt">
        <rect width={UNIT_WIDTH} height={UNIT_HEIGHT} />
        <line x1="0" y1="0" x2={UNIT_WIDTH} y2={UNIT_HEIGHT} />
        <line x1="0" y1={UNIT_HEIGHT} x2={UNIT_WIDTH} y2="0" />
        <UnitStatus healthData={data && data.health} />
      </g>
    </svg>
  );
};

export default BaseUnit;
