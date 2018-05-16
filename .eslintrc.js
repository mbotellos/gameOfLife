module.exports = {
  "extends": [
    "airbnb-base",
  ],
  "plugins": [
    "import",
    "jasmine",
  ],
  "rules": {
    "class-methods-use-this": ["off"],
    "func-names": ["error", "never"],
    "linebreak-style": 0,
    "no-param-reassign": ["error", { "props": false }],
    "no-underscore-dangle": 0,
    "no-unused-expressions": ["error", { "allowShortCircuit": true }]
  },
  "globals": {
    "_": true,
    "angular": true,
    "document": true,
    "console": true,
    "inject": true,
    "module": true,
    "window": true,
  },
  "env": {
    jasmine: true,
  }
};
