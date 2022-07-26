module.exports = {
  testEnvironment: "node",
  cacheDirectory: '.jest/cache',
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?|ts?)?$',
  preset: 'ts-jest',
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  cacheDirectory: ".jest/cache",
  testPathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/.next",
    "<rootDir>/out",
  ],
  collectCoverageFrom: ["./**/*.ts"],
  coveragePathIgnorePatterns: [
    "<rootDir>/node_modules",
    "<rootDir>/.next",
    "<rootDir>/out",
    "<rootDir>/jest.config.js",    
  ],
  coverageReporters: ["json", "lcov", "text"],
  testResultsProcessor: "jest-sonar-reporter",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleFileExtensions: ["ts", "js", "json"],
  moduleDirectories: ["node_modules"],
  setupFilesAfterEnv: ["<rootDir>/setup-tests.ts"],
};
