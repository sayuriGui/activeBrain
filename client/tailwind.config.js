module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        carmine: "#A34730",
        copperred: "#BE7151",
        brownyellow: "#CE9960",
        bone: "#E2DAC3",
        camogreen: "#6E8363",
        ebony: "#4E6447",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
  important: true,
};
