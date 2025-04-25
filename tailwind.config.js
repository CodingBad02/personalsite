/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/pages/**/*.{js,ts,jsx,tsx}",
      "./src/components/**/*.{js,ts,jsx,tsx}",
      "./src/layouts/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
      extend: {
        colors: {
          primary: {
            light: '#7C3AED', // purple
            dark: '#8B5CF6'
          },
          secondary: {
            light: '#10B981', // emerald
            dark: '#34D399'
          },
          background: {
            light: '#FFFFFF',
            dark: '#0F172A'
          },
          surface: {
            light: '#F1F5F9',
            dark: '#1E293B'
          },
          text: {
            light: '#1E293B',
            dark: '#F1F5F9'
          }
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          heading: ['Poppins', 'sans-serif'],
        },
        animation: {
          'glow': 'glow 2s ease-in-out infinite alternate',
        },
        keyframes: {
          glow: {
            '0%': { boxShadow: '0 0 5px rgba(124, 58, 237, 0.5)' },
            '100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.8)' },
          }
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }