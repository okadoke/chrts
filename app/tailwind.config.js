module.exports = {
	purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}", "./lib/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
	},
	variants: {},
	plugins: [require("@tailwindcss/typography")],
	future: {
		removeDeprecatedGapUtilities: true,
	},
}
