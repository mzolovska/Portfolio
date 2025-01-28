module.exports = {
    theme: {
      extend: {
        colors: {
          primary: "#F55A5A",
          secondary: "#242424",
        },
        fontFamily: {
          sans: ["Poppins", "sans-serif"],
        },
        animation: {
          float: "float 6s ease-in-out infinite",
        },
        keyframes: {
          float: {
            "0%, 100%": { transform: "translateY(-10px)" },
            "50%": { transform: "translateY(10px)" },
          },
        },
      },
    },
  };
  