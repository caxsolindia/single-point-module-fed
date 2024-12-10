/* eslint-disable prettier/prettier */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jest-environment-jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(gif|ttf|eot|svg|png)$": "<rootDir>/src/__mocks__/svgMock.js",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
};
