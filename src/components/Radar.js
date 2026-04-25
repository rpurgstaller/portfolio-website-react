import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadarSVG } from "./RadarSVG";
import { radarData } from "./RadarData";

const QUADRANT_PATHS = {
    0: "/radar/techniques",
    1: "/radar/tools",
    2: "/radar/resources",
    3: "/radar/languages-frameworks"
};

const width = 1048;
const height = 700;
const ringSize = 110;
const blipRadius = 8.5;
const quadrantSepSize = 30;

export default function Radar() {
    const navigate = useNavigate();
    const { quadrants, rings, blips } = radarData;
    const [showGrid, setShowGrid] = useState(false);

    return (
        <div className="content-container">
            <div className="radar-description">
                <h1>Technology Radar</h1>
                
                <p>
                    This technology radar is a visual representation of the tools, techniques, languages, and resources 
                    I'm currently using, exploring, or evaluating in my professional work. It's inspired by the 
                    <a href="https://www.thoughtworks.com/radar" target="_blank" rel="noopener noreferrer"> Thoughtworks Technology Radar</a> and 
                    <a href="https://opensource.zalando.com/tech-radar/" target="_blank" rel="noopener noreferrer"> Zalando's Tech Radar</a>.
                </p>
                <p>I use it to have an overview of my technical landscape ... and because I think it looks really cool.</p>
            </div>

            <button 
                onClick={() => setShowGrid(!showGrid)}
                style={{
                    padding: '8px 16px',
                    marginBottom: '16px',
                    backgroundColor: showGrid ? '#333' : '#ddd',
                    color: showGrid ? '#fff' : '#000',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px'
                }}
            >
                {showGrid ? 'Hide Grid' : 'Show Grid'}
            </button>
            
            <RadarSVG 
                blips={blips} 
                rings={rings} 
                quadrants={quadrants}
                navigate={navigate}
                showGrid={showGrid}
                width={width}
                height={height}
                ringSize={ringSize}
                blipRadius={blipRadius}
                quadrantSepSize={quadrantSepSize}
            />
        </div>
    );
    
}