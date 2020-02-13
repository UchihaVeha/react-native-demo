module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    "prettier/prettier": ["error", {
      "singleQuote": true,
      "trailingComma": "none",
      "bracketSpacing": true,
      "jsxBracketSameLine": false
    }]
  },
};
