module.exports = {
	root: true,
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:unicorn/all',
		'plugin:sonarjs/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'simple-import-sort', 'unicorn', 'sonarjs'],
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2020
	},
	rules: {
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'unicorn/filename-case': 'off',
		'unicorn/switch-case-braces': 'off',
		'no-alert': 'error',
		'no-console': 'error',
		'no-debugger': 'error',
		'sonarjs/cognitive-complexity': 'off'
	},
	env: {
		browser: true,
		es2017: true,
		node: true
	}
};
