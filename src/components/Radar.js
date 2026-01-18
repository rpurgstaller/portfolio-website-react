import { radarData } from "./RadarData";

const size = 1000;
const border = size / 2;

const ringSize = 140;
const centerOffset = 60;

const ringsCfg = radarData.rings;
const radii = ringsCfg.map(ring => ring.radius * ringSize);

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

const CustomBlip = ({ ring, quadrant, name, color, idx }) => {
    let segment = Segment(quadrant, ring);

    let point = segment.randomPoint();

    let x = point.x;
    let y = point.y;

    console.log({name, quadrant, ring, x, y});
    return (
        <circle
            key={idx}
            cx={x}
            cy={y}
            r="5"
            fill={color}
        >
            <title>{name}</title>
        </circle>
    );
}

export default function Radar() {
    // checkout: https://opensource.zalando.com/tech-radar/# + https://www.thoughtworks.com/radar
    // Try svg tooltip: www.npmjs.com/package/react-svg-tooltip
    const { quadrants, rings, blips } = radarData;
    
    const backgroundColor = "#ffffffff";
    const lineStroke = "#ccc";

    const radius = rings.length * ringSize;

    return (
        <div className="content-container">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <g transform={`translate(${border},${border})scale(1)`}>
                    {/* Background */}
                    <rect
                        key="background"
                        x="0"
                        y="0"
                        width={size}
                        height={size}
                        fill= {backgroundColor}
                    />
                    {/* Draw rings */}
                    {
                        rings.map((ring, i) => (
                            <circle
                                key={i}
                                cx="0"
                                cy="0"
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
                                    key={"t"+i}
                                    x={(i % 2 === 0 ? -border+50 : border-50)}
                                    y={(i < 2 ? -border+50 : border-50)}
                                    textAnchor={(i % 2 === 0 ? "start" : "end")}
                                    fill={quadrant.color}
                                >
                                    {quadrant.name}
                                </text>
                            </g>
                        ))
                    }
                    {/*separate quadrants*/}
                    {
                        <g>
                            <rect key="x1" x={-border} y={-quadrantBorderSize} width={size} height={quadrantSepSize} fill={backgroundColor} />
                            <rect key="x2" x={-quadrantBorderSize} y={-border} width={quadrantSepSize} height={size} fill={backgroundColor} />
                            
                            <line key="y1" x1={-quadrantBorderSize} y1={-quadrantBorderSize} x2={-radius} y2={-quadrantBorderSize} stroke={lineStroke}/>
                            <line key="y2" x1={quadrantBorderSize} y1={-quadrantBorderSize} x2={radius} y2={-quadrantBorderSize} stroke={lineStroke}/>
                            <line key="y3" x1={-quadrantBorderSize} y1={quadrantBorderSize} x2={-radius} y2={quadrantBorderSize} stroke={lineStroke}/>
                            <line key="y4" x1={quadrantBorderSize} y1={quadrantBorderSize} x2={radius} y2={quadrantBorderSize} stroke={lineStroke}/>

                            <line key="z1" x1={-quadrantBorderSize} y1={-quadrantBorderSize} x2={-quadrantBorderSize} y2={-radius} stroke={lineStroke}/>
                            <line key="z2" x1={quadrantBorderSize} y1={-quadrantBorderSize} x2={quadrantBorderSize} y2={-radius} stroke={lineStroke}/>
                            <line key="z3" x1={-quadrantBorderSize} y1={quadrantBorderSize} x2={-quadrantBorderSize} y2={radius} stroke={lineStroke}/>
                            <line key="z4" x1={quadrantBorderSize} y1={quadrantBorderSize} x2={quadrantBorderSize} y2={radius} stroke={lineStroke}/>
                        </g>     
                    }
                    {/* Label rings} */}
                    {
                        rings.map((ring, i) => (
                            <g>
                                <text
                                    key={"ring_txt_-"+i}
                                    x={(i==0 ? (ring.radius/2 * ringSize) * -1 : (rings[i-1].radius + 0.4) * ringSize * -1)}
                                    y={quadrantSepSize/2 - 16/2}
                                    textAnchor="middle"
                                    fill={"#0d161f"}
                                    fontSize="16px"
                                >
                                    {ring.name}
                                </text>
                                <text
                                    key={"ring_txt_"+i}
                                    x={(i==0 ? (ring.radius/2 * ringSize) : (rings[i-1].radius + 0.4) * ringSize)}
                                    y={quadrantSepSize/2 - 16/2}
                                    textAnchor="middle"
                                    fill={"#0d161f"}
                                >
                                    {ring.name}
                                </text>
                                
                            </g>
                    ))}
                    {/* Draw blips */}
                    {blips.map((blip, idx) => (
                        <CustomBlip  
                            ring={blip.ring}
                            name={blip.name}
                            color={quadrants[blip.quadrant].color}
                            idx={idx}
                            quadrant={blip.quadrant}
                        />
                    ))}
                </g>
            </svg>
        </div>
    );
    
}