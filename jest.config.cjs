/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

module.exports = {
  transform: {
    "^.+\\.(js|ts|svelte)$": "babel-jest"
  },
  moduleFileExtensions: ['js', 'ts', 'svelte'],
  testPathIgnorePatterns: ['node_modules'],
  bail: false,
  verbose: true,
  testEnvironment: 'node' // Use 'node' if not relying on DOM APIs, otherwise 'jsdom'
};