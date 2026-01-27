module.exports = {
  testEnvironment: 'jsdom',
  testMatch: [
    '**/test/unit/**/*.test.js'
  ],
  collectCoverageFrom: [
    'grab-n-drag-infinite-carousel.js',
    '!grab-n-drag-infinite-carousel.min.js',
    '!**/node_modules/**',
    '!**/test/**',
    '!**/coverage/**',
    '!**/dist/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'text',
    'html',
    'lcov'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/test/',
    '/coverage/',
    '/dist/'
  ],
  setupFilesAfterEnv: ['<rootDir>/test/setup.js'],
  testTimeout: 10000
};
