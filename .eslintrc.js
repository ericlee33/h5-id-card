//  I prefer using a JavaScript file for the .eslintrc file (instead of a JSON file) as it supports comments that can be used to better describe rules.

module.exports = {
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            // Doc of this config https://github.com/babel/babel-eslint/releases/tag/v9.0.0
            legacyDecorators: true,
        },
    },
    // Because need to use 'legacyDecorators', we have to choose 'babel-eslint' as parser.
    // https://github.com/babel/babel-eslint/releases/tag/v9.0.0
    parser: 'babel-eslint',
    env: {
        es2020: true,
        browser: true,
        node: true,
        jest: true,
    },
    extends: [
        'eslint:recommended', // Use the recommended config for JavaScript.
        'plugin:prettier/recommended', // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
        'plugin:react-hooks/recommended',
    ],
    rules: {
        'no-misleading-character-class': 'off',
        // 为了兼容旧代码
        'no-unused-vars': 'off',
        'no-debugger': 'off',
        'no-useless-escape': 'off',
        'no-empty': 'off',
        'no-unreachable': 'off',
        'react-hooks/rules-of-hooks': 'warn', // 检查 Hook 的规则
        'react-hooks/exhaustive-deps': 'warn', // 检查 effect 的依赖
    },
};
