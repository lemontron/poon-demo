module.exports = {
	env: {
		'browser': true,
		'es2020': true,
		'node': true
	},
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
	],
	parserOptions: {ecmaVersion: 'latest', sourceType: 'module'},
	settings: {react: {version: '19.1'}},
	rules: {
		'react/no-unescaped-entities': 'off',
		'react/display-name': 'off',
		'react/no-children-prop': 'off',
		'react/prop-types': 'off',
	},
};
