import { radarData } from "./RadarData";
import { useState } from "react";

const width = 1048;
const height = 800;
// const border = sizeX / 2;

const ringSize = 110;
const centerOffset = 60;

const ringsCfg = radarData.rings;
const radii = ringsCfg.map(ring => ring.radiusMultiplier * ringSize);

const quadrantSepSize = 30;
const quadrantBorderSize = quadrantSepSize/2;

const quadrants = [
    { radialMin: -1, radialMax: -0.5, factorX: -1, factorY: -1 }, 
    { radialMin: -0.5, radialMax: 0, factorX: 1, factorY: -1 },
    { radialMin: 0.5, radialMax: 1, factorX: -1, factorY: 1 }, 
    { radialMin: 0, radialMax: 0.5, factorX: 1, factorY: 1 }, 
]

// Reproducible random sequence 
// source: https://stackoverflow.com/questions/521295Q
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

// Grid-based placement with jitter for better distribution
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

        this.tSteps = 8; // Angular divisions
        this.rSteps = 4; // Radial divisions

        this.initializeGrid(this.tSteps, this.rSteps);
    }
    
    initializeGrid(tSteps, rSteps) {
        // Create a grid of cells in polar coordinates
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
        
        // Shuffle grid cells for randomness
        for (let i = this.gridCells.length - 1; i > 0; i--) {
            const j = Math.floor(Random() * (i + 1));
            [this.gridCells[i], this.gridCells[j]] = [this.gridCells[j], this.gridCells[i]];
        }
    }
    
    getNextPoint() {
        // Find the first unused cell
        for (let cell of this.gridCells) {
            if (!this.usedCells.has(cell.key)) {
                this.usedCells.add(cell.key);
                
                // Add jitter to the cell position
                const jitterAmount = 0.3;
                const jitterT = RandomBetween(
                    this.polarMin.t + (this.polarMax.t - this.polarMin.t) * (this.gridCells.indexOf(cell) % this.tSteps) / this.tSteps,
                    this.polarMin.t + (this.polarMax.t - this.polarMin.t) * ((this.gridCells.indexOf(cell) % this.tSteps) + 1) / this.tSteps
                );
                const jitterR = RandomBetween(
                    cell.polarCoord.r - jitterAmount * (this.polarMax.r - this.polarMin.r) / this.rSteps,
                    cell.polarCoord.r + jitterAmount * (this.polarMax.r - this.polarMin.r) / this.rSteps
                );
                
                let point = Cartesian({ t: jitterT, r: jitterR });
                
                // Constrain to segment bounds
                return {
                    x: BoundedInterval(point.x, this.cartesianMin.x, this.cartesianMax.x),
                    y: BoundedInterval(point.y, this.cartesianMin.y, this.cartesianMax.y)
                };
            }
        }
        
        // Fallback: if all cells are used, generate random point
        return Cartesian({
            t: RandomBetween(this.polarMin.t, this.polarMax.t),
            r: NormalBetween(this.polarMin.r, this.polarMax.r)
        });
    }
}

// Global storage for grid helpers per segment
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
        r: ring === 0 ? centerOffset/2 : radii[ring - 1]
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
    
    // Create grid helper if it doesn't exist
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
    return (
        <circle
            key={idx}
            className="radar-blip"
            cx={x}
            cy={y}
            r="5"
            fill={color}
            onMouseEnter={() => onTooltipShow({name, x, y})}
            onMouseLeave={() => onTooltipHide()}
        />
    );
}

const RadarSVG = ({blips, rings, quadrants}) => {
    const [tooltip, setTooltip] = useState(null);

    const radius = rings.length * ringSize;

    const handleTooltipShow = (data) => {
        setTooltip(data);
    };

    const handleTooltipHide = () => {
        setTooltip(null);
    };

    return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="radar-svg">
                <g transform={`translate(${width/2},${height/2})scale(1)`}>
                    {/* Background */}
                    <rect
                        key="radar-background"
                        className="radar-background"
                        width={width}
                        height={height}
                    />
                    {/* Draw rings */}
                    {
                        rings.map((ring, i) => (
                            <circle
                                key={`radar-ring-${i}`}
                                className="radar-ring"
                                r={ring.radius}
                            />
                    ))}
                    {/* Draw quadrants */}
                    {
                        quadrants.map((quadrant, i) => (
                            <g key={`radar-quadrant-group-${i}`}>
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
                        rings.map((ring, i) => (
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
                                ring={blip.ring}
                                name={blip.name}
                                color={quadrants[blip.quadrant].color}
                                idx={idx}
                                quadrant={blip.quadrant}
                                onTooltipShow={handleTooltipShow}
                                onTooltipHide={handleTooltipHide}
                                x={blip.x}
                                y={blip.y}
                            />
                        );
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
    )
};

export default function Radar() {
    // checkout: https://opensource.zalando.com/tech-radar/# + https://www.thoughtworks.com/radar
    // Try svg tooltip: www.npmjs.com/package/react-svg-tooltip
    
    const { quadrants, rings, blips } = radarData;
    
    blips.forEach((blip, idx) => {
        const segment = Segment(blip.quadrant, blip.ring);
        const point = segment.randomPoint();
        blip.x = point.x;
        blip.y = point.y;
    });

    rings.forEach((ring, i) => {
        ring.radius = ring.radiusMultiplier * ringSize;
        ring.labelX = (i==0 ? (ring.radiusMultiplier/2 * ringSize) : (rings[i-1].radiusMultiplier + 0.4) * ringSize);
        ring.labelY = quadrantSepSize/2 - 16/2;
    });

    quadrants.forEach((quadrant, i) => {
        quadrant.x = (i % 2 === 0 ? -(width/2) + 50 : (width/2) - 50);
        quadrant.y = (i < 2 ? -(height/2) + 50 : (height/2) - 50);
    });

    return (
        <div className="content-container">
            <RadarSVG 
                blips={blips} 
                rings={rings} 
                quadrants={quadrants} 
            />
            
        </div>
    );
    
}