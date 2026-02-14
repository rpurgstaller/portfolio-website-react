import { useState } from "react";
import { shuffleWithSeed } from "../utils/ArrayUtils";

const quadrants = [
    { radialMin: -1, radialMax: -0.5, factorX: -1, factorY: -1 }, 
    { radialMin: -0.5, radialMax: 0, factorX: 1, factorY: -1 },
    { radialMin: 0.5, radialMax: 1, factorX: -1, factorY: 1 }, 
    { radialMin: 0, radialMax: 0.5, factorX: 1, factorY: 1 }, 
]

const QUADRANT_PATHS = {
    0: "/radar/techniques",
    1: "/radar/tools",
    2: "/radar/resources",
    3: "/radar/languages-frameworks"
};

function Polar(cartesian) {
    var x = cartesian.x;
    var y = cartesian.y;
    return {
        t: Math.atan2(y, x),
        r: Math.sqrt(x * x + y * y)
    }
}

function Cartesian(polar) {
    return {
        x: polar.r * Math.cos(polar.t),
        y: polar.r * Math.sin(polar.t)
    }
}

class RadarHandler {
    constructor(blips, quadrants, rings, ringSize, width, height, quadrantSepSize) {
        this.blips = blips;
        this.quadrants = quadrants;
        this.rings = rings;
        this.width = width;
        this.height = height;
        this.quadrantSepSize = quadrantSepSize;
        this.quadrantBorderSize = quadrantSepSize/2;

        this.ringSize = ringSize;

        this.radii = rings.map(ring => ring.radiusMultiplier * ringSize);

        this.initializeQuadrants();
        this.initializeRings();
        this.initializeSegments();
        this.initializeBlips();
    }

    initializeBlips() {
        this.blips.forEach((blip, idx) => {
            const point = this.getSegment(blip.quadrant, blip.ring).getNextRandomPoint();
            blip.x = point.x;
            blip.y = point.y;
        });
    }

    initializeRings() {
        this.rings.forEach((ring, i) => {
            ring.radius = ring.radiusMultiplier * this.ringSize;
            ring.labelX = (i==0 ? (ring.radiusMultiplier/2 * this.ringSize) : (this.rings[i-1].radiusMultiplier + 0.4) * this.ringSize);
            ring.labelY = this.quadrantSepSize/2 - 8;
        });
        console.log(this.rings);
    }

    initializeQuadrants() {
        this.quadrants.forEach((quadrant, i) => {
            quadrant.x = (i % 2 === 0 ? -(this.width/2) + 50 : (this.width/2) - 50);
            quadrant.y = (i < 2 ? -(this.height/2) + 50 : (this.height/2) - 50);
        });
    }

    initializeSegments() {
        this.segments = new Map();
        for (let quadrantIdx = 0; quadrantIdx < this.quadrants.length; quadrantIdx++) {
            for (let ringIdx = 0; ringIdx < this.rings.length; ringIdx++) {
                const segmentKey = `${quadrantIdx}-${ringIdx}`;
                this.segments.set(
                    segmentKey, 
                    new SegmentHandler(quadrantIdx, ringIdx, this.radii, this.quadrantBorderSize)
                );
            }
        }
    }

    getSegment(quadrantIdx, ringIdx) {
        if (!this.segments) {
            throw new Error("Segments not initialized. Call initializeSegments() first.");
        }

        const segmentKey = `${quadrantIdx}-${ringIdx}`;
        return this.segments.get(segmentKey);
    }

    getCartesianGridPoints() {
        const gridPoints = [];
        for (let quadrantIdx = 0; quadrantIdx < this.quadrants.length; quadrantIdx++) {
            for (let ringIdx = 0; ringIdx < this.rings.length; ringIdx++) {
                this.getSegment(quadrantIdx, ringIdx).gridCells.forEach(cell => {
                    const point = Cartesian(cell.polarCoord);
                    gridPoints.push({
                        ...cell.cartesianCoord,
                        quadrantIdx,
                        ringIdx
                    });
                });
            }
        }
        return gridPoints;
    }
}

class SegmentHandler {
    constructor(quadrantIdx, ringIdx, radii, quadrantBorderSize) {
        this.quadrantIdx = quadrantIdx;
        this.ringIdx = ringIdx;
        this.quadrantBorderSize = quadrantBorderSize;

        this.gridCells = [];
        this.nextRandPointIdx = 0;

        this.tSteps = ringIdx+1; // Angular divisions
        this.rSteps = 4; // Radial divisions

        this.radialOffsetMin = 20;
        this.radialOffsetMax = 30;

        this.radii = radii;

        this.initializeBounds(quadrantIdx, ringIdx);
        this.initializeGrid(this.tSteps, this.rSteps);
    }

