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
    { name: "React", quadrant: 2, ring: 0 },
    { name: "Docker", quadrant: 0, ring: 1 },
    { name: "Kubernetes", quadrant: 1, ring: 2 },
    { name: "Bruno", quadrant: 3, ring: 0 },
    { name: "some platform", quadrant: 2, ring: 1}
    // Add more blips as needed
  ],
};