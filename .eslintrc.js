module.exports = {
	extends: [
		// 'eslint-config-airbnb',
		// 'eslint:recommended',
		// 'plugin:@typescript-eslint/recommended',
		// 'plugin:prettier/recommended',
	],
	env: {
		browser: true,
		es6: true,
	},
	globals: {
		Atomics: 'readonly',
		SharedArrayBuffer: 'readonly',
	},
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 2018,
		sourceType: 'module',
	},
	parser: '@typescript-eslint/parser',
	plugins: ['react', 'react-hooks', 'promise', 'prettier', 'babel'],
	rules: {
		quotes: ['error', 'single', { allowTemplateLiterals: true }],
		'import/no-unresolved': 'off',
		'react/jsx-filename-extension': 'off',
		'arrow-body-style': 'off',
		'no-unused-vars': 'off',
		'jsx-quotes': ['error', 'prefer-double'],
		'react/jsx-closing-bracket-location': 0,
		'react/destructuring-assignment': 'off',
		'react/jsx-indent': 'off',
		'prettier/prettier': 'error',
		'react/jsx-tag-spacing': [
			'error',
			{
				beforeSelfClosing: 'allow',
			},
		],

		'jsx-a11y/click-events-have-key-events': 0,
		'jsx-a11y/no-noninteractive-element-interactions': 0,
		'prefer-default-export': 'off',
		'click-events-have-key-events': ['off'],
		'import/no-extraneous-dependencies': 0,
		'import/prefer-default-export': 0,

		// indent: [2, 'tab'],
		'no-tabs': 0,
		'prettier/prettier': 0,
		'react/jsx-indent-props': 0,
		'jsx-a11y/no-static-element-interactions': 0,
		'no-use-before-define': 2,
		'no-implied-eval': 'error',
		'no-console': 0,
		'react/jsx-one-expression-per-line': 0,
		'react/no-array-index-key': 0,
	},
};