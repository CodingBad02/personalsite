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
          // Superhuman-derived palette. Token names kept so components restyle automatically.
          primary: {
            light: '#5B4DD1', // superhuman purple
            dark: '#857DFA'   // periwinkle
          },
          secondary: {
            light: '#7CA8F0', // sky
            dark: '#A5B4FC'
          },
          // Superhuman signature gradient stops
          grad: {
            purple: '#554DCB',
            sky: '#86CBF9',
            pink: '#F7DBFF',
            periwinkle: '#857DFA',
            hot: '#FF5C8A'
          },
          background: {
            light: '#FAFAF9', // warm paper
            dark: '#15132E'   // deep indigo (superhuman #1B1938 family)
          },
          surface: {
            light: '#F3F2F5',
            dark: '#1E1B3A'
          },
          text: {
            light: '#1A1A24',
            dark: '#ECEAF6'
          },
          line: {
            light: '#E8E6EF',
            dark: '#2C2950'
          },
          // denis.app/cli terminal palette
          term: {
            paper: '#F4F2EA',
            panel: '#ECEBE2',
            bar: '#DFDCD1',
            ink: '#1A1E1C',
            muted: '#6A6F6A',
            green: '#0A6B2E',
            orange: '#B84100',
            line: 'rgba(26,30,28,0.12)'
          }
        },
        fontFamily: {
          sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          heading: ['"Instrument Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        },
        animation: {
          'blink': 'blink 1.4s ease-in-out infinite',
          'fade-up': 'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
          'float': 'float 7s ease-in-out infinite',
          'gradient-pan': 'gradientPan 8s ease infinite',
        },
        keyframes: {
          blink: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.2' } },
          fadeUp: { '0%': { opacity: '0', transform: 'translateY(16px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
          float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
          gradientPan: { '0%, 100%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' } },
        },
        typography: ({ theme }) => ({
          invert: {
            css: {
              '--tw-prose-invert-body': theme('colors.text.dark'),
              '--tw-prose-invert-headings': theme('colors.text.dark'),
              '--tw-prose-invert-bold': theme('colors.text.dark'),
              '--tw-prose-invert-lead': theme('colors.text.dark'),
              '--tw-prose-invert-quotes': theme('colors.text.dark'),
            },
          },
        }),
      },
    },
    plugins: [
      require('@tailwindcss/forms'),
      require('@tailwindcss/typography'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