    initializeBounds(quadrantIdx, ringIdx) {
        this.polarMin = {
            t: quadrants[quadrantIdx].radialMin * Math.PI,
            r: ringIdx === 0 ? this.radialOffsetMin : this.radii[ringIdx - 1] - this.radialOffsetMin
        };
        this.polarMax = {
            t: quadrants[quadrantIdx].radialMax * Math.PI,
            r: this.radii[ringIdx] - this.radialOffsetMax
        };
        this.cartesianMin = {
            x: (this.quadrantBorderSize + 20) * quadrants[quadrantIdx].factorX,
            y: (this.quadrantBorderSize + 20) * quadrants[quadrantIdx].factorY
        };
        this.cartesianMax = {
            x: this.radii[2] * quadrants[quadrantIdx].factorX,
            y: this.radii[2] * quadrants[quadrantIdx].factorY
        };
    }

    initializeGrid(tSteps, rSteps) {
        // Create a grid of cells in polar coordinates
        for (let i = 0; i < rSteps; i++) {
            const r = this.polarMin.r + (this.polarMax.r - this.polarMin.r) * (i + 0.5) / rSteps;
            let tStepsForRing = tSteps + Math.floor(((i+1) * 1.5)) + this.ringIdx*2;
            for (let j = 0; j < tStepsForRing; j++) {
                const t = this.polarMin.t + (this.polarMax.t - this.polarMin.t) * (j + 0.5) / tStepsForRing;
                
                const cartesian = Cartesian({ t, r });
                cartesian.x = cartesian.x + (this.radialOffsetMin * quadrants[this.quadrantIdx].factorX);
                cartesian.y = cartesian.y + (this.radialOffsetMin * quadrants[this.quadrantIdx].factorY);

                const polar = Polar(cartesian);

                const cellKey = `${i}-${j}`;
                this.gridCells.push({
                    key: cellKey,
                    polarCoord: polar,
                    cartesianCoord: cartesian,
                    index: i * tSteps + j
                });
            }
        }

        this.gridCellsShuffed = shuffleWithSeed(this.gridCells, 42);
    }

    getNextRandomPoint() {
        if (this.nextRandPointIdx >= this.gridCellsShuffed.length) {
            throw new Error(`No more available points in segment ${this.quadrantIdx}-${this.ringIdx}`);
        }
        return this.gridCellsShuffed[this.nextRandPointIdx++].cartesianCoord;
    }
}


const CustomBlip = ({ blipRadius, name, description, color, idx, onTooltipShow, onTooltipHide, onClick, x, y }) => {
    const blipNumber = idx + 1;
    return (
        <g
            onMouseEnter={() => onTooltipShow({name, description, x, y})}
            onMouseLeave={() => onTooltipHide()}
            onClick={() => onClick(idx)}
        >
            <circle
                key={`blip-circle-${idx}`}
                className="radar-blip"
                cx={x}
                cy={y}
                r={blipRadius}
                fill={color}
            />
            <text
                key={`blip-number-${idx}`}
                className="radar-blip-number"
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="central"
            >
                {blipNumber}
            </text>
        </g>
    );
}

