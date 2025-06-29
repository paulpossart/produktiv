export default {
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/__mocks__/fileStub.js',
    '\\.(mp3|wav|ogg|m4a)$': '<rootDir>/__mocks__/fileStub.js',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'ts', 'tsx'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/']
};
