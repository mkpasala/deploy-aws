/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			fontFamily: {
				inter: "Inter",
				barlow: "Barlow"
			},
			colors: {
				"mint-green": "#F0F9F4",
				dark: "#191918",
				"flare-red": "#F35858",
			},
		},
	},
	plugins: [],
};
