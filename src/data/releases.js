// src/data/releases.js

const releasesData = {
  current: {
    version: "1.1.0",
    date: "May 2024",
    features: [
      "Individual domain radar charts for skill visualization",
      "Interactive 3D particle background animation",
      "Dynamic skills visualization with spider/radar chart",
      "Dark/Light theme support",
      "Responsive design for all screen sizes",
      "Project showcase with expandable details",
      "Experience timeline with interactive company selection",
      "Spotify Now Playing integration",
      "Smooth page transitions and animations"
    ]
  },
  upcoming: {
    version: "1.2.0",
    plannedDate: "June 2024",
    features: [
      "Blog section for technical articles and tutorials",
      "Interactive project demos",
      "Achievement badges and certifications showcase",
      "Real-time GitHub activity integration",
      "Enhanced project filtering and search",
      "Improved accessibility features",
      "Performance optimizations"
    ]
  },
  changelog: [
    {
      version: "1.1.0",
      date: "May 2024",
      changes: [
        {
          type: "feature",
          description: "Added individual domain radar charts for better skill visualization"
        },
        {
          type: "improvement",
          description: "Refined site navigation and spacing for better readability"
        },
        {
          type: "improvement",
          description: "General code cleanup and performance enhancements"
        }
      ]
    },
    {
      version: "1.0.0",
      date: "March 2024",
      changes: [
        {
          type: "feature",
          description: "Initial release of the personal portfolio website"
        },
        {
          type: "feature",
          description: "Implemented dynamic skills visualization"
        },
        {
          type: "feature",
          description: "Added interactive experience timeline"
        },
        {
          type: "feature",
          description: "Integrated Spotify Now Playing widget"
        }
      ]
    },
    {
      version: "0.9.0",
      date: "February 2024",
      changes: [
        {
          type: "feature",
          description: "Beta release with core functionality"
        },
        {
          type: "improvement",
          description: "Enhanced responsive design"
        },
        {
          type: "fix",
          description: "Fixed theme switching issues"
        }
      ]
    }
  ]
};

export default releasesData; 