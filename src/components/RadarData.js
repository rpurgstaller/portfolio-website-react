export const radarData = {
  quadrants: [
    { name: "Techniques", color: "#ff9900" },
    { name: "Tools", color: "#109618" },
    { name: "Platforms", color: "#0066cc" },
    { name: "Languages & Frameworks", color: "#990099" },
  ],
  rings: [
    { name: "Adopt", radius: 1.4 },
    { name: "Assess", radius: 2.2 },
    { name: "Hold", radius: 3 },
  ],
  blips: [
    { name: "React", quadrant: 3, ring: 0, moved: 0 },
    { name: "Docker", quadrant: 1, ring: 1, moved: 1 },
    // Add more blips as needed
  ],
};