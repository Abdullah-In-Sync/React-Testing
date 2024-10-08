module.exports = {
  preset: "ts-jest",
  testRunner: "jest-jasmine2",
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["<rootDir>/node_modules/"],
  globals: {
    "ts-jest": {
      babelConfig: true,
    },
  },
  testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/out/"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  moduleNameMapper: {
    "\\.(scss|sass|css)$": "identity-obj-proxy",
    "^uuid$": require.resolve("uuid"),
  },
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "<rootDir>/coverage",
  collectCoverageFrom: [
    "<rootDir>/**/*.[t]s?(x)",
    "!<rootDir>/pages/_app.tsx",
    "!<rootDir>/.next/",
    "!<rootDir>/coverage/",
    "!<rootDir>/**/__tests__/",
    "!<rootDir>/**/__mocks__/",
    "!<rootDir>/node_modules/",
    "!<rootDir>/.storybook/",
    "!<rootDir>/out/",
    "!<rootDir>/graphql/",
  ],
  coveragePathIgnorePatterns: [
    "_app.tsx",
    ".test.tsx",
    ".test.ts",
    ".spec.tsx",
    ".spec.ts",
    ".stories.tsx",
    ".stories.ts",
    "node_modules",
    ".d.ts",
    ".prettierrc.js",
    ".config.js",
    ".storybook",
    "coverage",
    ".next",
    "out",
  ],
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/setup-tests.ts"],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  coverageReporters: ["json", "lcov", "text"],
};
