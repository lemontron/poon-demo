import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: [
			{ find: 'react', replacement: path.resolve(__dirname, 'node_modules/react') },
			{ find: 'react-dom', replacement: path.resolve(__dirname, 'node_modules/react-dom') },
			{ find: /^poon-router$/, replacement: path.resolve(__dirname, '../poon-router/src/index.js') },
			{ find: /^poon-ui$/, replacement: path.resolve(__dirname, '../poon-ui/dist/index.js') },
		],
	},
	build: {
		target: 'esnext',
		outDir: 'dist',
		rollupOptions: {
			output: { format: 'es' },
		},
	},
	optimizeDeps: {
		include: ['react', 'react-dom'],
		exclude: ['poon-router', 'poon-ui'],
	},
});
