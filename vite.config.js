import { defineConfig } from 'vite'
import postCssNested from 'postcss-nested'
import customMedia from 'postcss-custom-media'
import autoPrefixer from 'autoprefixer'

export default defineConfig({
	base: '/polychrome/',
	css: {
		postcss: {
			plugins: [postCssNested, customMedia, autoPrefixer],
		},
	},
})
