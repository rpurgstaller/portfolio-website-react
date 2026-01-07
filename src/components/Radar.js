import React from "react";
import { radarData } from "./RadarData";
import { color } from "d3";

export default function Radar() {
    // checkout: https://opensource.zalando.com/tech-radar/# + https://www.thoughtworks.com/radar
    const { quadrants, rings, blips } = radarData;

    const size = 1000;
    const center = size / 2;
    const backgroundColor = "#ffffffff";
    const lineStroke = "#ccc";

    const ringSize = 140;
    const radius = rings.length * ringSize;

    console.log(radius);

    const quadrantSepSize = 40;
    const quadrantSepSizeHalf = quadrantSepSize/2;

    return (
        <div className="content-container">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
            {/* Background */}
            <rect
                x="0"
                y="0"
                width={size}
                height={size}
                fill= {backgroundColor}
            />
            {/* Draw rings */}
            {rings.map((ring, i) => (
                <circle
                key={i}
                cx={center}
                cy={center}
                r={ring.radius * ringSize}
                fill="none"
                stroke={lineStroke}
                strokeWidth="1"
                />
            ))}
            {/* Draw quadrants */}
            {
                quadrants.map((quadrant, i) => (
                    <g key={i}>
                        {/* <path
                            d={`M${center},${center} L${center + (i % 2 === 0 ? 1 : -1) * 300},${center} A300,300 0 0,${i < 2 ? 0 : 1} ${center + (i % 2 === 0 ? -1 : 1) * 300},${center} Z`}
                            fill={quadrant.color}
                            opacity="0.1"
                        /> */}
                        <text
                            x={(i % 2 === 0 ? 50 : size -50)}
                            y={(i < 2 ? 50 : size-50)}
                            textAnchor={(i % 2 === 0 ? "start" : "end")}
                        >
                            {quadrant.name}
                        </text>
                    </g>
                ))
            }
            {/*separate quadrants*/}
            {
                <g>
                    <rect x="0" y={center-20} width={size} height="40" fill={backgroundColor} />
                    <rect x={center-20} y="0" width="40" height={size} fill={backgroundColor} />
                    
                    <line x1={center-20} y1={center-20} x2={center-radius} y2={center-20} stroke={lineStroke}/>
                    <line x1={center+20} y1={center-20} x2={center+radius} y2={center-20} stroke={lineStroke}/>
                    <line x1={center-20} y1={center+20} x2={center-radius} y2={center+20} stroke={lineStroke}/>
                    <line x1={center+20} y1={center+20} x2={center+radius} y2={center+20} stroke={lineStroke}/>

                    <line x1={center-20} y1={center-20} x2={center-20} y2={center-radius} stroke={lineStroke}/>
                    <line x1={center+20} y1={center-20} x2={center+20} y2={center-radius} stroke={lineStroke}/>
                    <line x1={center-20} y1={center+20} x2={center-20} y2={center+radius} stroke={lineStroke}/>
                    <line x1={center+20} y1={center+20} x2={center+20} y2={center+radius} stroke={lineStroke}/>
                </g>     
            }
            {/* Draw blips */}
            {blips.map((blip, i) => (
                <circle
                    key={i}
                    cx={center + (blip.quadrant % 2 === 0 ? 1 : -1) * blip.ring * 75}
                    cy={center + (blip.quadrant < 2 ? -1 : 1) * blip.ring * 75}
                    r="5"
                    fill={quadrants[blip.quadrant].color}
                />
            ))}
            </svg>
        </div>
    );
    
}