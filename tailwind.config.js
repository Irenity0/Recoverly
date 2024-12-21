/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "lato": ["Lato", "monospace"],
        "amatic" : ["Amatic SC", "serif"]
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#2f4157',        
          secondary: '#577c8e',      
          accent: '#c7d9e5',         
          neutral: '#e4eeee',        
          'base-100': '#e4eeee',     
        },
        mytheme_dark: {
          primary: '#8aa4b0',
          secondary: '#577c8e',      
          accent: '#c7d9e5',
          neutral: '#2f4157',        
          'base-100': '#2f4157',     
        },
      },
    ],
  },
  darkMode: 'darkclass', // Enable class-based dark mode
};