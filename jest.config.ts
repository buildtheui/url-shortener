// Or async function
module.exports = async () => {
  return {
    preset: "ts-jest",
    testEnvironment: "node",
    verbose: true,
    setupFilesAfterEnv: ["./src/main/test/setup.ts"],
    moduleNameMapper: {
      "^@application/(.*)": "<rootDir>/src/application/$1",
      "^@domain/(.*)": "<rootDir>/src/domain/$1",
      "^@infra/(.*)": "<rootDir>/src/infrastructure/$1",
      "^@main/(.*)": "<rootDir>/src/main/$1",
    },
  };
};
