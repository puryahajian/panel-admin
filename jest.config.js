module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./jest.setup.js'],
  testMatch: ['**/src/**/*.test.js'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov'],
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest",
  },
  presets: [
    'react-app',
    '@babel/preset-env',
    '@babel/preset-react'
  ],
  transformIgnorePatterns: ["/node_modules/(?!(axios)/)" ],
  moduleFileExtensions: ["js", "jsx", "json", "node"],

};