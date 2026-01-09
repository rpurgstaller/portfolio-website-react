import { radarData } from "./RadarData";

const size = 1000;
const border = size / 2;

const ringSize = 140;
const centerOffset = 60;

const ringsCfg = radarData.rings;
const radii = ringsCfg.map(ring => ring.radius * ringSize);


const quadrants = [
    { radialMin: -1, radialMax: -0.5, factorX: -1, factorY: -1 }, //2
    { radialMin: -0.5, radialMax: 0, factorX: 1, factorY: -1 },
    { radialMin: 0.5, radialMax: 1, factorX: -1, factorY: 1 }, //0
    { radialMin: 0, radialMax: 0.5, factorX: 1, factorY: 1 }, //3
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
        r: ring === 0 ? 30 : radii[ring - 1]
    };
    var polarMax = {
        t: quadrants[quadrant].radialMax * Math.PI,
        r: radii[ring]
    };
    var cartesianMin = {
        x: 15 * quadrants[quadrant].factorX,
        y: 15 * quadrants[quadrant].factorY
    };
    var cartesianMax = {
        x: radii[2] * quadrants[quadrant].factorX,
        y: radii[2] * quadrants[quadrant].factorY
    };
    console.log({cartesianMin, cartesianMax});
    return {
        ClipX: function(d) {
            var c = BoundedBox(d, cartesianMin, cartesianMax);
            var p = BoundedRing(Polar(c), polarMin.r + 15, polarMax.r - 15);
            d.x = Cartesian(p).x; // adjust data too!
            return d.x;
        },
        ClipY: function(d) {
            var c = BoundedBox(d, cartesianMin, cartesianMax);
            var p = BoundedRing(Polar(c), polarMin.r + 15, polarMax.r - 15);
            d.y = Cartesian(p).y; // adjust data too!
            return d.y;
        },
        Rand: function() {
            return Cartesian({
                t: RandomBetween(polarMin.t, polarMax.t),
                r: NormalBetween(polarMin.r, polarMax.r)
            });
        }
    }
}


function BoundedInterval(value, min, max) {
    var low = Math.min(min, max);
    var high = Math.max(min, max);
    return Math.min(Math.max(value, low), high);
}

function BoundedRing(polar, r_min, r_max) {
    return {
        t: polar.t,
        r: BoundedInterval(polar.r, r_min, r_max)
    }
}

function BoundedBox(point, min, max) {
    return {
        x: BoundedInterval(point.x, min.x, max.x),
        y: BoundedInterval(point.y, min.y, max.y)
    }
}


const CustomBlip = ({ ring, quadrant, name, color, idx }) => {
    let segment = Segment(quadrant, ring);

    let point = segment.Rand();

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

    const quadrantSepSize = 40;
    const cSepSize = quadrantSepSize/2;

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
                            <rect key="x1" x={-border} y={-cSepSize} width={size} height={quadrantSepSize} fill={backgroundColor} />
                            <rect key="x2" x={-cSepSize} y={-border} width={quadrantSepSize} height={size} fill={backgroundColor} />
                            
                            <line key="y1" x1={-cSepSize} y1={-cSepSize} x2={-radius} y2={-cSepSize} stroke={lineStroke}/>
                            <line key="y2" x1={cSepSize} y1={-cSepSize} x2={radius} y2={-cSepSize} stroke={lineStroke}/>
                            <line key="y3" x1={-cSepSize} y1={cSepSize} x2={-radius} y2={cSepSize} stroke={lineStroke}/>
                            <line key="y4" x1={cSepSize} y1={cSepSize} x2={radius} y2={cSepSize} stroke={lineStroke}/>

                            <line key="z1" x1={-cSepSize} y1={-cSepSize} x2={-cSepSize} y2={-radius} stroke={lineStroke}/>
                            <line key="z2" x1={cSepSize} y1={-cSepSize} x2={cSepSize} y2={-radius} stroke={lineStroke}/>
                            <line key="z3" x1={-cSepSize} y1={cSepSize} x2={-cSepSize} y2={radius} stroke={lineStroke}/>
                            <line key="z4" x1={cSepSize} y1={cSepSize} x2={cSepSize} y2={radius} stroke={lineStroke}/>
                        </g>     
                    }
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