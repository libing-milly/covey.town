module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        project: './tsconfig.json',
        warnOnUnsupportedTypeScriptVersion: false,
    },
    "plugins": [
        "@typescript-eslint"
    ],
    ignorePatterns: ['/*.*'],
    "rules": {
        'no-underscore-dangle': 0,
    }
};
