module.exports = {
  moduleFileExtensions: ["js", "json", "vue"],
  transform: {
    "^.+\\.js$": "babel-jest",
    "^.+\\.vue$": "@vue/vue3-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testMatch: ["**/tests/unit/**/*.spec.[jt]s?(x)", "**/__tests__/*.[jt]s?(x)"],
  collectCoverage: true,
  collectCoverageFrom: ["src/components/**/*.{js,vue}", "!**/node_modules/**"],
  testEnvironment: "jsdom",
  globals: {
    "vue-jest": {
      compilerOptions: {
        isCustomElement: (tag) => tag.startsWith("v-"),
      },
    },
    vue: {
      version: 3,
      runtimeCompiler: true,
    },
  },
  testEnvironment: "jsdom",
  testEnvironmentOptions: {
    customExportConditions: ["node", "node-addons"],
  },
  setupFiles: ["<rootDir>/tests/jest.setup.js"]
};
