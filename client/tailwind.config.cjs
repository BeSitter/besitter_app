/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#3eb9c0',
					'primary-content': '#ffffff',
					'primary-focus': '#f4a4a0',
					secondary: '#f4a4a0',
					accent: '#96bb27',
					neutral: '#1f2937',
					'base-100': '#ffffff',
					info: '#ABBCE7',
					success: '#96bb27',
					warning: '#f8bb00',
					error: '#EB2D30'
				}
			}
		]
	},
	plugins: [require('daisyui')]
};
