/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#FFF3F7",
        ink: "#2A0B3A",
        berry: "#F72D6B",
        blue: "#5B3FD6",
        grape: "#7A1FA2",
        mint: "#B8F2D6",
        cream: "#F8EBD1",
        coal: "#1F1B1A",
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', "system-ui", "sans-serif"],
        body: ['"DM Sans"', "system-ui", "sans-serif"],
        hand: ["Caveat", "cursive"],
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0)" },
          "50%": { transform: "translateY(-16px) rotate(6deg)" },
        },
        blob: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "50%": { transform: "translate(30px,-40px) scale(1.15)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        wave: { to: { transform: "rotate(360deg)" } },
        wiggle: {
          "0%,100%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(4deg)" },
        },
        rise: {
          from: { opacity: 0, transform: "translateY(40px) scale(.92)" },
          to: { opacity: 1, transform: "none" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        blob: "blob 12s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        wave: "wave 7s linear infinite",
        wiggle: "wiggle 3s ease-in-out infinite",
        spinslow: "wave 16s linear infinite",
        rise: "rise 1s cubic-bezier(.2,.8,.2,1) both",
      },
    },
  },
  plugins: [],
};
