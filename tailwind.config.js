module.exports = {
	mode: "jit",
	purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
	darkMode: "class", // or 'media' or 'class'
	theme: {
		fontFamily: {
			Nunito: ['"Nunito"', "sans-serif"],
		},
		extend: {
			colors: {
				lightBlue: "#f2fafe",
				darkBlue: "#232633",
			},
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
};
