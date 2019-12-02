module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleNameMapper: {
       '\\.(css|less|sass|scss)$': '<rootDir>/__mocks__/styles.mock.ts',
       '\\.(gif|ttf|eot|svg)$': '<rootDir>/__mocks__/files.mock.ts'
    }
 };