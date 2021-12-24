module.exports = {
  content: [
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/pages/**/*.{ts,tsx,js,jsx}",
  ], 
  // keep styles
  
  darkMode: 'class',
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
      center: true
    },
  },
  variants: {},
  plugins: [
    require("@tailwindcss/typography"),
    
  ],
};
