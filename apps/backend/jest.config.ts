module.exports = {
  moduleFileExtensions: ['js', 'json', 'ts'], // File extensions Jest will recognize as modules
  rootDir: 'src', // Root directory where Jest should look for tests (adjust if needed)
  testRegex: '.*\\.spec\\.ts$', // Regular expression to match test files (e.g., .spec.ts)
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest', // Use ts-jest to transform TypeScript and JavaScript files
  },
  collectCoverageFrom: [
    // Files to collect coverage information from
    '**/*.(t|j)s', // Include all .ts and .js files in 'src' directory and subdirectories
  ],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
};
