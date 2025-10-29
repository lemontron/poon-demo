import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/

export default defineConfig({
	'plugins': [react()],
	'build': {
		target: 'esnext',
		outDir: 'dist',
		commonjsOptions: {
			include: [/node_modules/],
		},
		'rollupOptions': {
			'external': ['react', 'react-dom', 'react/jsx-runtime'],
			'output': {
				'format': 'es',
				'globals': {
					'react': 'React',
					'react-dom': 'ReactDOM',
				},
			},
		},
	},
});
