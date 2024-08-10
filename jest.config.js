module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/*.test.ts'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    roots: ['<rootDir>/app'],
    setupFilesAfterEnv: ['<rootDir>/app/config/__mocks__/redis.ts'], // Ensure the mock setup is included
  };
  
  