import { radarData } from "./RadarData";
import { useState, useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "../styles/radar.scss";
import "../styles/radar-quadrant.scss";

// Import the positioning and grid logic from Radar
const width = 1048;
const height = 800;
const ringSize = 110;
const centerOffset = 60;
const quadrantSepSize = 30;
const quadrantBorderSize = quadrantSepSize / 2;

const ringsCfg = radarData.rings;
const radii = ringsCfg.map(ring => ring.radiusMultiplier * ringSize);

const quadrants = [
    { radialMin: -1, radialMax: -0.5, factorX: -1, factorY: -1 },
    { radialMin: -0.5, radialMax: 0, factorX: 1, factorY: -1 },
    { radialMin: 0.5, radialMax: 1, factorX: -1, factorY: 1 },
    { radialMin: 0, radialMax: 0.5, factorX: 1, factorY: 1 },
];

// Reproducible random sequence
var seed = 42;
function Random() {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
}

function RandomBetween(min, max) {
    return min + Random() * (max - min);
}

function NormalBetween(min, max) {
    return min + (Random() + Random()) * 0.5 * (max - min);
}

function BoundedInterval(value, min, max) {
    var low = Math.min(min, max);
    var high = Math.max(min, max);
    return Math.min(Math.max(value, low), high);
}

class GridPlacementHelper {
    constructor(quadrant, ring, polarMin, polarMax, cartesianMin, cartesianMax) {
        this.quadrant = quadrant;
        this.ring = ring;
        this.polarMin = polarMin;
        this.polarMax = polarMax;
        this.cartesianMin = cartesianMin;
        this.cartesianMax = cartesianMax;

        this.gridCells = [];
        this.usedCells = new Set();

        this.tSteps = 8;
        this.rSteps = 4;

        this.initializeGrid(this.tSteps, this.rSteps);
    }

    initializeGrid(tSteps, rSteps) {
        for (let i = 0; i < tSteps; i++) {
            for (let j = 0; j < rSteps; j++) {
                const t = this.polarMin.t + (this.polarMax.t - this.polarMin.t) * (i + 0.5) / tSteps;
                const r = this.polarMin.r + (this.polarMax.r - this.polarMin.r) * (j + 0.5) / rSteps;

                const cellKey = `${i}-${j}`;
                this.gridCells.push({
                    key: cellKey,
                    polarCoord: { t, r },
                    index: i * rSteps + j
                });
            }
        }

        for (let i = this.gridCells.length - 1; i > 0; i--) {
            const j = Math.floor(Random() * (i + 1));
            [this.gridCells[i], this.gridCells[j]] = [this.gridCells[j], this.gridCells[i]];
        }
    }

    getNextPoint() {
        for (let cell of this.gridCells) {
            if (!this.usedCells.has(cell.key)) {
                this.usedCells.add(cell.key);
                
                // Return exact grid cell center with no jitter
                return Cartesian(cell.polarCoord);
            }
        }

        // Fallback: should not reach here if grid is properly sized
        return Cartesian({
            t: RandomBetween(this.polarMin.t, this.polarMax.t),
            r: NormalBetween(this.polarMin.r, this.polarMax.r)
        });
    }
}

const gridHelpers = new Map();

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

function Segment(quadrant, ring) {
    var polarMin = {
        t: quadrants[quadrant].radialMin * Math.PI,
        r: ring === 0 ? centerOffset / 2 : radii[ring - 1]
    };
    var polarMax = {
        t: quadrants[quadrant].radialMax * Math.PI,
        r: radii[ring]
    };
    var cartesianMin = {
        x: (quadrantBorderSize + 10) * quadrants[quadrant].factorX,
        y: (quadrantBorderSize + 10) * quadrants[quadrant].factorY
    };
    var cartesianMax = {
        x: radii[2] * quadrants[quadrant].factorX,
        y: radii[2] * quadrants[quadrant].factorY
    };

    const segmentKey = `${quadrant}-${ring}`;

    if (!gridHelpers.has(segmentKey)) {
        gridHelpers.set(
            segmentKey,
            new GridPlacementHelper(quadrant, ring, polarMin, polarMax, cartesianMin, cartesianMax)
        );
    }

    const gridHelper = gridHelpers.get(segmentKey);

    return {
        randomPoint: function() {
            return gridHelper.getNextPoint();
        }
    }
}

const CustomBlip = ({ ring, quadrant, name, color, idx, onTooltipShow, onTooltipHide, x, y }) => {
    const blipNumber = idx + 1;
    return (
        <g
            onMouseEnter={() => onTooltipShow({ name, x, y })}
            onMouseLeave={() => onTooltipHide()}
        >
            <circle
                key={`blip-circle-${idx}`}
                className="radar-blip"
                cx={x}
                cy={y}
                r="12"
                fill={color}
            />
            <text
                key={`blip-number-${idx}`}
                className="radar-blip-number"
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
            >
                {blipNumber}
            </text>
        </g>
    );
}

const QuadrantSVG = ({ blips, rings, quadrants, quadrantIdx, showGrid }) => {
    const [tooltip, setTooltip] = useState(null);

    const radius = rings.length * ringSize;
    const quadrant = quadrants[quadrantIdx];

    const handleTooltipShow = (data) => {
        setTooltip(data);
    };

    const handleTooltipHide = () => {
        setTooltip(null);
    };

    // Generate grid visualization points for this quadrant's rings
    const gridPoints = [];
    for (let ring = 0; ring < rings.length; ring++) {
        const segment = Segment(quadrantIdx, ring);
        const gridHelper = gridHelpers.get(`${quadrantIdx}-${ring}`);
        if (gridHelper) {
            gridHelper.gridCells.forEach(cell => {
                const point = Cartesian(cell.polarCoord);
                gridPoints.push(point);
            });
        }
    }

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="radar-svg">
            <g transform={`translate(${width / 2},${height / 2})scale(1)`}>
                <rect
                    key="radar-background"
                    className="radar-background"
                    width={width}
                    height={height}
                />

                {/* Grid visualization */}
                {showGrid && gridPoints.map((point, idx) => (
                    <circle
                        key={`grid-point-${idx}`}
                        cx={point.x}
                        cy={point.y}
                        r="3"
                        fill="rgba(150, 150, 150, 0.3)"
                        pointerEvents="none"
                    />
                ))}

                {/* Single ring */}
                <circle
                    key={`radar-ring-0`}
                    className="radar-ring"
                    r={rings[0].radius}
                />
                <circle
                    key={`radar-ring-1`}
                    className="radar-ring"
                    r={rings[1].radius}
                />
                <circle
                    key={`radar-ring-2`}
                    className="radar-ring"
                    r={rings[2].radius}
                />

                {/* Single quadrant label */}
                <text
                    key={`radar-quadrant-label-${quadrantIdx}`}
                    className={`radar-quadrant-label quadrant-${quadrantIdx}`}
                    x={quadrant.x}
                    y={quadrant.y}
                    fill={quadrant.color}
                    fontSize="24"
                    fontWeight="bold"
                >
                    {quadrant.name}
                </text>

                {/* Ring labels */}
                {rings.map((ring, i) => (
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

                {/* Draw blips for this quadrant only */}
                {blips.map((blip, idx) => {
                    if (blip.quadrant === quadrantIdx) {
                        return (
                            <CustomBlip
                                key={`blip-${idx}`}
                                ring={blip.ring}
                                name={blip.name}
                                color={quadrant.color}
                                idx={idx}
                                quadrant={blip.quadrant}
                                onTooltipShow={handleTooltipShow}
                                onTooltipHide={handleTooltipHide}
                                x={blip.x}
                                y={blip.y}
                            />
                        );
                    }
                })}

                {/* Render tooltip */}
                {tooltip && (
                    <g key="radar-tooltip">
                        <rect
                            key="radar-tooltip-background"
                            className="radar-tooltip-background"
                            x={tooltip.x + 10}
                            y={tooltip.y - 20}
                            width={tooltip.name.length * 7 + 16}
                            height={24}
                        />
                        <text
                            key="radar-tooltip-text"
                            className="radar-tooltip"
                            x={tooltip.x + 18}
                            y={tooltip.y - 5}
                        >
                            {tooltip.name}
                        </text>
                    </g>
                )}
            </g>
        </svg>
    );
};

export default function RadarQuadrant({ quadrantIdx }) {
    const { quadrants, rings, blips } = radarData;
    const [searchParams] = useSearchParams();
    const highlightedBlipNumber = searchParams.get('blip');
    const highlightedRef = useRef(null);

    useEffect(() => {
        if (highlightedRef.current) {
            highlightedRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, [highlightedBlipNumber]);

    const quadrantBlips = blips
        .filter(blip => blip.quadrant === quadrantIdx)
        .sort((a, b) => a.ring - b.ring);

    return (
        <div className="content-container">
            <Link to="/radar" className="back-link">← Back to Radar</Link>
            <h2 style={{ color: quadrants[quadrantIdx].color }}>{quadrants[quadrantIdx].name}</h2>
            <div className="quadrant-detail">
                <div className="quadrant-items">
                    {quadrantBlips.map((blip) => {
                        const blipNumber = blips.indexOf(blip) + 1;
                        const isHighlighted = highlightedBlipNumber && parseInt(highlightedBlipNumber) === blipNumber;
                        return (
                            <div 
                                key={`blip-${blipNumber}`} 
                                ref={isHighlighted ? highlightedRef : null}
                                className={`quadrant-item ${isHighlighted ? 'highlighted' : ''}`}
                                style={isHighlighted ? { borderColor: quadrants[quadrantIdx].color } : {}}
                            >
                                <div className="item-header">
                                    <span className="item-number">{blipNumber}</span>
                                    <span className="item-name">{blip.name}</span>
                                    <span className="item-ring" style={{ backgroundColor: quadrants[quadrantIdx].color }}>
                                        {rings[blip.ring].name}
                                    </span>
                                </div>
                                <p className="item-description">
                                    {blip.description && blip.description.trim() ? blip.description : "Coming soon"}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
