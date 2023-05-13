module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:@typescript-eslint/recommended"
	],
	"overrides": [
	],
	"parser": "@typescript-eslint/parser",
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"plugins": [
		"react",
		"@typescript-eslint"
	],
	"rules": {
		"indent": [
			"error",
			"tab"
		],
		"linebreak-style": [
			"error",
			"unix"
		],
		"quotes": [
			"error",
			"double"
		],
		"semi": [
			"error",
			"never"
		],
		"indent": [
			"warn",
			4
		],
		"no-var": "warn",
		"prefer-const": "error",
  		"no-unused-vars": "error",
		"eqeqeq": "error",
		"no-eval": "error",
		"no-alert": "error",
		"no-console": "warn",
		"no-debugger": "error"
	}
}

