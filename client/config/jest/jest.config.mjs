import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: ".",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  globals: {
    IS_DEV: true,
  },
  clearMocks: true,
  testEnvironment: 'jest-environment-jsdom',
  coveragePathIgnorePatterns: ['\\\\node_modules\\\\'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  moduleDirectories: ['node_modules'],
  modulePaths: ['<rootDir>/src'],
  testMatch: [
    '<rootDir>/src/**/*(*.)@(spec|test).[tj]s?(x)',
  ],
  rootDir: './../../',
  setupFilesAfterEnv: ['<rootDir>config/jest/setupTests.ts'],
}

const jestConfig = async () => {
  const nextJestConfig = await createJestConfig(customJestConfig)()
  return {
    ...nextJestConfig,
    moduleNameMapper: {
      // Workaround to put our SVG mock first
      '\\.svg$': '<rootDir>/config/jest/jestEmptyComponent.tsx',
      ...nextJestConfig.moduleNameMapper,
    },
  }
}

export default jestConfig