export const RadarSVG = ({blips, rings, quadrants, navigate, showGrid, width, height, ringSize, blipRadius, quadrantSepSize}) => {
    const [tooltip, setTooltip] = useState(null);

    const radarHandler = new RadarHandler(blips, quadrants, rings, ringSize, width, height, quadrantSepSize);
    const gridPoints = radarHandler.getCartesianGridPoints();

    const quadrantBorderSize = radarHandler.quadrantBorderSize;

    quadrants = radarHandler.quadrants;

    const radius = rings.length * ringSize;

    const handleTooltipShow = (data) => {
        setTooltip(data);
    };

    const handleTooltipHide = () => {
        setTooltip(null);
    };

    const handleQuadrantClick = (quadrantIdx, blipIdx = null) => {
        if (navigate && QUADRANT_PATHS[quadrantIdx]) {
            const path = QUADRANT_PATHS[quadrantIdx];
            const fullPath = blipIdx !== null ? `${path}?blip=${blipIdx + 1}` : path;
            navigate(fullPath);
        }
    };

    return (
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="radar-svg">
                <g transform={`translate(${width/2},${height/2})scale(1)`}>
                    {/* Background */}
                    <rect
                        key="radar-background"
                        className="radar-background"
                        width={width}
                        height={height}
                    />

                    {/* Grid visualization */}
                    {showGrid && gridPoints.map((point, idx) => {
                        const quadrantColor = quadrants[point.quadrantIdx].color;
                        const ringOpacity = 0.1 + (point.ringIdx * 0.4); // Vary opacity by ring
                        return (
                            <circle
                                key={`grid-point-${idx}`}
                                cx={point.x}
                                cy={point.y}
                                r={blipRadius}
                                fill={quadrantColor}
                                opacity={ringOpacity}
                                pointerEvents="none"
                            />
                        );
                    })}
                    {/* Draw rings */}
                    {
                        radarHandler.rings.map((ring, i) => (
                            <circle
                                key={`radar-ring-${i}`}
                                className="radar-ring"
                                r={ring.radiusMultiplier * ringSize}
                            />
                    ))}
                    {/* Draw quadrants */}
                    {
                        quadrants.map((quadrant, i) => (
                            <g 
                                key={`radar-quadrant-group-${i}`}
                                onClick={() => handleQuadrantClick(i)}
                                style={{ cursor: "pointer" }}
                            >
                                <text
                                    key={`radar-quadrant-label-${i}`}
                                    className={`radar-quadrant-label quadrant-${i}`}
                                    x={quadrant.x}
                                    y={quadrant.y}
                                    fill={quadrant.color}
                                >
                                    {quadrant.name}
                                </text>
                            </g>
                        ))
                    }
                    {/*separate quadrants*/}
                    {
                        <g key="radar-separators">
                            <rect key="radar-separator-rect-0" className="radar-quadrant-separator" x={-width/2} y={-quadrantBorderSize} width={width} height={quadrantSepSize} />
                            <rect key="radar-separator-rect-1" className="radar-quadrant-separator" x={-quadrantBorderSize} y={-height/2} width={quadrantSepSize} height={height} />
                            
                            <line key="radar-separator-line-0" className="radar-separator-line" x1={-quadrantBorderSize} y1={-quadrantBorderSize} x2={-radius} y2={-quadrantBorderSize} />
                            <line key="radar-separator-line-1" className="radar-separator-line" x1={quadrantBorderSize} y1={-quadrantBorderSize} x2={radius} y2={-quadrantBorderSize} />
                            <line key="radar-separator-line-2" className="radar-separator-line" x1={-quadrantBorderSize} y1={quadrantBorderSize} x2={-radius} y2={quadrantBorderSize} />
                            <line key="radar-separator-line-3" className="radar-separator-line" x1={quadrantBorderSize} y1={quadrantBorderSize} x2={radius} y2={quadrantBorderSize} />

                            <line key="radar-separator-line-4" className="radar-separator-line" x1={-quadrantBorderSize} y1={-quadrantBorderSize} x2={-quadrantBorderSize} y2={-radius} />
                            <line key="radar-separator-line-5" className="radar-separator-line" x1={quadrantBorderSize} y1={-quadrantBorderSize} x2={quadrantBorderSize} y2={-radius} />
                            <line key="radar-separator-line-6" className="radar-separator-line" x1={-quadrantBorderSize} y1={quadrantBorderSize} x2={-quadrantBorderSize} y2={radius} />
                            <line key="radar-separator-line-7" className="radar-separator-line" x1={quadrantBorderSize} y1={quadrantBorderSize} x2={quadrantBorderSize} y2={radius} />
                        </g>
                    }
                    {/* Label rings} */}
                    {
                        radarHandler.rings.map((ring, i) => (
                            <g key={`radar-ring-labels-${i}`}>
                                <text
                                    key={`radar-ring-label-left-${i}`}
                                    className="radar-ring-label"
                                    x={ring.labelX * -1}
                                    y={ring.labelY}
                                >
                                    {ring.name}
                                </text>
                                <text
                                    key={`radar-ring-label-right-${i}`}
                                    className="radar-ring-label"
                                    x={ring.labelX}
                                    y={ring.labelY}
                                >
                                    {ring.name}
                                </text>
                                
                            </g>
                    ))}
                    {/* Draw blips */}
                    {blips.map((blip, idx) => {
                        return (
                            <CustomBlip  
                                blipRadius={blipRadius}
                                ring={blip.ring}
                                name={blip.name}
                                description={blip.description}
                                color={quadrants[blip.quadrant].color}
                                idx={idx}
                                quadrant={blip.quadrant}
                                onTooltipShow={handleTooltipShow}
                                onTooltipHide={handleTooltipHide}
                                onClick={() => handleQuadrantClick(blip.quadrant, idx)}
                                x={blip.x}
                                y={blip.y}
                            />
                        );
                    })}
                    {/* Render tooltip */}
                    {tooltip && (
                        <g key="radar-tooltip">
                            <polygon
                                key="radar-tooltip-pointer"
                                className="radar-tooltip-background"
                                points={`${tooltip.x},${tooltip.y - 10} ${tooltip.x - 6},${tooltip.y - 16} ${tooltip.x + 6},${tooltip.y - 16}`}
                            />
                            <rect
                                key="radar-tooltip-background"
                                className="radar-tooltip-background"
                                x={tooltip.x - (tooltip.name.length * 7 + 16)/2}
                                y={tooltip.y - 40}
                                width={tooltip.name.length * 7 + 16}
                                height={24}
                            />
                            <text
                                key="radar-tooltip-text"
                                className="radar-tooltip"
                                x={tooltip.x}
                                y={tooltip.y - 27}
                                textAnchor="middle"
                                dominantBaseline="middle"
                            >
                                {tooltip.name}
                            </text>
                        </g>
                    )}
                </g>
            </svg>
        </div>
    )
};

