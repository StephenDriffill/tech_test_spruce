/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // '^.+\\.svg$': '<rootDir>/svg_transform.js' // TODO: https://github.com/StephenDriffill/tech_test_spruce/issues/6
  },
};
