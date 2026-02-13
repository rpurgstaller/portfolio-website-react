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
    // checkout: https://opensource.zalando.com/tech-radar/# + https://www.thoughtworks.com/radar
    // Try svg tooltip: www.npmjs.com/package/react-svg-tooltip
    
    const navigate = useNavigate();
    const { quadrants, rings, blips } = radarData;
    const [showGrid, setShowGrid] = useState(false);

    return (
        <div className="content-container">
            <div className="radar-description">
                <h2>Technology Radar</h2>
                
                <p>
                    This technology radar is a visual representation of the tools, techniques, languages, and resources 
                    I'm currently using, exploring, or evaluating in my professional work. It's inspired by the 
                    <a href="https://www.thoughtworks.com/radar" target="_blank" rel="noopener noreferrer"> Thoughtworks Technology Radar</a> and 
                    <a href="https://opensource.zalando.com/tech-radar/" target="_blank" rel="noopener noreferrer"> Zalando's Tech Radar</a>.
                </p>
                
                <h3>How to Read the Radar</h3>
                <ul>
                    <li><strong>Quadrants:</strong> Four areas of technology - Techniques (practices and methodologies), Tools (platforms and frameworks), Resources & Learning Materials (educational content), and Languages & Frameworks (programming languages and frameworks)</li>
                    <li><strong>Rings:</strong>
                        <ul>
                            <li><strong>Adopt:</strong> Technologies I'm confident in and actively using in my daily work</li>
                            <li><strong>Assess:</strong> Promising technologies I'm currently exploring and evaluating for potential adoption</li>
                            <li><strong>Hold:</strong> Technologies I've used but am deprioritizing or using less frequently</li>
                        </ul>
                    </li>
                </ul>
                
                <h3>Purpose</h3>
                <p>
                    This radar serves as a snapshot of my technical evolution and helps me:
                </p>
                <ul>
                    <li>Track which technologies I'm actively investing time in</li>
                    <li>Document my learning journey and skill development</li>
                    <li>Make informed decisions about which technologies to prioritize</li>
                    <li>Communicate my technical expertise and interests to others</li>
                    <li>Stay intentional about technology choices rather than adopting everything</li>
                </ul>
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