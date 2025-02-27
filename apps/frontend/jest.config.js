module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["<rootDir>/**/*.spec.ts", "<rootDir>/**/*.test.ts"],
  transform: {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.ts?$": "ts-jest",
  },
  moduleFileExtensions: ["js", "ts", "vue", "json"],
  collectCoverage: true,
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,ts,vue}",
    "!<rootDir>/src/**/*.d.ts",
    "!<rootDir>/src/**/index.ts",
    "!<rootDir>/src/main.ts",
  ],
  coverageReporters: ["text", "lcov", "html"],
};
