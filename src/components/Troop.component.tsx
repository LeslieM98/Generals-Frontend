import React from "react";

const UNIT_HEIGHT = 50;
const UNIT_WIDTH = 100;
const VIEW_CLASS = "BaseUnit_View";

export interface ITroopAPIResponse {
    id: {
        value: number
    }

    health: {
        maximum: number
        current: number
        dead: boolean
        alive: boolean
    }

    position: {
        x: number
        y: number
    }

    movementSpeed: {
        normal: number
        street: number
        difficultTerrain: number
    }

    combatRange: {
        close: number
        ranged: number
    }

    viewDistance: {
        normal: number
        disadvantaged: number
        advantaged: number
    }
}

interface TroopProps {
    data: ITroopAPIResponse
}

const Troop: React.FC<TroopProps> = ({ data }) => {
    const id = data.id.value
    const position = data.position
    const TRANSLATE: string = position && `translate(${position.x - UNIT_WIDTH / 2} ${position.y - UNIT_HEIGHT / 2})`

    console.log("Rendering Troop:", id)

    return (
        <svg>
            <g name="BaseUnit" className={VIEW_CLASS} stroke="black" fill="white" strokeWidth="1pt" transform={TRANSLATE}>
                <rect x={0} y={0} width={UNIT_WIDTH} height={UNIT_HEIGHT} />
                <line x1="0" y1="0" x2={UNIT_WIDTH} y2={UNIT_HEIGHT} />
                <line x1="0" y1={UNIT_HEIGHT} x2={UNIT_WIDTH} y2="0" />
            </g>
        </svg>
    );
}
export default Troop