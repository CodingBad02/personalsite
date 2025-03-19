// src/data/releases.js

const releasesData = {
  current: {
    version: "1.2.0",
    date: "March 2025",
    features: [
      "Umami Analytics integration for privacy-focused visitor tracking",
      "Enhanced contact form with Google reCAPTCHA protection",
      "Anti-spam measures including rate limiting and honeypot fields",
      "Individual domain radar charts for skill visualization",
      "Interactive 3D particle background animation",
      "Dynamic skills visualization with spider/radar chart",
      "Dark/Light theme support",
      "Responsive design for all screen sizes",
      "Project showcase with expandable details",
      "Experience timeline with interactive company selection",
      "Spotify Now Playing integration via PythonAnywhere Backend",
      "Smooth page transitions and animations"
    ]
  },
  upcoming: {
    version: "1.3.0",
    plannedDate: "May 2025",
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
      version: "1.2.0",
      date: "March 2025",
      changes: [
        {
          type: "feature",
          description: "Integrated Umami Analytics for privacy-focused visitor tracking"
        },
        {
          type: "feature",
          description: "Added Google reCAPTCHA protection to the contact form"
        },
        {
          type: "security",
          description: "Implemented multiple anti-spam measures: rate limiting and honeypot fields"
        },
        {
          type: "improvement",
          description: "Enhanced error handling throughout the application"
        }
      ]
    },
    {
      version: "1.1.0",
      date: "March 2025",
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
      date: "March 2025",
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
      date: "February 2025",
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