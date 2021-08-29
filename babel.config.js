/**
 * Custom babel config
 * Polyfills management
 * Code cleaning for production
 */

module.exports = {
  // Polyfills : js & jsx
  presets: [
    [
      "@babel/preset-env"
    ],
    "@babel/preset-react",
  ],
  plugins: [
    "@babel/plugin-transform-runtime", // Reduces code duplication by extracting Babel helpers into shared modules.
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties", // Class-based React components.,
  ].filter(Boolean),
  env: {
    production: {
      only: ["src"],
      plugins: [
        [
          // Removes unnecessary prop-types from production code.
          "transform-react-remove-prop-types",
          {
            removeImport: true,
          },
        ],
        "@babel/plugin-transform-react-inline-elements", // Evaluates React.createElement during compilation and inlines the result.
        "@babel/plugin-transform-react-constant-elements", // extracts static React elements as constants.
      ],
    },
  },
};
