import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RadarSVG } from "./RadarSVG";
import { radarData } from "./RadarData";
import { ExternalLinkRunningText } from "../utils/Link";

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
    let thoughtworksTechRadar = ExternalLinkRunningText("https://www.thoughtworks.com/radar", "Thoughtworks Technology Radar");

    return (
        <div className="content-container">
            <h1>Technology Radar</h1>
            <p>
                My technology radar is a visual representation of the tools, techniques, languages, and resources 
                I'm currently using, exploring, or evaluating. It's inspired by {thoughtworksTechRadar}.                    
            </p>

            <button 
                onClick={() => setShowGrid(!showGrid)}
                style={{
                    display: 'none'
                }}
            >
                {showGrid ? 'Hide Grid' : 'Show Grid'}
            </button>
            
            <div className="radar-container">   
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
            
        </div>
    );
    
}